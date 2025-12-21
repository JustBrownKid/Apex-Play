export default function MaintenancePage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-950 px-4">
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[10%] -left-[10%] h-[40%] w-[40%] rounded-full bg-blue-900/20 blur-[120px]" />
                <div className="absolute -bottom-[10%] -right-[10%] h-[40%] w-[40%] rounded-full bg-indigo-900/20 blur-[120px]" />
            </div>

            <div className="relative w-full max-w-xl rounded-2xl border border-gray-800 bg-gray-900 p-8 text-center shadow-2xl sm:p-12">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-800 text-5xl animate-pulse shadow-inner">
                    🛠️
                </div>

                <h1 className="mb-2 text-2xl font-bold text-white sm:text-3xl">
                    We’ll Be Back Soon
                </h1>

                <p className="mb-4 text-sm font-semibold text-blue-400 tracking-wide uppercase">
                    System Maintenance
                </p>

                <p className="mb-8 text-gray-400 leading-relaxed">
                    We are currently performing scheduled maintenance.
                    <br className="hidden sm:block" />
                    We’re working hard to bring you a better experience.
                    <br />
                    Please check back shortly.
                </p>

                <div className="mx-auto mb-10 inline-flex items-center gap-2 rounded-full border border-gray-700 bg-gray-800/50 px-6 py-2 text-sm font-medium text-blue-300">
                    <span className="text-blue-400"></span> Estimated return – 10:00 PM
                </div>

                <p className="mt-8 text-xs text-gray-500">
                    Thank you for your patience.
                </p>
            </div>
        </div>
    );
}