export function LoadingSpinner() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black">
            <div className="w-16 h-16 md:w-24 md:h-24 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
    );
}