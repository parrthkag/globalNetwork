import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router";

const Signup = () => {
    const [email, setEmail] = useState<string>("");       // typed as string
    const [password, setPassword] = useState<string>(""); // typed as string
    const [error, setError] = useState<string>("");       // typed as string
    const [loading, setLoading] = useState<boolean>(false); // typed as boolean
    const navigate = useNavigate();

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email || !password) {
            setError("Please enter email and password");
            return;
        }
        setLoading(true);
        setError("");

        const { error } = await supabase.auth.signUp({ email, password });

        setLoading(false);
        if (error) {
            setError(error.message);
        } else {
            navigate("/login");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
            <form
                onSubmit={handleSignup}
                className="bg-gray-800 p-6 rounded w-96 space-y-4"
            >
                <h2 className="text-2xl font-bold">Sign Up</h2>
                {error && <div className="bg-red-500 p-2 rounded">{error}</div>}

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-2 bg-gray-700 rounded"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setEmail(e.target.value)
                    }
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-2 bg-gray-700 rounded"
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setPassword(e.target.value)
                    }
                />

                <button
                    type="submit"
                    className="w-full bg-yellow-500 p-2 rounded"
                    disabled={loading}
                >
                    {loading ? "Signing up..." : "Sign Up"}
                </button>
            </form>
        </div>
    );
};

export default Signup;
