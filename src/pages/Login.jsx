import React from "react";
import { useNavigate } from "react-router-dom";


export default function Login() {

    const Navigate = useNavigate();
    
    return (
        <div className="w-full px-6 min-h-[85vh] mt-40 items-center justify-center">
            <h1 className="text-4xl md:text-6xl text-white text-center">Login Page Coming Soon!</h1>
            <h1 className="mt-10 text-slate-300 text-center">We're working hard to bring you a seamless login experience. Stay tuned!</h1>
            {/* back  button */}
            <button className="mt-10 mx-auto block px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-medium transition-colors"
                onClick={() => Navigate("/")}
            >Back to Home</button>
        </div>   
    )
}