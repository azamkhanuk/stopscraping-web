import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Shield, Zap, Lock, Code, Bot, Database } from "lucide-react"

export default function Component() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">DataShield API</h1>
        <div className="space-x-4">
          <Button variant="outline">Log In</Button>
          <Button>Sign Up</Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 flex-grow flex flex-col justify-center">
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Protect Your Data from AI Scraping</h2>
          <p className="text-xl text-muted-foreground mb-8">Our advanced API ensures your valuable data remains secure from AI-powered scraping attempts.</p>
        </section>

        <section className="grid grid-cols-3 gap-6 mb-12">
          {[
            { icon: Shield, title: "AI Detection", description: "Identify and block AI-powered scraping attempts in real-time." },
            { icon: Zap, title: "Lightning Fast", description: "Minimal impact on your website's performance and user experience." },
            { icon: Lock, title: "Data Protection", description: "Keep your sensitive information safe from unauthorized access." },
            { icon: Code, title: "Easy Integration", description: "Simple API calls to implement protection on your website." },
            { icon: Bot, title: "Bot Mitigation", description: "Advanced techniques to differentiate between good bots and malicious ones." },
            { icon: Database, title: "Data Insights", description: "Gain valuable insights into scraping attempts and patterns." },
          ].map((feature, index) => (
            <Card key={index} className="flex flex-col justify-between">
              <CardHeader>
                <feature.icon className="w-10 h-10 mb-3 text-primary" />
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </section>

        <section className="text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Secure Your Data?</h3>
          <p className="text-muted-foreground mb-8">Join thousands of websites already protected by DataShield API.</p>
          <Button size="lg" className="w-full sm:w-auto">Get Started Now</Button>
        </section>
      </main>

      <footer className="container mx-auto px-4 py-6 text-center text-muted-foreground">
        <p>&copy; 2023 DataShield API. All rights reserved.</p>
      </footer>
    </div>
  )
}