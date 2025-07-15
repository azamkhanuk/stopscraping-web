import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { LoadingSpinner } from './LoadingSpinner';
import { RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
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
  status: string;
  current_period_start: number;
  current_period_end: number;
  cancel_at_period_end: boolean;
}

export function ApiKeyManagement() {
  const { toast } = useToast();
  // Mock data for showcase
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    {
      id: '1',
      api_key: 'sk-demo_1234567890abcdef1234567890abcdef',
      tier: 'Free',
      is_active: true,
      created_at: new Date().toISOString(),
      user_id: 'demo-user',
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Mock subscription for showcase
  const subscription: StripeSubscription = {
    id: 'sub_demo123',
    status: 'active',
    current_period_start: Math.floor(Date.now() / 1000),
    current_period_end: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60, // 30 days from now
    cancel_at_period_end: false,
  };

  // Mock user data
  const mockUser = {
    firstName: 'Demo',
    id: 'demo-user-id',
    unsafeMetadata: {
      pricingPlan: 'Free',
      stripeCustomerId: 'cus_demo123',
    },
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast({
          title: 'Copied',
          description: 'API key copied to clipboard',
          duration: 1000,
        });
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
        toast({
          title: 'Error',
          description: 'Failed to copy API key',
          duration: 1000,
        });
      });
  };

  const regenerateApiKey = async () => {
    setLoading(true);
    toast({
      title: 'Generating new API key',
      description: 'Please wait while we create your new key...',
      duration: 2000,
    });

    // Mock API key regeneration
    setTimeout(() => {
      const newApiKey = `sk-demo_${crypto.randomUUID().replace(/-/g, '')}`;
      setApiKeys([
        {
          ...apiKeys[0],
          api_key: newApiKey,
          created_at: new Date().toISOString(),
        },
      ]);

      toast({
        title: 'Success',
        description: 'New API key generated successfully! (Demo)',
        duration: 2000,
      });
      setLoading(false);
    }, 1500);
  };

  const deleteAccount = async () => {
    toast({
      title: 'Demo Mode',
      description: 'Account deletion is disabled in demo mode.',
      duration: 2000,
    });
  };

  const handleUpgrade = async () => {
    toast({
      title: 'Demo Mode',
      description: 'This is a demo - payment processing would be handled here.',
      duration: 2000,
    });
  };

  const handleCancelSubscription = async () => {
    toast({
      title: 'Demo Mode',
      description: 'This is a demo - subscription would be cancelled here.',
      duration: 2000,
    });
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  const currentApiKey = apiKeys.length > 0 ? apiKeys[0].api_key : 'No API key found';
  const userPlan = mockUser.unsafeMetadata.pricingPlan;

  return (
    <div className='min-h-screen text-white p-4 md:p-6 lg:p-8'>
      <h1 className='text-3xl font-bold mb-6'>Welcome, {mockUser.firstName || 'User'}</h1>
      <Tabs defaultValue='api-key' className='space-y-4'>
        <TabsList className='grid w-full grid-cols-3 bg-white/10'>
          <TabsTrigger
            value='api-key'
            className='text-white data-[state=active]:bg-white data-[state=active]:text-black data-[state=inactive]:text-gray-400'
          >
            API Key
          </TabsTrigger>
          <TabsTrigger
            value='subscription'
            className='text-white data-[state=active]:bg-white data-[state=active]:text-black data-[state=inactive]:text-gray-400'
          >
            Subscription
          </TabsTrigger>
          <TabsTrigger
            value='account'
            className='text-white data-[state=active]:bg-white data-[state=active]:text-black data-[state=inactive]:text-gray-400'
          >
            Account
          </TabsTrigger>
        </TabsList>

        <TabsContent value='api-key'>
          <Card className='bg-white/5 backdrop-blur-sm border-white/10'>
            <CardHeader>
              <CardTitle className='text-white'>API Key Management</CardTitle>
              <CardDescription className='text-gray-400'>
                View and manage your API key
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-1'>
                <Label htmlFor='apiKey' className='text-white'>
                  Current API Key
                </Label>
                <div className='flex items-center space-x-2'>
                  <Input
                    id='apiKey'
                    value={currentApiKey}
                    readOnly
                    className='bg-white/5 border-white/10 text-white'
                  />
                  <Button
                    onClick={() => copyToClipboard(currentApiKey)}
                    variant='outline'
                    className='bg-transparent hover:bg-white/10 text-white hover:text-white border-white/20 hover:border-white/40'
                  >
                    Copy
                  </Button>
                </div>
              </div>
              {apiKeys.length > 0 && (
                <div className='text-sm text-gray-400'>
                  <p>
                    Tier: <span className='text-purple-300'>{apiKeys[0].tier}</span>
                  </p>
                  <p>
                    Created:{' '}
                    <span className='text-gray-300'>
                      {format(new Date(apiKeys[0].created_at), 'PPp')}
                    </span>
                  </p>
                  <p>
                    Status: <span className='text-green-400'>Active</span>
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button
                onClick={regenerateApiKey}
                disabled={loading}
                className='bg-purple-600 hover:bg-purple-700 text-white'
              >
                <RefreshCw className='w-4 h-4 mr-2' />
                Regenerate API Key
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value='subscription'>
          <Card className='bg-white/5 backdrop-blur-sm border-white/10'>
            <CardHeader>
              <CardTitle className='text-white'>Subscription Management</CardTitle>
              <CardDescription className='text-gray-400'>
                Manage your subscription and billing
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              {userPlan === 'Free' ? (
                <div className='space-y-4'>
                  <p className='text-gray-300'>
                    You're currently on the{' '}
                    <span className='text-purple-300 font-semibold'>Free</span> plan.
                  </p>
                  <Button
                    onClick={handleUpgrade}
                    className='bg-purple-600 hover:bg-purple-700 text-white'
                  >
                    Upgrade to Basic - £5/month
                  </Button>
                </div>
              ) : (
                <div className='space-y-4'>
                  <div className='text-sm text-gray-400'>
                    <p>
                      Plan: <span className='text-purple-300 font-semibold'>{userPlan}</span>
                    </p>
                    <p>
                      Status: <span className='text-green-400'>{subscription?.status}</span>
                    </p>
                    {subscription && (
                      <>
                        <p>
                          Current period:{' '}
                          {format(new Date(subscription.current_period_start * 1000), 'PPP')} -{' '}
                          {format(new Date(subscription.current_period_end * 1000), 'PPP')}
                        </p>
                        {subscription.cancel_at_period_end && (
                          <p className='text-yellow-400'>
                            Your subscription will end on{' '}
                            {format(new Date(subscription.current_period_end * 1000), 'PPP')}
                          </p>
                        )}
                      </>
                    )}
                  </div>
                  {subscription && !subscription.cancel_at_period_end && (
                    <Button
                      onClick={handleCancelSubscription}
                      variant='destructive'
                      className='bg-red-600 hover:bg-red-700 text-white'
                    >
                      Cancel Subscription
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='account'>
          <Card className='bg-white/5 backdrop-blur-sm border-white/10'>
            <CardHeader>
              <CardTitle className='text-white'>Account Settings</CardTitle>
              <CardDescription className='text-gray-400'>
                Manage your account preferences
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-2'>
                <Label className='text-white'>Account Information</Label>
                <div className='text-sm text-gray-400'>
                  <p>
                    Name: <span className='text-gray-300'>{mockUser.firstName} User</span>
                  </p>
                  <p>
                    Plan: <span className='text-purple-300'>{userPlan}</span>
                  </p>
                  <p>
                    Account Status: <span className='text-green-400'>Active</span>
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogTrigger asChild>
                  <Button variant='destructive' className='bg-red-600 hover:bg-red-700 text-white'>
                    Delete Account
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className='bg-gray-900 border-gray-700 text-white'>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription className='text-gray-400'>
                      This action cannot be undone. This will permanently delete your account and
                      remove all your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className='bg-transparent text-white border-white/20 hover:bg-white/10'>
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={deleteAccount}
                      className='bg-red-600 hover:bg-red-700 text-white'
                    >
                      Delete Account
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
