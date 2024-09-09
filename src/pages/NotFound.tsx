import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Home } from "lucide-react"

export default function NotFound() {
    const [progress, setProgress] = useState(0)
    const [message, setMessage] = useState("Oops! Page not found. Searching...")

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress >= 50) {
                    clearInterval(timer)
                    setMessage("Just kidding, it doesn't exist.")
                    return 50
                }
                const diff = Math.random() * 10
                return Math.min(oldProgress + diff, 50)
            })
        }, 500)

        return () => {
            clearInterval(timer)
        }
    }, [])

    return (
        <div className="min-h-screen text-white flex items-center justify-center p-4">
            <Card className="w-full max-w-md bg-white/5 backdrop-blur-sm border-white/10">
                <CardContent className="pt-6 flex flex-col items-center text-center">
                    <div className="text-9xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
                        404
                    </div>
                    <h1 className="text-2xl font-semibold mb-4 text-white">{message}</h1>
                    <Progress value={progress} className="w-full mb-6" />
                    <div className="flex space-x-4">
                        <Button
                            className="bg-purple-600 hover:bg-purple-700 text-white px-6"
                            onClick={() => window.location.href = '/'}
                        >
                            <Home className="mr-2 h-4 w-4" /> Go Home
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}