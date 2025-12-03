import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="bg-gray-800 p-4 text-white">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-xl font-bold">
                    AdhyayanX
                </Link>
                <div className="space-x-4">
                    <Link href="/" className="hover:text-gray-300">
                        Home
                    </Link>
                    <Link href="/about" className="hover:text-gray-300">
                        About
                    </Link>
                    <Link href="/contact" className="hover:text-gray-300">
                        Contact
                    </Link>
                </div>
            </div>
        </nav>
    );
}
