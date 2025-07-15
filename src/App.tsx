import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from './lib/stripe';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FeatureGrid } from './components/FeatureGrid';
import { VisualRepresentation } from './components/VisualRepresentation';
import { PricingPlans } from './components/PricingPlans';
import { PlanSelection } from './components/PlanSelection';
import { LoadingSpinner } from './components/LoadingSpinner';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from './components/ui/toaster';
import { SuccessPage } from './pages/SuccessPage';
import { ApiKeyManagement } from '@/components/ApiKeyManagement';
import Docs from './components/Docs';
import NotFound from './pages/NotFound';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import StructuredData from './components/StructuredData';

export default function App() {
  // Mock authentication state - always loaded for reference/showcase
  const isLoaded = true;

  if (!isLoaded) {
    return <LoadingSpinner />;
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'stopscraping.me',
    url: 'https://www.stopscraping.me/',
    description: 'Protect your website from AI scrapers with our up-to-date IP blocking service.',
  };

  return (
    <Elements stripe={stripePromise}>
      <div className='min-h-screen bg-[#050505] text-white relative'>
        <div className='absolute inset-0 bg-gradient-to-br via-black opacity-90 from-purple-950/30 to-pink-950/30'></div>
        <div className='absolute inset-0 bg-noise opacity-[0.02] pointer-events-none'></div>
        <div className='flex relative z-10 flex-col min-h-screen'>
          <Header />

          <main className='container flex-grow px-4 py-8 mx-auto sm:px-6 lg:px-8'>
            <Routes>
              <Route
                path='/'
                element={
                  <>
                    <Hero />
                    <FeatureGrid />
                    <VisualRepresentation />
                    <PricingPlans />
                  </>
                }
              />
              <Route path='/docs' element={<Docs />} />
              <Route path='/select-plan' element={<PlanSelection />} />
              <Route path='/api-keys' element={<ApiKeyManagement />} />
              <Route path='/success' element={<SuccessPage />} />
              <Route path='/privacy-policy' element={<PrivacyPolicy />} />
              <Route path='/terms-and-conditions' element={<TermsAndConditions />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <Toaster />
          <StructuredData data={structuredData} />
        </div>
      </div>
    </Elements>
  );
}
