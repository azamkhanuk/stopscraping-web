import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export function SuccessPage() {
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(true);

    useEffect(() => {
        // Mock processing delay for showcase
        const timer = setTimeout(() => {
            setIsProcessing(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const handleContinue = () => {
        navigate("/api-keys");
    };

    const handleGoHome = () => {
        navigate("/");
    };

    if (isProcessing) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500 mx-auto mb-4"></div>
                    <p className="text-xl text-gray-300">Processing your payment...</p>
                    <p className="text-sm text-gray-400 mt-2">This is a demo - no actual payment is processed</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center text-white p-4">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 max-w-md w-full">
                <CardHeader className="text-center">
                    <div className="mx-auto mb-4">
                        <CheckCircle className="w-16 h-16 text-green-400" />
                    </div>
                    <CardTitle className="text-white text-2xl">Payment Successful!</CardTitle>
                    <CardDescription className="text-gray-400">
                        Your subscription has been activated successfully.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="text-center space-y-2">
                        <p className="text-gray-300">Welcome to the Basic plan!</p>
                        <p className="text-sm text-gray-400">
                            You now have access to:
                        </p>
                        <ul className="text-sm text-gray-400 space-y-1">
                            <li>• Daily IP updates</li>
                            <li>• 100 API calls per day</li>
                            <li>• Additional AI company IPs</li>
                        </ul>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <Button
                            onClick={handleContinue}
                            className="bg-purple-600 hover:bg-purple-700 text-white"
                        >
                            Go to API Keys
                        </Button>
                        <Button
                            onClick={handleGoHome}
                            variant="outline"
                            className="bg-transparent text-white border-white/20 hover:bg-white/10"
                        >
                            Back to Home
                        </Button>
                    </div>
                    <p className="text-xs text-gray-500 text-center">
                        Note: This is a demo environment - no actual payment was processed.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}