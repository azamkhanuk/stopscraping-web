import { getCurrentYear } from "@/utils/dateUtils"

export const Footer = () => {
    return (
        <footer className="container mx-auto px-4 py-6 text-center text-gray-500 text-sm">
            <p>&copy; {getCurrentYear()} | stopscraping.me |
                <a href="mailto:contact@stopscraping.me" className="text-blue-500 hover:underline"> contact@stopscraping.me</a>
            </p>
        </footer>
    )
}