import { getCurrentYear } from "@/utils/dateUtils"

export const Footer = () => {
    return (
        <footer className="container mx-auto px-4 py-6 text-center text-gray-500 text-sm">
            <p>&copy; {getCurrentYear()} stopscraping.me | Empowering digital autonomy</p>
        </footer>
    )
}