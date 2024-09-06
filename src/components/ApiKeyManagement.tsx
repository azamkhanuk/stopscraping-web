import React, { useState, useEffect } from 'react';
import { useUser } from "@clerk/clerk-react";
import { supabase } from '../lib/supabase';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

interface ApiKey {
    id: string;
    api_key: string;
    tier: string;
    is_active: boolean;
    created_at: string;
}

export function ApiKeyManagement() {
    const { user } = useUser();
    const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            fetchApiKeys();
        }
    }, [user]);

    const fetchApiKeys = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('api_keys')
            .select('*')
            .eq('user_id', user!.id);

        if (error) {
            console.error('Error fetching API keys:', error);
        } else {
            setApiKeys(data || []);
        }
        setLoading(false);
    };

    const generateApiKey = async (tier: string) => {
        const newApiKey = crypto.randomUUID();
        const { data, error } = await supabase
            .from('api_keys')
            .insert({ api_key: newApiKey, tier, user_id: user!.id })
            .select();

        if (error) {
            console.error('Error generating API key:', error);
        } else {
            setApiKeys([...apiKeys, data[0]]);
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
        // Delete all API keys
        const { error: deleteKeysError } = await supabase
            .from('api_keys')
            .delete()
            .eq('user_id', user!.id);

        if (deleteKeysError) {
            console.error('Error deleting API keys:', deleteKeysError);
            return;
        }

        // Delete Clerk user
        try {
            await user!.delete();
        } catch (error) {
            console.error('Error deleting Clerk user:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-6">API Key Management</h2>
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
                <Button onClick={deleteAccount} variant="destructive">
                    Delete Account
                </Button>
            </div>
        </div>
    );
}