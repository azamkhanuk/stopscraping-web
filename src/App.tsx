import { useUser } from "@clerk/clerk-react"
import { ApiKeyManagement } from '@/components/ApiKeyManagement'
import { Footer } from "./components/Footer"
import { Header } from "./components/Header"
import { Hero } from "./components/Hero"
import { FeatureGrid } from "./components/FeatureGrid"
import { PricingPlans } from "./components/PricingPlans"
import { Button } from "@/components/ui/button"
import { LoadingSpinner } from "./components/LoadingSpinner"

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
          {isSignedIn ? (
            <ApiKeyManagement />
          ) : (
            <>
              <Hero />
              <FeatureGrid />
              <PricingPlans />
              <section className="text-center mt-12">
                <Button size="lg" className="bg-white text-black hover:bg-gray-200 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1">
                  Get Started for Free
                </Button>
              </section>
            </>
          )}
        </main>
        <Footer />
      </div>
    </div>
  )
}