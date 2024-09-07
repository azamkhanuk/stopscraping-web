import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { SignOutButton, useUser } from "@clerk/clerk-react"
import { useSignUp } from "@/hooks/use-sign-up"
import { useCustomSignIn } from "@/hooks/use-sign-in"
import { Link, useNavigate, useLocation } from "react-router-dom"

export function Header() {
    const { isSignedIn, user } = useUser();
    const handleSignUpOrSignIn = useSignUp();
    const handleSignIn = useCustomSignIn();
    const navigate = useNavigate();
    const location = useLocation();

    const hasPlan = user?.unsafeMetadata && 'pricingPlan' in user.unsafeMetadata;

    const handleLogoClick = (e: React.MouseEvent) => {
        e.preventDefault();
        navigate('/');
    };

    const isActive = (path: string) => location.pathname === path;

    const getLinkStyle = (path: string) => {
        return isActive(path)
            ? "bg-purple-600 text-white hover:bg-purple-700"
            : "bg-transparent text-white border border-white hover:bg-white hover:text-black";
    };

    const inactiveStyle = "bg-transparent text-white border border-white hover:bg-white hover:text-black";

    return (
        <header className="container mx-auto px-4 py-6 flex justify-between items-center">
            <a href="/" onClick={handleLogoClick} className="text-2xl font-bold hover:text-purple-300 transition-colors duration-300">
                stopscraping.me
            </a>
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
                            <Link to="/docs">
                                <Button className={`w-full ${getLinkStyle('/docs')} transition-colors duration-300`}>
                                    Docs
                                </Button>
                            </Link>
                            {isSignedIn && hasPlan && (
                                <Link to="/api-keys">
                                    <Button className={`w-full ${getLinkStyle('/api-keys')} transition-colors duration-300`}>
                                        API Keys
                                    </Button>
                                </Link>
                            )}
                            {!isSignedIn && (
                                <>
                                    <Button
                                        className={`w-full ${getLinkStyle('')} transition-colors duration-300`}
                                        onClick={handleSignIn}
                                    >
                                        Log In
                                    </Button>
                                    <Button
                                        className="w-full bg-white text-black hover:bg-white/90 transition-all duration-300"
                                        onClick={handleSignUpOrSignIn}
                                    >
                                        Sign Up
                                    </Button>
                                </>
                            )}
                        </div>
                        <SheetFooter className="absolute bottom-4 left-4 right-4">
                            {isSignedIn ? (
                                <SignOutButton>
                                    <Button className={`w-full ${inactiveStyle} transition-colors duration-300`}>
                                        Sign Out
                                    </Button>
                                </SignOutButton>
                            ) : (
                                <SheetClose asChild>
                                    <Button variant="ghost" className="w-full text-gray-400 hover:text-white hover:bg-white/10">
                                        Close
                                    </Button>
                                </SheetClose>
                            )}
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
            </div>
            <div className="hidden md:flex space-x-4">
                <Link to="/docs">
                    <Button className={`${getLinkStyle('/docs')} transition-colors duration-300`}>
                        Docs
                    </Button>
                </Link>
                {isSignedIn && hasPlan && (
                    <Link to="/api-keys">
                        <Button className={`${getLinkStyle('/api-keys')} transition-colors duration-300`}>
                            API Keys
                        </Button>
                    </Link>
                )}
                {isSignedIn ? (
                    <SignOutButton>
                        <Button className={`${inactiveStyle} transition-all duration-300`}>Sign Out</Button>
                    </SignOutButton>
                ) : (
                    <>
                        <Button
                            className={`${getLinkStyle('')} transition-colors duration-300`}
                            onClick={handleSignIn}
                        >
                            Log In
                        </Button>
                        <Button
                            className="bg-white text-black hover:bg-white/90 transition-all duration-300"
                            onClick={handleSignUpOrSignIn}
                        >
                            Sign Up
                        </Button>
                    </>
                )}
            </div>
        </header>
    )
}