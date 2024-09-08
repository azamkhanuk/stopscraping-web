import { useState, useEffect } from 'react';
import { useUser } from "@clerk/clerk-react";
import { supabase } from '../lib/supabase';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { LoadingSpinner } from './LoadingSpinner';
import { RefreshCw } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import { useStripe } from '@stripe/react-stripe-js';
import { format } from 'date-fns';

interface ApiKey {
    id: string;
    api_key: string;
    tier: string;
    is_active: boolean;
    created_at: string;
    user_id: string;
}

interface StripeSubscription {
    id: string;
    current_period_end: number;
    cancel_at_period_end: boolean;
    price: {
        unit_amount: number;
        currency: string;
    };
}

export function ApiKeyManagement() {
    const { user } = useUser();
    const { toast } = useToast();
    const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
    const [loading, setLoading] = useState(true);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const stripe = useStripe();
    const [subscription, setSubscription] = useState<StripeSubscription | null>(null);

    useEffect(() => {
        if (user) {
            fetchApiKeys();
            fetchSubscription();
        }
    }, [user]);

    const fetchApiKeys = async () => {
        if (!user?.id) return;

        setLoading(true);
        const { data, error } = await supabase
            .from('api_keys')
            .select('*')
            .eq('user_id', user.id);

        if (error) {
            console.error('Error fetching API keys:', error);
            toast({
                title: "Error",
                description: "Failed to fetch API keys. Please try again.",
                duration: 2000,
            });
        } else {
            setApiKeys(data || []);
        }
        setLoading(false);
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            toast({
                title: "Copied",
                description: "API key copied to clipboard",
                duration: 1000,
            });
        }).catch((err) => {
            console.error('Failed to copy text: ', err);
            toast({
                title: "Error",
                description: "Failed to copy API key",
                duration: 1000,
            });
        });
    };

    const regenerateApiKey = async () => {
        if (!user?.id || apiKeys.length === 0) return;

        setLoading(true);
        toast({
            title: "Generating new API key",
            description: "Please wait while we create your new key...",
            duration: 2000,
        });

        const newApiKey = crypto.randomUUID();
        const currentTier = apiKeys[0].tier;

        const { data, error } = await supabase
            .from('api_keys')
            .update({ api_key: newApiKey })
            .eq('user_id', user.id)
            .eq('tier', currentTier)
            .select();

        if (error) {
            console.error('Error regenerating API key:', error);
            toast({
                title: "Error",
                description: "Failed to generate a new API key. Please try again.",
                duration: 2000,
            });
        } else if (data && data.length > 0) {
            setApiKeys([data[0]]);
            toast({
                title: "Success",
                description: "New API key generated successfully!",
                duration: 2000,
            });
        } else {
            console.error('No data returned after updating API key');
            toast({
                title: "Error",
                description: "An unexpected error occurred. Please try again.",
                duration: 2000,
            });
        }
        setLoading(false);
    };

    const deleteAccount = async () => {
        if (!user?.id) return;

        // Delete all API keys
        const { error: deleteKeysError } = await supabase
            .from('api_keys')
            .delete()
            .eq('user_id', user.id);

        if (deleteKeysError) {
            console.error('Error deleting API keys:', deleteKeysError);
            toast({
                title: "Error",
                description: "Failed to delete API keys. Please try again.",
                duration: 2000,
            });
            return;
        }

        // Delete Clerk user
        try {
            await user.delete();
            toast({
                title: "Account Deleted",
                description: "Your account has been successfully deleted.",
                duration: 2000,
            });
        } catch (error) {
            console.error('Error deleting Clerk user:', error);
            toast({
                title: "Error",
                description: "Failed to delete your account. Please try again.",
                duration: 2000,
            });
        }
    };

    const handleUpgrade = async () => {
        if (!stripe) {
            console.error('Stripe.js has not loaded yet.');
            alert('An error occurred. Please try again.');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('/api/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ plan: 'Basic' }),
            });

            const session = await response.json();

            if (session.sessionId) {
                const result = await stripe.redirectToCheckout({
                    sessionId: session.sessionId,
                });

                if (result.error) {
                    console.error('Error redirecting to Checkout:', result.error);
                    alert('An error occurred. Please try again.');
                }
            } else {
                throw new Error('No sessionId in the session response');
            }
        } catch (error) {
            console.error('Error upgrading plan:', error);
            alert('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const fetchSubscription = async () => {
        if (!user?.id) return;

        try {
            const response = await fetch('/api/get-subscription', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.id}`, // Add this line
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch subscription');
            }

            const data = await response.json();
            setSubscription(data.subscription);
        } catch (error) {
            console.error('Error fetching subscription:', error);
            toast({
                title: "Error",
                description: "Failed to fetch subscription details. Please try again.",
                duration: 2000,
            });
        }
    };

    const handleCancelSubscription = async () => {
        if (!user?.id || !subscription) return;

        try {
            const response = await fetch('/api/cancel-subscription', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.id}`, // Add this line
                },
                body: JSON.stringify({ subscriptionId: subscription.id }),
            });

            if (!response.ok) {
                throw new Error('Failed to cancel subscription');
            }

            toast({
                title: "Success",
                description: "Your subscription has been cancelled and will end at the end of the current billing period.",
                duration: 3000,
            });

            fetchSubscription(); // Refresh subscription data
        } catch (error) {
            console.error('Error cancelling subscription:', error);
            toast({
                title: "Error",
                description: "Failed to cancel subscription. Please try again.",
                duration: 2000,
            });
        }
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    const currentApiKey = apiKeys.length > 0 ? apiKeys[0].api_key : 'No API key found';
    const subscriptionTier = apiKeys.length > 0 ? apiKeys[0].tier : 'Free';

    return (
        <div className="min-h-screen bg-black text-white p-4 md:p-6 lg:p-8">
            <h1 className="text-3xl font-bold mb-6">Welcome, {user?.firstName || 'User'}</h1>
            <Tabs defaultValue="api-key" className="space-y-4">
                <TabsList className="grid w-full grid-cols-3 bg-white/10">
                    <TabsTrigger
                        value="api-key"
                        className="text-white data-[state=active]:bg-white data-[state=active]:text-black data-[state=inactive]:text-gray-400"
                    >
                        API Key
                    </TabsTrigger>
                    <TabsTrigger
                        value="subscription"
                        className="text-white data-[state=active]:bg-white data-[state=active]:text-black data-[state=inactive]:text-gray-400"
                    >
                        Subscription
                    </TabsTrigger>
                    <TabsTrigger
                        value="account"
                        className="text-white data-[state=active]:bg-white data-[state=active]:text-black data-[state=inactive]:text-gray-400"
                    >
                        Account
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="api-key">
                    <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                        <CardHeader>
                            <CardTitle className="text-white">API Key Management</CardTitle>
                            <CardDescription className="text-gray-400">View and manage your API key</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-1">
                                <Label htmlFor="apiKey" className="text-white">Current API Key</Label>
                                <div className="flex items-center space-x-2">
                                    <Input
                                        id="apiKey"
                                        value={currentApiKey}
                                        readOnly
                                        className="bg-white/5 border-white/10 text-white"
                                    />
                                    <Button
                                        onClick={() => copyToClipboard(currentApiKey)}
                                        variant="outline"
                                        className="bg-transparent hover:bg-white/10 text-white hover:text-white border-white/20 hover:border-white/40"
                                    >
                                        Copy
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button
                                onClick={regenerateApiKey}
                                className="bg-purple-600 text-white hover:bg-purple-700 transition-all duration-300"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                                        Generating...
                                    </>
                                ) : (
                                    'Generate New API Key'
                                )}
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="subscription">
                    <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                        <CardHeader>
                            <CardTitle className="text-white">Subscription Management</CardTitle>
                            <CardDescription className="text-gray-400">Manage your subscription and billing details</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-1">
                                <Label className="text-white">Current Plan</Label>
                                <p className="text-lg font-semibold text-purple-300">
                                    {(user?.unsafeMetadata?.pricingPlan as string) || 'Free'}
                                </p>
                            </div>
                            {subscription && (
                                <>
                                    <div className="space-y-1">
                                        <Label className="text-white">Subscription Price</Label>
                                        <p className="text-lg font-semibold text-purple-300">
                                            {(subscription.price.unit_amount / 100).toFixed(2)} {subscription.price.currency.toUpperCase()} / month
                                        </p>
                                    </div>
                                    <div className="space-y-1">
                                        <Label className="text-white">Current Billing Period Ends</Label>
                                        <p className="text-lg font-semibold text-purple-300">
                                            {format(new Date(subscription.current_period_end * 1000), 'MMMM d, yyyy')}
                                        </p>
                                    </div>
                                    <Button
                                        onClick={handleCancelSubscription}
                                        className="bg-red-600 text-white hover:bg-red-700 transition-all duration-300"
                                        disabled={subscription.cancel_at_period_end}
                                    >
                                        {subscription.cancel_at_period_end ? 'Cancellation Scheduled' : 'Cancel Subscription'}
                                    </Button>
                                </>
                            )}
                            {user?.unsafeMetadata?.pricingPlan === 'Free' && (
                                <Button
                                    onClick={handleUpgrade}
                                    className="bg-purple-600 text-white hover:bg-purple-700 transition-all duration-300"
                                    disabled={loading}
                                >
                                    {loading ? 'Processing...' : 'Upgrade to Basic'}
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="account">
                    <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                        <CardHeader>
                            <CardTitle className="text-white">Account Settings</CardTitle>
                            <CardDescription className="text-gray-400">Manage your account</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                                <AlertDialogTrigger asChild>
                                    <Button variant="destructive">Delete Account</Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent className="bg-gray-900 border-gray-800 text-white">
                                    <AlertDialogHeader>
                                        <AlertDialogTitle className="text-white">Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription className="text-gray-400">
                                            This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel className="bg-transparent hover:bg-white/10 text-white border-white/20 hover:border-white/40">Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={deleteAccount} className="bg-red-600 hover:bg-red-700 text-white">Delete Account</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}