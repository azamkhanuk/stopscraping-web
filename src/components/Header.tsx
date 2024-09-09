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
                        className="w-[300px] sm:w-[400px] bg-[#050505] border-white/20 text-white flex flex-col [&>button]:text-white [&>button]:hover:opacity-100 [&>button]:focus:ring-white [&>button]:data-[state=open]:bg-transparent"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-950/30 via-black to-pink-950/30 opacity-90 pointer-events-none"></div>
                        <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none"></div>
                        <div className="relative z-10 flex-grow">
                            <SheetHeader>
                                <SheetTitle className="text-left text-white">
                                    stopscraping.me
                                </SheetTitle>
                                <SheetDescription className="sr-only">
                                    This menu provides navigation options and account actions.
                                </SheetDescription>
                            </SheetHeader>
                            <div className="mt-6 flex flex-col gap-4">
                                <SheetClose asChild>
                                    <Link to="/">
                                        <Button className={`w-full ${getLinkStyle('/')} transition-colors duration-300`}>
                                            Home
                                        </Button>
                                    </Link>
                                </SheetClose>
                                <SheetClose asChild>
                                    <Link to="/docs">
                                        <Button className={`w-full ${getLinkStyle('/docs')} transition-colors duration-300`}>
                                            Docs
                                        </Button>
                                    </Link>
                                </SheetClose>
                                {isSignedIn && hasPlan && (
                                    <SheetClose asChild>
                                        <Link to="/api-keys">
                                            <Button className={`w-full ${getLinkStyle('/api-keys')} transition-colors duration-300`}>
                                                API Keys
                                            </Button>
                                        </Link>
                                    </SheetClose>
                                )}
                                {!isSignedIn && (
                                    <>
                                        <SheetClose asChild>
                                            <Button
                                                className={`w-full ${getLinkStyle('')} transition-colors duration-300`}
                                                onClick={handleSignIn}
                                            >
                                                Log In
                                            </Button>
                                        </SheetClose>
                                        <SheetClose asChild>
                                            <Button
                                                className="w-full bg-white text-black hover:bg-white/90 transition-all duration-300"
                                                onClick={handleSignUpOrSignIn}
                                            >
                                                Sign Up
                                            </Button>
                                        </SheetClose>
                                    </>
                                )}
                            </div>
                        </div>
                        <SheetFooter className="mt-auto pb-4">
                            {isSignedIn ? (
                                <SignOutButton>
                                    <Button className={`w-full ${inactiveStyle} transition-colors duration-300`}>
                                        Sign Out
                                    </Button>
                                </SignOutButton>
                            ) : (
                                <SheetClose asChild>
                                    <Button variant="ghost" className="w-full text-white hover:text-white hover:bg-white/10">
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