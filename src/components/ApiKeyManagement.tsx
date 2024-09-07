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

interface ApiKey {
    id: string;
    api_key: string;
    tier: string;
    is_active: boolean;
    created_at: string;
    user_id: string;
}

export function ApiKeyManagement() {
    const { user } = useUser();
    const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
    const [loading, setLoading] = useState(true);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    useEffect(() => {
        if (user) {
            fetchApiKeys();
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
        } else {
            setApiKeys(data || []);
        }
        setLoading(false);
    };

    const regenerateApiKey = async () => {
        if (!user?.id || apiKeys.length === 0) return;

        const newApiKey = crypto.randomUUID();
        const { data, error } = await supabase
            .from('api_keys')
            .update({ api_key: newApiKey })
            .eq('id', apiKeys[0].id)
            .select();

        if (error) {
            console.error('Error regenerating API key:', error);
        } else {
            setApiKeys([data[0]]);
        }
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
            return;
        }

        // Delete Clerk user
        try {
            await user.delete();
        } catch (error) {
            console.error('Error deleting Clerk user:', error);
        }
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    const currentApiKey = apiKeys.length > 0 ? apiKeys[0].api_key : 'No API key found';
    const subscriptionTier = apiKeys.length > 0 ? apiKeys[0].tier : 'Free';

    return (
        <div className="min-h-screen bg-black text-white p-4 md:p-6 lg:p-8">
            <Tabs defaultValue="api-key" className="space-y-4">
                <TabsList className="grid w-full grid-cols-3 bg-white/10">
                    <TabsTrigger value="api-key">API Key</TabsTrigger>
                    <TabsTrigger value="subscription">Subscription</TabsTrigger>
                    <TabsTrigger value="account">Account</TabsTrigger>
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
                                        onClick={() => navigator.clipboard.writeText(currentApiKey)}
                                        variant="outline"
                                        className="bg-transparent hover:bg-white/10 text-white border-white/20 hover:border-white/40"
                                    >
                                        Copy
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={regenerateApiKey} className="bg-purple-600 text-white hover:bg-purple-700 transition-all duration-300">
                                Generate New API Key
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
                                <p className="text-lg font-semibold text-purple-300">{subscriptionTier}</p>
                            </div>
                            {/* Add more subscription management content here */}
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