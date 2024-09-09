import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from './lib/stripe';
import { useUser } from "@clerk/clerk-react"
import { Footer } from "./components/Footer"
import { Header } from "./components/Header"
import { Hero } from "./components/Hero"
import { FeatureGrid } from "./components/FeatureGrid"
import { VisualRepresentation } from "./components/VisualRepresentation"
import { PricingPlans } from "./components/PricingPlans"
import { PlanSelection } from "./components/PlanSelection"
import { LoadingSpinner } from "./components/LoadingSpinner"
import { Navigate, Route, Routes } from "react-router-dom"
import { Toaster } from './components/ui/toaster';
import { SuccessPage } from "./pages/SuccessPage"
import { ApiKeyManagement } from '@/components/ApiKeyManagement'
import Docs from "./components/Docs"
import NotFound from "./pages/NotFound"
import PrivacyPolicy from "./pages/PrivacyPolicy"
import TermsAndConditions from "./pages/TermsAndConditions"
import StructuredData from './components/StructuredData';

export default function App() {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return <LoadingSpinner />;
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "stopscraping.me",
    "url": "https://www.stopscraping.me/",
    "description": "Protect your website from AI scrapers with our up-to-date IP blocking service.",
  };

  return (
    <Elements stripe={stripePromise}>
      <div className="min-h-screen bg-[#050505] text-white relative">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950/30 via-black to-pink-950/30 opacity-90"></div>
        <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none"></div>
        <div className="relative z-10 flex flex-col min-h-screen">
          <Header />

          <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Routes>
              <Route path="/" element={
                <>
                  <Hero />
                  <FeatureGrid />
                  <VisualRepresentation />
                  <PricingPlans />
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
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <Toaster />
          <StructuredData data={structuredData} />
        </div>
      </div>
    </Elements>
  )
}