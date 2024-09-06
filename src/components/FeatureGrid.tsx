import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Shield, Zap, Code, Bot, Database, DollarSign } from "lucide-react"

const features = [
    { icon: Bot, title: "Up-to-Date IP List", description: "Daily updates ensure you're always blocking the latest known AI scraper IPs." },
    { icon: Zap, title: "Lightning Fast", description: "Minimal impact on your website's performance and user experience." },
    { icon: Shield, title: "Expandable Protection", description: "As we add more AI companies to our block list, your protection grows automatically." },
    { icon: Code, title: "Easy Integration", description: "Simple API calls to retrieve the latest IP list for your deny list." },
    { icon: Database, title: "Developer Friendly", description: "Designed with developers in mind, for seamless integration into your existing setup." },
    { icon: DollarSign, title: "Simple pricing", description: "Flexible fortification: Daily updates for less than your coffee." },
]

export function FeatureGrid() {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {features.map((feature, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 flex flex-col justify-between group">
                    <CardHeader>
                        <feature.icon className="w-10 h-10 mb-3 text-purple-300 group-hover:text-pink-300 transition-colors duration-300" aria-hidden="true" />
                        <CardTitle className="text-gray-100 group-hover:text-white transition-colors duration-300">{feature.title}</CardTitle>
                        <CardDescription className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">{feature.description}</CardDescription>
                    </CardHeader>
                </Card>
            ))}
        </section>
    )
}