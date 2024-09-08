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
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from './lib/stripe';

export default function App() {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return <LoadingSpinner />;
  }

  return (
    <Elements stripe={stripePromise}>
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
                  <PricingPlans />  {/* Remove the onPlanSelect prop */}
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
    </Elements>
  )
}