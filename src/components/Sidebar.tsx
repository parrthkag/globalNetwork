import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { supabase } from "../supabaseClient";

const Sidebar: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false); // ✅ boolean type
    const navigate = useNavigate();

    const handleLogout = async (): Promise<void> => { // ✅ typed async function
        await supabase.auth.signOut();
        navigate("/login");
    };

    return (
        <>
            {/* Hamburger for mobile */}
            <button
                className="md:hidden fixed top-4 left-4 z-50 bg-yellow-500 p-2 rounded"
                onClick={() => setOpen(!open)}
            >
                ☰
            </button>

            <div
                className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white p-4 transform transition-transform duration-300 z-40 
          ${open ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0`}
            >
                <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
                <ul className="space-y-4">
                    <li>
                        <Link to="/dashboard" className="hover:text-yellow-400">
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link to="/upload" className="hover:text-yellow-400">
                            Upload Content
                        </Link>
                    </li>
                    <li>
                        <Link to="/genres" className="hover:text-yellow-400">
                            Manage Genres
                        </Link>
                    </li>
                    <li>
                        <Link to="/watch-age" className="hover:text-yellow-400">
                            Manage Watch Age
                        </Link>
                    </li>
                    <li>
                        <button onClick={handleLogout} className="hover:text-red-400">
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default Sidebar;