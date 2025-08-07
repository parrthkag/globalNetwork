import { BrowserRouter, Routes, Route } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Layout from "./components/Layout";
import Dashboard from "./Pages/Dashboard";
import ManageGenres from "./Pages/ManageGenres";
import UploadContent from "./Pages/UploadContent";
import ManageWatchAge from "./Pages/ManageWatchAge";

// create a client instance once
const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/upload" element={<Layout><UploadContent /></Layout>} />
          <Route path="/genres" element={<Layout><ManageGenres /></Layout>} />
          <Route path="/watch-age" element={<Layout><ManageWatchAge /></Layout>} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;