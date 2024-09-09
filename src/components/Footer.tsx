import { Link } from 'react-router-dom';
import { getCurrentYear } from "@/utils/dateUtils"

export const Footer = () => {
    return (
        <footer className="container mx-auto px-4 py-6 text-center text-gray-500 text-sm">
            <p className="mb-2">&copy; {getCurrentYear()} | stopscraping.me</p>
            <nav className="space-x-4">
                <Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">
                    Privacy Policy
                </Link>
                <Link to="/terms-and-conditions" className="text-gray-400 hover:text-white transition-colors">
                    Terms and Conditions
                </Link>
                <a href="mailto:contact@stopscraping.me" className="text-gray-400 hover:text-white transition-colors">
                    contact@stopscraping.me
                </a>
            </nav>
        </footer>
    )
}