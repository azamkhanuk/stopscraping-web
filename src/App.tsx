import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet"
import { Shield, Zap, Lock, Code, Bot, Database, Menu, X } from "lucide-react"

export default function Component() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white relative">
      <div className="absolute inset-0 bg-noise opacity-[0.05] pointer-events-none"></div>
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
            <Button variant="outline" className="bg-transparent hover:bg-transparent text-white border-gray-600 hover:border-white transition-colors duration-300">Log In</Button>
            <Button className="bg-blue-600 hover:bg-blue-600 border border-transparent hover:border-white transition-colors duration-300">Sign Up</Button>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8 flex-grow flex flex-col justify-center">
          <section className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Protect Your Data from AI Scraping</h2>
            <p className="text-xl text-gray-300 mb-8">Our advanced API ensures your valuable data remains secure from AI-powered scraping attempts.</p>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-600 border border-transparent hover:border-white transition-colors duration-300">
              Get Started Now
            </Button>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              { icon: Shield, title: "AI Detection", description: "Identify and block AI-powered scraping attempts in real-time." },
              { icon: Zap, title: "Lightning Fast", description: "Minimal impact on your website's performance and user experience." },
              { icon: Lock, title: "Data Protection", description: "Keep your sensitive information safe from unauthorized access." },
              { icon: Code, title: "Easy Integration", description: "Simple API calls to implement protection on your website." },
              { icon: Bot, title: "Bot Mitigation", description: "Advanced techniques to differentiate between good bots and malicious ones." },
              { icon: Database, title: "Data Insights", description: "Gain valuable insights into scraping attempts and patterns." },
            ].map((feature, index) => (
              <Card key={index} className="bg-gray-800 bg-opacity-50 backdrop-blur-sm border-gray-700 hover:bg-opacity-70 transition-all duration-300 flex flex-col justify-between group">
                <CardHeader>
                  <feature.icon className="w-10 h-10 mb-3 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" aria-hidden="true" />
                  <CardTitle className="text-gray-100 group-hover:text-white transition-colors duration-300">{feature.title}</CardTitle>
                  <CardDescription className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </section>
        </main>

        <footer className="container mx-auto px-4 py-6 text-center text-gray-400 text-sm">
          <p>&copy; 2023 DataShield API. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}