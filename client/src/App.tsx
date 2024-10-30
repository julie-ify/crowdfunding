import { Routes, Route } from "react-router-dom";
import { Home, Profile, CreateCampaign, CampaignDetails } from "./pages";
import { Sidebar, Navbar } from "./components";

export default function App() {
  return (
    <main className="relative sm:p-8 p-4 bg-[#13131a] min-h-screen flex text-white">
      <div className="hidden sm:flex mr-10 relative">
        <Sidebar />
      </div>
      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-campaign" element={<CreateCampaign />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/campaign-details/:id" element={<CampaignDetails />} />
        </Routes>
      </div>
    </main>
  );
}
