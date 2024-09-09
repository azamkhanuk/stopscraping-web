import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Copy, Check, Shield, Globe } from "lucide-react"

export function VisualRepresentation() {
    const [copiedEndpoint, setCopiedEndpoint] = useState<string | null>(null)

    const copyToClipboard = (text: string, endpoint: string) => {
        navigator.clipboard.writeText(text)
        setCopiedEndpoint(endpoint)
        setTimeout(() => setCopiedEndpoint(null), 2000)
    }

    return (
        <section className="pt-16 sm:pt-24 lg:pt-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center">
                    <div className="lg:w-1/2 lg:pr-8 mb-12 lg:mb-0">
                        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl mb-6">
                            <span className="block">Add the IPs to your</span>
                            <span className="block bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
                                Infrastructure, Firewall or Deny List.
                            </span>
                        </h2>
                        <p className="mt-6 max-w-2xl text-lg sm:text-l mb-8">
                            Protect your website from AI scraping with our comprehensive and expanding IP blocking list. Enhance your digital security effortlessly.
                        </p>
                    </div>

                    {/* Visual Representation */}
                    <div className="lg:w-1/2 flex justify-center">
                        <div className="relative">
                            <div className="relative flex flex-col lg:flex-row items-center">
                                <div className="relative w-64 h-64 mb-8 lg:mb-0 lg:mr-8">
                                    <Shield className="relative z-10 w-full h-full text-purple-400 stroke-[0.5]">
                                        <div className="absolute inset-0 w-64 h-64 bg-purple-500 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
                                    </Shield>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Globe className="w-24 h-24 text-green-400 stroke-[0.5]" />
                                    </div>
                                </div>
                                <div className="flex flex-col items-center lg:items-start">
                                    <div className="flex justify-center space-x-4 mb-4">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="flex flex-col items-center animate-bounce" style={{ animationDelay: `${i * 0.2}s` }}>
                                                <div className="w-3 h-3 bg-red-500 rounded-full mb-2"></div>
                                                <div className="text-red-500 font-mono text-xs">192.168.1.{i}</div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="text-center lg:text-left text-green-400 font-mono mb-4">
                                        AI Access Blocked
                                    </div>
                                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center lg:text-left">
                                        <p className="text-sm text-gray-300">Your Web App is Protected</p>
                                        <p className="text-xs text-gray-400 mt-1">Shielded against AI scraping attempts</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Start Section */}
                <div className="mt-16">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 max-w-2xl">
                        <div className="flex items-center space-x-2 mb-2">
                            <Input
                                value="https://www.api.stopscraping.me/block-ips"
                                readOnly
                                className="bg-white/5 border-white/10 text-white"
                            />
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => copyToClipboard('https://www.api.stopscraping.me/block-ips', 'quick-start')}
                                className="bg-transparent hover:bg-white/10 text-white border-white/20 hover:border-white/40"
                            >
                                {copiedEndpoint === 'quick-start' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </Button>
                        </div>
                        <p className="text-sm text-gray-300">Get your API key and start blocking AI scrapers.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}