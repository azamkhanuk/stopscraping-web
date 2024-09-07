import { Button } from "@/components/ui/button"
import { useSignUp } from "@/hooks/use-sign-up"

export function Hero() {
    const handleSignUpOrSignIn = useSignUp();

    return (
        <section className="text-center mb-20">
            <h2 className="text-5xl font-bold pb-6 bg-gradient-to-r from-purple-300 to-pink-300 text-transparent bg-clip-text">Tired of Getting DDoS'd by AI Companies?</h2>
            <p className="text-xl text-gray-300 mb-10">Get an always-updated list of AI scrapers' IPs to block. Currently focused on OpenAI, with more coming soon.</p>
            <Button
                size="lg"
                className="bg-purple-600 text-white hover:bg-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                onClick={handleSignUpOrSignIn}
            >
                Block AI Scrapers Now
            </Button>
        </section>
    )
}