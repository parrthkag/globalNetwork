import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router";
import Sidebar from "./Sidebar";
import type { Session } from "@supabase/supabase-js";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [_session, setSession] = useState<Session | null>(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        navigate("/login");
      } else {
        setSession(data.session);
      }
      setLoading(false);
    };
    checkSession();
  }, [navigate]);

  if (loading) return <div className="text-white p-6">Loading...</div>;

  return (
    <div className="flex bg-gray-900 text-white min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6 ml-0 md:ml-64">{children}</div>
    </div>
  );
};

export default Layout;
