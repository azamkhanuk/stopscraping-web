import { useUser } from "@clerk/clerk-react"
import { ApiKeyManagement } from '@/components/ApiKeyManagement'
import { Footer } from "./components/Footer"
import { Header } from "./components/Header"
import { Hero } from "./components/Hero"
import { FeatureGrid } from "./components/FeatureGrid"
import { PricingPlans } from "./components/PricingPlans"
import { PlanSelection } from "./components/PlanSelection"
import { LoadingSpinner } from "./components/LoadingSpinner"
import { Navigate, Route, Routes } from "react-router-dom"

export default function App() {
  const { isSignedIn, isLoaded } = useUser();

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
              isSignedIn ? <Navigate to="/select-plan" /> : (
                <>
                  <Hero />
                  <FeatureGrid />
                  <PricingPlans />
                </>
              )
            } />
            <Route path="/select-plan" element={
              isSignedIn ? <PlanSelection /> : <Navigate to="/" />
            } />
            <Route path="/api-keys" element={
              isSignedIn ? <ApiKeyManagement /> : <Navigate to="/" />
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  )
}