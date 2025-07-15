import { Link } from 'react-router-dom';
import { getCurrentYear } from '@/utils/dateUtils';

export const Footer = () => {
  return (
    <footer className='container px-4 py-6 mx-auto text-sm text-center text-gray-500'>
      <p className='mb-2'>&copy; {getCurrentYear()} | stopscraping.me</p>
      <nav className='space-x-4'>
        <Link to='/privacy-policy' className='text-gray-400 transition-colors hover:text-white'>
          Privacy Policy
        </Link>
        <Link
          to='/terms-and-conditions'
          className='text-gray-400 transition-colors hover:text-white'
        >
          Terms and Conditions
        </Link>
      </nav>
    </footer>
  );
};
