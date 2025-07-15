import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { PricingPlans } from './PricingPlans';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export function PlanSelection() {
    const navigate = useNavigate();
    
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <Button
                    onClick={() => navigate('/')}
                    variant="outline"
                    className="flex items-center bg-white text-black hover:bg-white/90 transition-colors duration-300"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Home
                </Button>
            </div>
            <PricingPlans />
        </div>
    );
}