import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const BackButton = ({ className = "" }) => {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate(-1)}
            className={`fixed top-6 left-6 md:top-8 md:left-8 bg-white/10 p-2 rounded-xl backdrop-blur-md border border-white/10 transition-all z-50 group shadow-lg shadow-black/40 ${className}`}
            aria-label="Go back"
        >
            <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
        </button>
    );
};

export default BackButton;