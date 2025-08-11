import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Check authentication status on component mount and when localStorage changes
  useEffect(() => {
    const checkAuthStatus = () => {
      const authToken = localStorage.getItem("authToken");
      const adminToken = localStorage.getItem("adminToken");
      const userData = localStorage.getItem("user");
      const adminData = localStorage.getItem("admin");
      
      if (authToken || adminToken) {
        setIsLoggedIn(true);
        setUser(userData ? JSON.parse(userData) : (adminData ? JSON.parse(adminData) : null));
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    };

    checkAuthStatus();
    
    // Listen for storage changes (when user logs in/out from other components)
    window.addEventListener('storage', checkAuthStatus);
    
    return () => {
      window.removeEventListener('storage', checkAuthStatus);
    };
  }, []);

  const handleLogout = () => {
    // Clear all authentication data
    localStorage.removeItem("authToken");
    localStorage.removeItem("adminToken");
    localStorage.removeItem("user");
    localStorage.removeItem("admin");
    
    setIsLoggedIn(false);
    setUser(null);
    setIsMenuOpen(false);
    
    // Redirect to home page
    navigate("/");
    
    // Trigger storage event for other components
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center mr-3">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-teal-700">TAJPE</h1>
              <p className="text-sm text-gray-600">Hospital Management System</p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-teal-600 font-medium transition">Home</Link>
            <Link to="/about" className="text-gray-700 hover:text-teal-600 font-medium transition">About</Link>
            {/* <Link to="/services" className="text-gray-700 hover:text-teal-600 font-medium transition">Services</Link> */}
            <Link to="/pricing" className="text-gray-700 hover:text-teal-600 font-medium transition">Pricing</Link>
            <Link to="/contact" className="text-gray-700 hover:text-teal-600 font-medium transition">Contact</Link>
            
            {/* Conditional rendering for auth buttons */}
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  Welcome, {user?.name || user?.username || 'User'}
                </span>
                                 <button 
                   onClick={handleLogout}
                   className="bg-gray-600 text-white px-4 py-2 rounded-md font-medium hover:bg-gray-700 transition"
                 >
                   Logout
                 </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-teal-600 font-medium transition">Login</Link>
                <Link 
                  to="/signup" 
                  className="bg-teal-600 text-white px-4 py-2 rounded-md font-medium hover:bg-teal-700 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
            

          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <div className="flex flex-col space-y-3 pt-4">
              <Link to="/" className="text-gray-700 hover:text-teal-600 font-medium" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link to="/about" className="text-gray-700 hover:text-teal-600 font-medium" onClick={() => setIsMenuOpen(false)}>About</Link>
              <Link to="/services" className="text-gray-700 hover:text-teal-600 font-medium" onClick={() => setIsMenuOpen(false)}>Services</Link>
              <Link to="/pricing" className="text-gray-700 hover:text-teal-600 font-medium" onClick={() => setIsMenuOpen(false)}>Pricing</Link>
              <Link to="/contact" className="text-gray-700 hover:text-teal-600 font-medium" onClick={() => setIsMenuOpen(false)}>Contact</Link>
              
              {/* Conditional rendering for auth buttons in mobile */}
              {isLoggedIn ? (
                <div className="space-y-2">
                  <div className="text-sm text-gray-600 text-center">
                    Welcome, {user?.name || user?.username || 'User'}
                  </div>
                                     <button 
                     onClick={handleLogout}
                     className="w-full bg-gray-600 text-white px-4 py-2 rounded-md font-medium hover:bg-gray-700 transition"
                   >
                     Logout
                   </button>
                </div>
              ) : (
                <>
                  <Link to="/login" className="text-gray-700 hover:text-teal-600 font-medium" onClick={() => setIsMenuOpen(false)}>Login</Link>
                  <Link 
                    to="/signup" 
                    className="bg-teal-600 text-white px-4 py-2 rounded-md font-medium hover:bg-teal-700 transition text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
              

            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;