import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import WebApp from "@twa-dev/sdk";
import HomePage from "./pages/HomePage";
import CountryFeatureListing from "./pages/CountryFeatureListing";
import GlobalFeatureListing from "./pages/GlobalFeatureListing";
import SearchLink from "./pages/SearchLink";
import SubmitLink from "./pages/SubmitLink";
import MySubmittedLinks from "./pages/MySubmittedLinks";
import MyFeatureListing from "./pages/MyFeatureListing";
import BuyTickets from "./pages/BuyTickets";
import TicketHistory from "./pages/TicketHistory";
import FeaturedChannels from "./pages/FeaturedChannels";
import AnnouncementPage from "./pages/AnnouncementPage";

function App() {
  // Initialize WebApp when the app first loads
  useEffect(() => {
    WebApp.ready();
  }, []);

  return (
    <BrowserRouter basename="/tgdirectory">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/submit-link" element={<SubmitLink />} />
        <Route path="/search-link" element={<SearchLink />} />
        <Route path="/country-feature-listing" element={<CountryFeatureListing />} />
        <Route path="/global-feature-listing" element={<GlobalFeatureListing />} />
        <Route path="/my-submitted-links" element={<MySubmittedLinks />} />
        <Route path="/my-feature-listing" element={<MyFeatureListing />} />
        <Route path="/buy-tickets" element={<BuyTickets />} />
        <Route path="/ticket-history" element={<TicketHistory />} />
        <Route path="/featured-channels" element={<FeaturedChannels />} />
        <Route path="/announcement" element={<AnnouncementPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
