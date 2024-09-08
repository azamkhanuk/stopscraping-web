import { useUser } from "@clerk/clerk-react"
import { ApiKeyManagement } from '@/components/ApiKeyManagement'
import { Footer } from "./components/Footer"
import { Header } from "./components/Header"
import { Hero } from "./components/Hero"
import { FeatureGrid } from "./components/FeatureGrid"
import { PricingPlans } from "./components/PricingPlans"
import { PlanSelection } from "./components/PlanSelection"
import { LoadingSpinner } from "./components/LoadingSpinner"
import { Docs } from "./components/Docs"
import { Navigate, Route, Routes } from "react-router-dom"
import { Toaster } from './components/ui/toaster';
import { SuccessPage } from "./pages/SuccessPage"
import { useState } from 'react';

export default function App() {
  const { isSignedIn, isLoaded } = useUser();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePlanSelection = async (plan: string) => {
    if (!isSignedIn || isProcessing) {
      return;
    }

    setIsProcessing(true);

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plan }),
      });

      const session = await response.json();
      window.location.href = session.url;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isLoaded) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-black text-white relative">
      <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none"></div>
      <div className="relative z-10">
        <Header />

        <main className="container mx-auto px-4 py-8 flex-grow flex flex-col justify-center">
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <FeatureGrid />
                <PricingPlans onPlanSelect={handlePlanSelection} />
              </>
            } />
            <Route path="/docs" element={<Docs />} />
            <Route path="/select-plan" element={
              isSignedIn ? <PlanSelection /> : <Navigate to="/" />
            } />
            <Route path="/api-keys" element={
              isSignedIn ? <ApiKeyManagement /> : <Navigate to="/" />
            } />
            <Route path="/success" element={<SuccessPage />} />
          </Routes>
        </main>
        <Footer />
        <Toaster />
      </div>
    </div>
  )
}