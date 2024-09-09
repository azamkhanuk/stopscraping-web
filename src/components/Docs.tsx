import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Copy, AlertTriangle, Check } from "lucide-react"

export default function Docs() {
    const [copiedEndpoint, setCopiedEndpoint] = useState<string | null>(null)

    const copyToClipboard = (text: string, endpoint: string) => {
        navigator.clipboard.writeText(text)
        setCopiedEndpoint(endpoint)
        setTimeout(() => setCopiedEndpoint(null), 2000)
    }

    return (
        <div className="bg-black text-white p-4 md:p-8">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">API Documentation</CardTitle>
                    <CardDescription className="text-slate-400">v1.0 of the API</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                    {/* Authentication Section */}
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">Authentication</h2>
                        <p className="text-white mb-2">All endpoints require an API key to be sent in the header of each request.</p>
                        <pre className="bg-gray-800 p-4 rounded-md overflow-x-auto">
                            <code className="text-sm text-white">
                                Header: X-API-Key: your_api_key_here
                            </code>
                        </pre>
                    </section>

                    {/* Endpoints Section */}
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">Endpoints</h2>

                        {/* Get Block IPs */}
                        <Card className="bg-white/5 border-white/10 mb-4">
                            <CardHeader>
                                <CardTitle className="text-white">1. Get Block IPs</CardTitle>
                                <CardDescription className="text-white">Retrieves the list of blocked IP ranges for OpenAI bots.</CardDescription>
                            </CardHeader>
                            <CardContent className="text-white">
                                <div className="flex items-center space-x-2 mb-4">
                                    <Input
                                        value="https://www.api.stopscraping.me/block-ips"
                                        readOnly
                                        className="bg-white/5 border-white/10 text-white"
                                    />
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => copyToClipboard('https://www.api.stopscraping.me/block-ips', 'get-block-ips-url')}
                                        className="bg-transparent hover:bg-white/10 text-white border-white/20 hover:border-white/40"
                                    >
                                        {copiedEndpoint === 'get-block-ips-url' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                    </Button>
                                </div>
                                <Tabs defaultValue="rest" className="mt-4">
                                    <TabsList className="bg-white/10">
                                        <TabsTrigger
                                            value="rest"
                                            className="text-white data-[state=active]:bg-white data-[state=active]:text-black data-[state=inactive]:text-gray-400"
                                        >
                                            REST
                                        </TabsTrigger>
                                        <TabsTrigger
                                            value="curl"
                                            className="text-white data-[state=active]:bg-white data-[state=active]:text-black data-[state=inactive]:text-gray-400"
                                        >
                                            cURL
                                        </TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="rest">
                                        <pre className="bg-gray-800 p-4 rounded-md overflow-x-auto">
                                            <code className="text-sm text-white">
                                                GET /block-ips HTTP/1.1<br />
                                                Host: api.stopscraping.me<br />
                                                X-API-Key: your_api_key_here
                                            </code>
                                        </pre>
                                    </TabsContent>
                                    <TabsContent value="curl">
                                        <pre className="bg-gray-800 p-4 rounded-md overflow-x-auto">
                                            <code className="text-sm text-white">
                                                curl -X GET https://www.api.stopscraping.me/block-ips \<br />
                                                &nbsp;&nbsp;-H "X-API-Key: your_api_key_here"
                                            </code>
                                        </pre>
                                    </TabsContent>
                                </Tabs>
                                <div className="mt-4">
                                    <p className="mb-2"><strong>Example Response:</strong></p>
                                    <pre className="bg-gray-800 p-4 rounded-md overflow-x-auto">
                                        <code className="text-sm text-white">
                                            {`{
  "openai": {
    "searchbot": ["192.111.1.1/24"],
    "chatgpt-user": ["10.0.0.1/24"],
    "gptbot": ["111.11.0.1/24"]
  }
}`}
                                        </code>
                                    </pre>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Get Bot IPs */}
                        <Card className="bg-white/5 border-white/10 mb-4">
                            <CardHeader>
                                <CardTitle className="text-white">2. Get Bot IPs</CardTitle>
                                <CardDescription className="text-white">Retrieves the list of blocked IP ranges for a specific OpenAI bot type.</CardDescription>
                            </CardHeader>
                            <CardContent className="text-white">
                                <div className="flex items-center space-x-2 mb-4">
                                    <Input
                                        value="https://www.api.stopscraping.me/block-ips/{bot_type}"
                                        readOnly
                                        className="bg-white/5 border-white/10 text-white"
                                    />
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => copyToClipboard('https://www.api.stopscraping.me/block-ips/{bot_type}', 'get-bot-ips-url')}
                                        className="bg-transparent hover:bg-white/10 text-white border-white/20 hover:border-white/40"
                                    >
                                        {copiedEndpoint === 'get-bot-ips-url' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                    </Button>
                                </div>
                                <p className="mb-2"><strong>Parameters:</strong></p>
                                <ul className="list-disc list-inside mb-4">
                                    <li>bot_type: The type of bot (e.g., "searchbot", "chatgpt-user", "gptbot")</li>
                                </ul>
                                <Tabs defaultValue="rest" className="mt-4">
                                    <TabsList className="bg-white/10">
                                        <TabsTrigger
                                            value="rest"
                                            className="text-white data-[state=active]:bg-white data-[state=active]:text-black data-[state=inactive]:text-gray-400"
                                        >
                                            REST
                                        </TabsTrigger>
                                        <TabsTrigger
                                            value="curl"
                                            className="text-white data-[state=active]:bg-white data-[state=active]:text-black data-[state=inactive]:text-gray-400"
                                        >
                                            cURL
                                        </TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="rest">
                                        <pre className="bg-gray-800 p-4 rounded-md overflow-x-auto">
                                            <code className="text-sm text-white">
                                                GET /block-ips/searchbot HTTP/1.1<br />
                                                Host: api.stopscraping.me<br />
                                                X-API-Key: your_api_key_here
                                            </code>
                                        </pre>
                                    </TabsContent>
                                    <TabsContent value="curl">
                                        <pre className="bg-gray-800 p-4 rounded-md overflow-x-auto">
                                            <code className="text-sm text-white">
                                                curl -X GET https://www.api.stopscraping.me/block-ips/searchbot \<br />
                                                &nbsp;&nbsp;-H "X-API-Key: your_api_key_here"
                                            </code>
                                        </pre>
                                    </TabsContent>
                                </Tabs>
                                <div className="mt-4">
                                    <p className="mb-2"><strong>Example Response:</strong></p>
                                    <pre className="bg-gray-800 p-4 rounded-md overflow-x-auto">
                                        <code className="text-sm text-white">
                                            {`{
  "searchbot": ["192.111.1.1/24"]
}`}
                                        </code>
                                    </pre>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Get API Usage */}
                        <Card className="bg-white/5 border-white/10 mb-4">
                            <CardHeader>
                                <CardTitle className="text-white">3. Get API Usage</CardTitle>
                                <CardDescription className="text-white">Retrieves the current API usage statistics for the authenticated user.</CardDescription>
                            </CardHeader>
                            <CardContent className="text-white">
                                <div className="flex items-center space-x-2 mb-4">
                                    <Input
                                        value="https://www.api.stopscraping.me/api-usage"
                                        readOnly
                                        className="bg-white/5 border-white/10 text-white"
                                    />
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => copyToClipboard('https://www.api.stopscraping.me/api-usage', 'get-api-usage-url')}
                                        className="bg-transparent hover:bg-white/10 text-white border-white/20 hover:border-white/40"
                                    >
                                        {copiedEndpoint === 'get-api-usage-url' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                    </Button>
                                </div>
                                <Tabs defaultValue="rest" className="mt-4">
                                    <TabsList className="bg-white/10">
                                        <TabsTrigger
                                            value="rest"
                                            className="text-white data-[state=active]:bg-white data-[state=active]:text-black data-[state=inactive]:text-gray-400"
                                        >
                                            REST
                                        </TabsTrigger>
                                        <TabsTrigger
                                            value="curl"
                                            className="text-white data-[state=active]:bg-white data-[state=active]:text-black data-[state=inactive]:text-gray-400"
                                        >
                                            cURL
                                        </TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="rest">
                                        <pre className="bg-gray-800 p-4 rounded-md overflow-x-auto">
                                            <code className="text-sm text-white">
                                                GET /api-usage HTTP/1.1<br />
                                                Host: api.stopscraping.me<br />
                                                X-API-Key: your_api_key_here
                                            </code>
                                        </pre>
                                    </TabsContent>
                                    <TabsContent value="curl">
                                        <pre className="bg-gray-800 p-4 rounded-md overflow-x-auto">
                                            <code className="text-sm text-white">
                                                curl -X GET https://www.api.stopscraping.me/api-usage \<br />
                                                &nbsp;&nbsp;-H "X-API-Key: your_api_key_here"
                                            </code>
                                        </pre>
                                    </TabsContent>
                                </Tabs>
                                <div className="mt-4">
                                    <p className="mb-2"><strong>Example Response:</strong></p>
                                    <pre className="bg-gray-800 p-4 rounded-md overflow-x-auto">
                                        <code className="text-sm text-white">
                                            {`{
  "tier": "basic",
  "used_requests": 45,
  "remaining_requests": 55,
  "reset_in_seconds": 14400,
  "reset_time": "2023-04-15T00:00:00"
}`}
                                        </code>
                                    </pre>
                                </div>
                            </CardContent>
                        </Card>
                    </section>

                    {/* Rate Limiting Section */}
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">Rate Limiting</h2>
                        <Card className="bg-white/5 border-white/10">
                            <CardContent className="text-white pt-6">
                                <p>The API is subject to rate limiting based on your account tier:</p>
                                <ul className="list-disc list-inside mt-2 mb-4">
                                    <li>Free tier: 10 requests per day</li>
                                    <li>Basic tier: 100 requests per day</li>
                                    <li>Higher tiers: Unlimited requests</li>
                                </ul>
                                <Alert className="bg-yellow-900/50 border-yellow-600">
                                    <AlertTriangle className="h-4 w-4" color="white" />
                                    <AlertTitle className="text-slate-200">Rate Limit Exceeded</AlertTitle>
                                    <AlertDescription className="text-slate-200">
                                        If you exceed your rate limit, you'll receive a 429 error with information about when the limit will reset.
                                    </AlertDescription>
                                </Alert>
                            </CardContent>
                        </Card>
                    </section>

                    {/* Error Responses Section */}
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">Error Responses</h2>
                        <Card className="bg-white/5 border-white/10">
                            <CardContent className="text-white pt-6">
                                <p>In case of errors, the API will return appropriate HTTP status codes along with error details in the response body.</p>
                                <div className="mt-4 mb-4">
                                    <p className="mb-2"><strong>Example error response:</strong></p>
                                    <pre className="bg-gray-800 p-4 rounded-md overflow-x-auto">
                                        <code className="text-sm text-white">
                                            {`{
  "detail": "API call limit exceeded. Resets in 2 hours, 30 minutes."
}`}
                                        </code>
                                    </pre>
                                </div>
                                <Alert className="bg-blue-900/50 border-blue-600">
                                    <AlertTitle className="text-slate-200">Need Help?</AlertTitle>
                                    <AlertDescription className="text-slate-200">
                                        For any issues or questions about the API, please contact our support team.
                                    </AlertDescription>
                                </Alert>
                            </CardContent>
                        </Card>
                    </section>
                </CardContent>
            </Card>
        </div>
    )
}