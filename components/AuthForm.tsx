"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { COLORS } from "@/lib/constants/colors";

export function AuthForm() {
    const [isSignUp, setIsSignUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        rememberMe: false,
        acceptTerms: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
    };

    return (
        <div className="relative w-full h-screen overflow-hidden bg-white dark:bg-gray-950">
            {/* Split Container */}
            <div className="relative w-full h-full flex">

                {/* Left Half - Login Form */}
                <div className="w-1/2 h-full flex items-center justify-center p-12 relative z-10">
                    <div className={`w-full max-w-md transition-opacity duration-300 ${isSignUp ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                        <div className="mb-8">
                            <h2 className="text-4xl font-bold mb-3 text-gray-900 dark:text-white">
                                Log in to Your Account
                            </h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Log in to your account so you can continue building<br />and editing your onboarding flows.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all"
                                />
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.rememberMe}
                                        onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                                        className="w-4 h-4 rounded border-gray-300 mr-2"
                                        style={{ accentColor: COLORS.palette.brownTaupe }}
                                    />
                                    <span className="text-gray-700 dark:text-gray-300">Remember Me</span>
                                </label>
                                <button type="button" className="text-sm hover:underline" style={{ color: COLORS.palette.brownTaupe }}>
                                    Forgot password
                                </button>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3.5 rounded-lg font-semibold text-white text-sm uppercase tracking-wide transition-all duration-300 hover:opacity-90 mt-2"
                                style={{
                                    background: `linear-gradient(135deg, ${COLORS.palette.brownTaupe} 0%, ${COLORS.palette.darkerBrown} 100%)`
                                }}
                            >
                                Log In
                            </button>

                            <div className="text-center mt-6">
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Or log in using</p>
                                <div className="flex gap-4 justify-center">
                                    <button type="button" className="w-12 h-12 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                        </svg>
                                    </button>
                                    <button type="button" className="w-12 h-12 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                        </svg>
                                    </button>
                                    <button type="button" className="w-12 h-12 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Right Half - Sign Up Form */}
                <div className="w-1/2 h-full flex items-center justify-center p-12 relative z-10">
                    <div className={`w-full max-w-md transition-opacity duration-300 ${isSignUp ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                        <div className="mb-8">
                            <h2 className="text-4xl font-bold mb-3 text-gray-900 dark:text-white">
                                Sign Up for an Account
                            </h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Let's get you all set up so you can start creating your<br />first onboarding experience.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Your first name"
                                        value={formData.firstName}
                                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Your last name"
                                        value={formData.lastName}
                                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter a strong password"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        className="w-full px-4 py-3 pr-12 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            <label className="flex items-start cursor-pointer text-sm">
                                <input
                                    type="checkbox"
                                    checked={formData.acceptTerms}
                                    onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                                    className="w-4 h-4 rounded border-gray-300 mt-0.5 mr-2"
                                    style={{ accentColor: COLORS.palette.brownTaupe }}
                                />
                                <span className="text-gray-700 dark:text-gray-300">
                                    I accept BoardMe's{" "}
                                    <button type="button" className="hover:underline" style={{ color: COLORS.palette.brownTaupe }}>
                                        Terms & Conditions
                                    </button>
                                </span>
                            </label>

                            <button
                                type="submit"
                                className="w-full py-3.5 rounded-lg font-semibold text-white text-sm uppercase tracking-wide transition-all duration-300 hover:opacity-90 mt-2"
                                style={{
                                    background: `linear-gradient(135deg, ${COLORS.palette.brownTaupe} 0%, ${COLORS.palette.darkerBrown} 100%)`
                                }}
                            >
                                Sign Up
                            </button>

                            <div className="text-center mt-6">
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Or sign up using</p>
                                <div className="flex gap-4 justify-center">
                                    <button type="button" className="w-12 h-12 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                        </svg>
                                    </button>
                                    <button type="button" className="w-12 h-12 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                        </svg>
                                    </button>
                                    <button type="button" className="w-12 h-12 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Sliding Curved Overlay Panel with Framer Motion */}
                <motion.div
                    className="absolute top-0 h-full w-1/2 flex items-center justify-center p-16 text-white overflow-hidden"
                    initial={{ left: 0 }}
                    animate={{ left: isSignUp ? 0 : '50%' }}
                    transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
                    style={{
                        background: `linear-gradient(135deg, ${COLORS.palette.brownTaupe} 0%, ${COLORS.palette.darkerBrown} 100%)`,
                        zIndex: 20
                    }}
                >
                    {/* Curved Edge SVG */}
                    <svg
                        className="absolute top-0 h-full w-24"
                        style={{
                            [isSignUp ? 'right' : 'left']: '-1px',
                            transform: isSignUp ? 'scaleX(-1)' : 'scaleX(1)'
                        }}
                        viewBox="0 0 100 800"
                        preserveAspectRatio="none"
                        fill="none"
                    >
                        <path
                            d="M0 0 Q50 400 0 800 L100 800 L100 0 Z"
                            fill={`url(#gradient)`}
                        />
                        <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor={COLORS.palette.brownTaupe} />
                                <stop offset="100%" stopColor={COLORS.palette.darkerBrown} />
                            </linearGradient>
                        </defs>
                    </svg>

                    {/* Content with Framer Motion */}
                    <motion.div
                        key={isSignUp ? 'signup' : 'login'}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="relative z-10 text-center max-w-md"
                    >
                        {!isSignUp ? (
                            <>
                                <h1 className="text-5xl font-bold mb-6 tracking-tight">
                                    Don't Have an Account Yet?
                                </h1>
                                <p className="text-lg text-white/90 mb-10 leading-relaxed">
                                    Let's get you all set up so you can start creating your first onboarding experience.
                                </p>

                                <button
                                    onClick={() => setIsSignUp(true)}
                                    className="px-12 py-3.5 border-2 border-white text-white rounded-lg font-semibold text-sm uppercase tracking-wider hover:bg-white transition-all duration-300"
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = 'white';
                                        e.currentTarget.style.color = COLORS.palette.brownTaupe;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                        e.currentTarget.style.color = 'white';
                                    }}
                                >
                                    Sign Up
                                </button>
                            </>
                        ) : (
                            <>
                                <h1 className="text-5xl font-bold mb-6 tracking-tight">
                                    Already Signed up?
                                </h1>
                                <p className="text-lg text-white/90 mb-10 leading-relaxed">
                                    Log in to your account so you can continue building and editing your onboarding flows.
                                </p>

                                <button
                                    onClick={() => setIsSignUp(false)}
                                    className="px-12 py-3.5 border-2 border-white text-white rounded-lg font-semibold text-sm uppercase tracking-wider hover:bg-white transition-all duration-300"
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = 'white';
                                        e.currentTarget.style.color = COLORS.palette.brownTaupe;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                        e.currentTarget.style.color = 'white';
                                    }}
                                >
                                    Log In
                                </button>
                            </>
                        )}
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
