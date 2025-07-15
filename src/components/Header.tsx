import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export function Header() {
  // Mock signed-in user state for reference/showcase
  const isSignedIn = true;
  const hasPlan = true; // Mock that user has a pricing plan

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/');
  };

  const handleSignUpOrSignIn = () => {
    // Mock function - for showcase, just navigate to select-plan
    navigate('/select-plan');
  };

  const handleSignIn = () => {
    // Mock function - for showcase, just navigate to api-keys
    navigate('/api-keys');
  };

  const handleSignOut = () => {
    // Mock function - for showcase, just navigate to home
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  const getLinkStyle = (path: string) => {
    return isActive(path)
      ? 'bg-purple-600 text-white hover:bg-purple-700'
      : 'bg-transparent text-white border border-white hover:bg-white hover:text-black';
  };

  const inactiveStyle =
    'bg-transparent text-white border border-white hover:bg-white hover:text-black';

  return (
    <header className='relative z-10 py-6'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center'>
        <div
          className='text-2xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 text-transparent bg-clip-text cursor-pointer'
          onClick={handleLogoClick}
        >
          stopscraping.me
        </div>

        {/* Mobile menu */}
        <div className='md:hidden'>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant='ghost'
                size='icon'
                className='text-white hover:text-white hover:bg-white/10'
              >
                <Menu className='w-6 h-6' />
              </Button>
            </SheetTrigger>
            <SheetContent className='bg-gray-900 border-gray-700 text-white'>
              <SheetHeader>
                <SheetTitle className='text-white'>Menu</SheetTitle>
                <SheetDescription className='text-gray-300'>
                  Navigate through the app
                </SheetDescription>
              </SheetHeader>
              <div className='flex flex-col space-y-4 mt-8'>
                <SheetClose asChild>
                  <Link to='/docs'>
                    <Button
                      className={`w-full ${getLinkStyle('/docs')} transition-colors duration-300`}
                    >
                      Docs
                    </Button>
                  </Link>
                </SheetClose>
                {isSignedIn && hasPlan && (
                  <SheetClose asChild>
                    <Link to='/api-keys'>
                      <Button
                        className={`w-full ${getLinkStyle('/api-keys')} transition-colors duration-300`}
                      >
                        API Keys
                      </Button>
                    </Link>
                  </SheetClose>
                )}
                {!isSignedIn && (
                  <>
                    <SheetClose asChild>
                      <Button
                        className={`w-full ${inactiveStyle} transition-colors duration-300`}
                        onClick={handleSignIn}
                      >
                        Sign In
                      </Button>
                    </SheetClose>
                    <SheetClose asChild>
                      <Button
                        className={`w-full ${inactiveStyle} transition-colors duration-300`}
                        onClick={handleSignUpOrSignIn}
                      >
                        Get Started
                      </Button>
                    </SheetClose>
                  </>
                )}
              </div>
              <SheetFooter className='mt-8'>
                {isSignedIn ? (
                  <Button
                    className={`w-full ${inactiveStyle} transition-colors duration-300`}
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </Button>
                ) : (
                  <SheetClose asChild>
                    <Button
                      variant='ghost'
                      className='w-full text-white hover:text-white hover:bg-white/10'
                    >
                      Close
                    </Button>
                  </SheetClose>
                )}
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop menu */}
        <div className='hidden md:flex space-x-4'>
          <Link to='/docs'>
            <Button className={`${getLinkStyle('/docs')} transition-colors duration-300`}>
              Docs
            </Button>
          </Link>
          {isSignedIn && hasPlan && (
            <Link to='/api-keys'>
              <Button className={`${getLinkStyle('/api-keys')} transition-colors duration-300`}>
                API Keys
              </Button>
            </Link>
          )}
          {isSignedIn ? (
            <Button
              className={`${inactiveStyle} transition-all duration-300`}
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          ) : (
            <>
              <Button
                className={`${getLinkStyle('')} transition-colors duration-300`}
                onClick={handleSignIn}
              >
                Sign In
              </Button>
              <Button
                className={`${getLinkStyle('')} transition-colors duration-300`}
                onClick={handleSignUpOrSignIn}
              >
                Get Started
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
