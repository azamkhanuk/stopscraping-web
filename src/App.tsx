import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet"
import { Shield, Zap, Code, Bot, Database, Menu, DollarSign, Check, Wrench } from "lucide-react"
import { getCurrentYear } from "@/utils/dateUtils"

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white relative">
      <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none"></div>
      <div className="relative z-10">
        <header className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">stopscraping.me</h1>
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] sm:w-[400px] bg-gray-900 border-gray-800 text-white"
              >
                <SheetHeader>
                  <SheetTitle className="text-left text-white">stopscraping.me</SheetTitle>
                  <SheetDescription className="sr-only">
                    This menu provides navigation options and account actions.
                  </SheetDescription>
                  <SheetClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-gray-900 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-gray-800">
                    <span className="sr-only">Close</span>
                  </SheetClose>
                </SheetHeader>
                <div className="mt-6 flex flex-col gap-4">
                  <Button variant="outline" className="w-full bg-transparent hover:bg-gray-800 text-white border-gray-600 hover:border-white transition-colors duration-300">
                    Log In
                  </Button>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-300">
                    Sign Up
                  </Button>
                </div>
                <SheetFooter className="absolute bottom-4 left-4 right-4">
                  <SheetClose asChild>
                    <Button variant="ghost" className="w-full text-gray-400 hover:text-white hover:bg-gray-800">
                      Close
                    </Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
          <div className="hidden md:flex space-x-4">
            <Button variant="outline" className="bg-transparent hover:bg-white/10 text-white border-white/20 hover:border-white/40 transition-all duration-300">Log In</Button>
            <Button className="bg-white text-black hover:bg-white/90 transition-all duration-300">Sign Up</Button>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8 flex-grow flex flex-col justify-center">
          <section className="text-center mb-20">
            <h2 className="text-5xl font-bold pb-6 bg-gradient-to-r from-purple-300 to-pink-300 text-transparent bg-clip-text">Tired of Getting DDoS'd by AI Companies?</h2>
            <p className="text-xl text-gray-300 mb-10">Get an always-updated list of AI scrapers' IPs to block. Currently focused on OpenAI, with more coming soon.</p>
            <Button size="lg" className="bg-purple-600 text-white hover:bg-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Block AI Scrapers Now
            </Button>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[
              { icon: Bot, title: "Up-to-Date IP List", description: "Daily updates ensure you're always blocking the latest known AI scraper IPs." },
              { icon: Zap, title: "Lightning Fast", description: "Minimal impact on your website's performance and user experience." },
              { icon: Shield, title: "Expandable Protection", description: "As we add more AI companies to our block list, your protection grows automatically." },
              { icon: Code, title: "Easy Integration", description: "Simple API calls to retrieve the latest IP list for your deny list." },
              { icon: Database, title: "Developer Friendly", description: "Designed with developers in mind, for seamless integration into your existing setup." },
              { icon: DollarSign, title: "Simple pricing", description: "Flexible fortification: Daily updates for less than your coffee." },

            ].map((feature, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 flex flex-col justify-between group">
                <CardHeader>
                  <feature.icon className="w-10 h-10 mb-3 text-purple-300 group-hover:text-pink-300 transition-colors duration-300" aria-hidden="true" />
                  <CardTitle className="text-gray-100 group-hover:text-white transition-colors duration-300">{feature.title}</CardTitle>
                  <CardDescription className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </section>

          <section className="mt-20 mb-12">
            <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-purple-300 to-pink-300 text-transparent bg-clip-text">Choose Your Plan</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Free Tier",
                  price: "$0",
                  features: [
                    "Static list of OpenAI IPs, updated weekly",
                    "Limited API calls (100/day)",
                  ],
                  cta: "Get Started",
                  disabled: false,
                },
                {
                  title: "Basic Tier",
                  price: "$5/month",
                  features: [
                    "Daily IP updates",
                    "Increased API call limit (1000/day)",
                    "Additional AI company IPs as they get added in",
                    { text: "Email notifications for significant list changes", inProgress: true },
                  ],
                  cta: "Subscribe Now",
                  disabled: false,
                },
                {
                  title: "Pro Tier",
                  price: "$15/month",
                  features: [
                    "Everything in Basic",
                    "Real-time IP updates",
                    "Unlimited API calls",
                    "Analytics on blocked requests",
                    "Priority support",
                  ],
                  cta: "Coming Soon",
                  disabled: true,
                },
              ].map((tier, index) => (
                <Card
                  key={index}
                  className={`bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 flex flex-col justify-between cursor-pointer ${tier.disabled ? 'opacity-50 pointer-events-none' : ''}`}
                >
                  <CardHeader className="text-center">
                    <CardTitle className="text-gray-100 text-2xl font-bold mb-2">{tier.title}</CardTitle>
                    <CardDescription className="text-3xl font-semibold text-purple-300">{tier.price}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col h-full">
                    <ul className="space-y-3 flex-grow">
                      {tier.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-start">
                          {typeof feature === 'string' ? (
                            <>
                              <Check className="w-5 h-5 mr-3 text-green-400 flex-shrink-0 mt-1" />
                              <span className="text-gray-300 text-sm">{feature}</span>
                            </>
                          ) : (
                            <>
                              <Wrench className="w-5 h-5 mr-3 text-gray-400 flex-shrink-0 mt-1" />
                              <span className="text-gray-400 text-sm">{feature.text}</span>
                            </>
                          )}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="flex justify-center pt-6">
                    <Button
                      className={`w-full ${tier.disabled ? 'bg-gray-700 text-gray-400' : 'bg-purple-600 hover:bg-purple-700 text-white'} transition-all duration-300 py-6`}
                      disabled={tier.disabled}
                    >
                      {tier.cta}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>

          <section className="text-center mt-12">
            <Button size="lg" className="bg-white text-black hover:bg-gray-200 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1">
              Get Started for Free
            </Button>
          </section>
        </main>

        <footer className="container mx-auto px-4 py-6 text-center text-gray-500 text-sm">
          <p>&copy; {getCurrentYear()} stopscraping.me | Empowering digital autonomy</p>
        </footer>
      </div>
    </div>
  )
}