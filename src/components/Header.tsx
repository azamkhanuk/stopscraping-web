import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { SignInButton, SignUpButton, SignOutButton, useUser } from "@clerk/clerk-react"

export function Header() {
    const { isSignedIn, user } = useUser();

    return (
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
                        className="w-[300px] sm:w-[400px] bg-black border-white/20 text-white"
                    >
                        <SheetHeader>
                            <SheetTitle className="text-left text-white">stopscraping.me</SheetTitle>
                            <SheetDescription className="sr-only">
                                This menu provides navigation options and account actions.
                            </SheetDescription>
                            <SheetClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-black transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-white/10">
                                <span className="sr-only">Close</span>
                            </SheetClose>
                        </SheetHeader>
                        <div className="mt-6 flex flex-col gap-4">
                            {isSignedIn ? (
                                <>
                                    <Button variant="outline" className="w-full bg-transparent hover:bg-white/10 text-white border-white/20 hover:border-white/40 transition-colors duration-300">
                                        {user.firstName || 'Account'}
                                    </Button>
                                    <SignOutButton>
                                        <Button className="w-full bg-white text-black hover:bg-white/90 transition-colors duration-300">
                                            Sign Out
                                        </Button>
                                    </SignOutButton>
                                </>
                            ) : (
                                <>
                                    <SignInButton mode="modal">
                                        <Button variant="outline" className="w-full bg-transparent hover:bg-white/10 text-white border-white/20 hover:border-white/40 transition-colors duration-300">
                                            Log In
                                        </Button>
                                    </SignInButton>
                                    <SignUpButton mode="modal">
                                        <Button className="w-full bg-white text-black hover:bg-white/90 transition-colors duration-300">
                                            Sign Up
                                        </Button>
                                    </SignUpButton>
                                </>
                            )}
                        </div>
                        <SheetFooter className="absolute bottom-4 left-4 right-4">
                            <SheetClose asChild>
                                <Button variant="ghost" className="w-full text-gray-400 hover:text-white hover:bg-white/10">
                                    Close
                                </Button>
                            </SheetClose>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
            </div>
            <div className="hidden md:flex space-x-4">
                {isSignedIn ? (
                    <>
                        <Button variant="outline" className="bg-transparent hover:bg-white/10 text-white border-white/20 hover:border-white/40 transition-all duration-300">
                            {user.firstName || 'Account'}
                        </Button>
                        <SignOutButton>
                            <Button className="bg-white text-black hover:bg-white/90 transition-all duration-300">Sign Out</Button>
                        </SignOutButton>
                    </>
                ) : (
                    <>
                        <SignInButton mode="modal">
                            <Button variant="outline" className="bg-transparent hover:bg-white/10 text-white hover:text-white border-white/20 hover:border-white/40 transition-all duration-300">
                                Log In
                            </Button>
                        </SignInButton>
                        <SignUpButton mode="modal">
                            <Button className="bg-white text-black hover:bg-white/90 transition-all duration-300">Sign Up</Button>
                        </SignUpButton>
                    </>
                )}
            </div>
        </header>
    )
}