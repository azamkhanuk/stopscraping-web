import { useState, useEffect } from 'react';
import { useUser } from "@clerk/clerk-react";
import { supabase } from '../lib/supabase';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { AlertTriangle } from "lucide-react";
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

    const generateApiKey = async (tier: string) => {
        if (!user?.id) return;

        const newApiKey = crypto.randomUUID();
        const { data, error } = await supabase
            .from('api_keys')
            .upsert({
                api_key: newApiKey,
                tier,
                user_id: user.id
            }, {
                onConflict: 'user_id,tier',
                update: { api_key: newApiKey }
            })
            .select();

        if (error) {
            console.error('Error generating API key:', error);
        } else {
            setApiKeys(prevKeys => {
                const index = prevKeys.findIndex(key => key.user_id === user?.id && key.tier === tier);
                if (index !== -1) {
                    // Update existing key
                    const updatedKeys = [...prevKeys];
                    updatedKeys[index] = data[0];
                    return updatedKeys;
                } else {
                    // Add new key
                    return [...prevKeys, data[0]];
                }
            });
        }
    };

    const regenerateApiKey = async (id: string) => {
        const newApiKey = crypto.randomUUID();
        const { data, error } = await supabase
            .from('api_keys')
            .update({ api_key: newApiKey })
            .eq('id', id)
            .select();

        if (error) {
            console.error('Error regenerating API key:', error);
        } else {
            setApiKeys(apiKeys.map(key => key.id === id ? data[0] : key));
        }
    };

    const toggleApiKeyStatus = async (id: string, currentStatus: boolean) => {
        const { data, error } = await supabase
            .from('api_keys')
            .update({ is_active: !currentStatus })
            .eq('id', id)
            .select();

        if (error) {
            console.error('Error toggling API key status:', error);
        } else {
            setApiKeys(apiKeys.map(key => key.id === id ? data[0] : key));
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

    const handleDeleteAccount = async () => {
        setIsDeleteDialogOpen(false);
        await deleteAccount();
    };

    const userTier = typeof user?.unsafeMetadata?.pricingPlan === 'string'
        ? user.unsafeMetadata.pricingPlan
        : "free";

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-6">API Key Management</h2>
            <p className="text-xl mb-6">Current Plan: <span className="capitalize font-semibold">{userTier}</span></p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {['free', 'basic', 'pro'].map((tier) => (
                    <Card key={tier} className="bg-white/10 backdrop-blur-sm border-white/20">
                        <CardHeader>
                            <CardTitle className="capitalize">{tier} Tier</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {apiKeys.filter(key => key.tier === tier).map((key) => (
                                <div key={key.id} className="mb-4">
                                    <p className="text-sm mb-2">API Key: {key.api_key}</p>
                                    <p className="text-sm mb-2">Status: {key.is_active ? 'Active' : 'Inactive'}</p>
                                    <div className="flex space-x-2">
                                        <Button onClick={() => regenerateApiKey(key.id)} size="sm">
                                            Regenerate
                                        </Button>
                                        <Button onClick={() => toggleApiKeyStatus(key.id, key.is_active)} size="sm">
                                            {key.is_active ? 'Deactivate' : 'Activate'}
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                        <CardFooter>
                            <Button onClick={() => generateApiKey(tier)} className="w-full">
                                Generate New Key
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
            <div className="mt-12 text-center">
                <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                    <DialogTrigger asChild>
                        <Button variant="destructive">
                            Delete Account
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                                <AlertTriangle className="h-5 w-5 text-red-500" />
                                Confirm Account Deletion
                            </DialogTitle>
                            <DialogDescription>
                                This action cannot be undone. This will permanently delete your
                                account and remove your data from our servers.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="sm:justify-start">
                            <Button
                                type="button"
                                variant="destructive"
                                onClick={handleDeleteAccount}
                            >
                                Yes, delete my account
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsDeleteDialogOpen(false)}
                            >
                                Cancel
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}