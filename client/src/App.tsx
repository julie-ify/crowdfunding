import { Routes, Route } from "react-router-dom";
import { Home, Profile, CreateCampaign, CampaignDetails } from "./pages";
import { Sidebar, Navbar } from "./components";
// import { hello } from "./context";

export default function App() {
	// hello()
  return (
    <main className="relative sm:p-8 p-4 bg-[#13131a] min-h-screen flex flex-row text-white">
      <div className="hidden sm:flex sm:mr-10 relative">
        <Sidebar />
      </div>
      <div className="flex-1 max-w-[1280px] sm:max-w-full mx-auto sm:pr-5">
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
