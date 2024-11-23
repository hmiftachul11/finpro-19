import { Link, useLocation } from 'react-router-dom';
// import './navbar.css';

function AppNavbar() {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path ? 'text-blue-500' : 'text-gray-700';
    };

    return (
        <nav className="fixed top-0 w-full bg-white shadow-md z-50">
            <div className="container mx-auto flex justify-between items-center py-3 px-6">
                {/* Logo */}
                <Link to="/" className="flex items-center">
                    <img
                        src="/logo.webp"
                        alt="logo"
                        className="h-10 w-44"
                    />
                </Link>

                {/* Toggle button for mobile */}
                <div className="lg:hidden">
                    <button className="text-gray-700 focus:outline-none">
                        <i className="bi bi-list text-2xl"></i>
                    </button>
                </div>

                {/* Navigation Links */}
                <div className="hidden lg:flex space-x-6">
                    <Link
                        to="/"
                        className={`hover:text-blue-500 transition-colors ${isActive('/')}`}
                    >
                        Home
                    </Link>
                    <Link
                        to="/activity"
                        className={`hover:text-blue-500 transition-colors ${isActive('/activity')}`}
                    >
                        Activity
                    </Link>
                    <Link
                        to="/offer"
                        className={`hover:text-blue-500 transition-colors ${isActive('/offer')}`}
                    >
                        Our Offer
                    </Link>
                    <Link
                        to="/contactus"
                        className={`hover:text-blue-500 transition-colors ${isActive('/contactus')}`}
                    >
                        Contact Us
                    </Link>
                </div>

                {/* Login Button */}
                <div className="hidden lg:flex">
                    <Link to="/login">
                        <button className="button1 rounded-md bg-blue-500 text-white px-5 py-2 border-0 hover:bg-blue-600 transition-all">
                            <i className="bi bi-person"></i> Login
                        </button>
                    </Link>
                </div>
            </div>

            {/* Mobile Menu (Hidden by default) */}
            <div className="lg:hidden mt-2 px-6">
                <div className="flex flex-col space-y-2">
                    <Link
                        to="/"
                        className={`block hover:text-blue-500 transition-colors ${isActive('/')}`}
                    >
                        Home
                    </Link>
                    <Link
                        to="/activity"
                        className={`block hover:text-blue-500 transition-colors ${isActive('/activity')}`}
                    >
                        Activity
                    </Link>
                    <Link
                        to="/offer"
                        className={`block hover:text-blue-500 transition-colors ${isActive('/offer')}`}
                    >
                        Our Offer
                    </Link>
                    <Link
                        to="/contactus"
                        className={`block hover:text-blue-500 transition-colors ${isActive('/contactus')}`}
                    >
                        Contact Us
                    </Link>
                    <Link to="/login">
                        <button className="mt-4 button1 w-full rounded-md bg-blue-500 text-white px-5 py-2 border-0 hover:bg-blue-600 transition-all">
                            <i className="bi bi-person"></i> Login
                        </button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default AppNavbar;
