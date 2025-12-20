import React, { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Logo from '../assets/Apex-play-logo-b.png';

const AuthPage = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleRegister = async () => {
        const apiUrl = import.meta.env.VITE_API_URL;
        try {
            const response = await fetch(`${apiUrl}/user/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                alert("Registration Successful!");
                navigate(-1);
            } else {
                alert(data.message || "Registration Failed");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleLogin = async () => {
        const apiUrl = import.meta.env.VITE_API_URL;
        try {
            const response = await fetch(`${apiUrl}/user/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                })
            });
            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                alert("Login Successful!");
                navigate(-1);
            } else {
                alert(data.message || "Invalid Credentials");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLogin) {
            handleLogin();
        } else {
            handleRegister();
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-gray-950 to-cyan-900 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] p-4 sm:p-10 lg:p-12 space-y-4 border border-white/10 transition-all">

                {/* Header Section */}
                <div className="flex flex-col items-center space-y-4">
                    <div className="w-16 h-16 bg-black shadow-lg rounded-2xl flex items-center justify-center transform transition-transform hover:scale-105 duration-300">
                        <img src={Logo} alt="Apex" className="w-full h-full object-contain rounded-xl p-2" />
                    </div>
                    <div className="text-center">
                        <h1 className="text-2xl sm:text-3xl font-black text-black tracking-tight uppercase">
                            {isLogin ? 'Welcome Back' : 'Create Account'}
                        </h1>
                        <p className="text-gray-400 text-sm mt-2 font-medium tracking-wide">
                            {isLogin ? 'Enter your details to sign in' : 'Join our community today'}
                        </p>
                    </div>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div className="relative group">
                            <User className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-black transition-colors" size={20} />
                            <input
                                name='name'
                                type="text"
                                placeholder="Full Name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all text-base"
                            />
                        </div>
                    )}

                    <div className="relative group">
                        <Mail className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-black transition-colors" size={20} />
                        <input
                            name='email'
                            type="email"
                            placeholder="Email address"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all text-base"
                        />
                    </div>

                    <div className="relative group">
                        <Lock className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-black transition-colors" size={20} />
                        <input
                            name='password'
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full pl-11 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all text-base"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3.5 text-gray-400 hover:text-black transition-colors focus:outline-none"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    <button type="submit" className="w-full bg-black hover:bg-gray-800 text-white font-black py-4 rounded-xl shadow-lg transition-all active:scale-[0.98] text-lg mt-2 uppercase tracking-widest">
                        {isLogin ? 'Sign In' : 'Register'}
                    </button>
                </form>

                <div className="pt-4 border-t border-gray-50 text-center">
                    <p className="text-gray-400 text-sm font-medium">
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <button
                            type="button"
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-black font-black hover:underline transition-all underline-offset-4"
                        >
                            {isLogin ? 'SIGN UP' : 'LOG IN'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;