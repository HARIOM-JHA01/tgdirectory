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
import TicketQuota from "./pages/TicketQuota";

const BOT_TOKEN = "7207272180:AAF96S7do7n6SOkiuvN6_7b2UubXkRV-Hv8";
const CHANNEL_NAME= "@testingrandon";

 function App() {
  // Initialize WebApp when the app first loads
  useEffect(() => {
    WebApp.ready();
  
    // const user = WebApp.initDataUnsafe?.user || null;
    // if (!user) {
    //   console.error("User data is not available. Please ensure the app is running in a Telegram environment.");
    //   return;
    // }
  
    // const telegramId = user?.id || null;
    // if (!telegramId) {
    //   console.error("Telegram ID is not available. Please ensure the app is running in a Telegram environment.");
    //   return;
    // }
    const telegramId = "123456789";
    const checkMembership = async () => {
      try {
        const response = await fetch(
          `https://api.telegram.org/bot${BOT_TOKEN}/getChatMember?chat_id=${CHANNEL_NAME}&user_id=${telegramId}`
        );
        const data = await response.json();
        console.log(data);
  
        if (data?.ok && ["member", "administrator", "creator"].includes(data.result.status)) {
          console.log("User has joined the channel");
          // allow access to mini app
        } else {
          WebApp.showAlert("Please join the Telegram channel first to use this app.");
          WebApp.close();
        }
      } catch (err) {
        console.error("Error checking chat membership", err);
        WebApp.showAlert("Something went wrong. Please try again later.");
        WebApp.close();
      }
    };

    const loginToMiniApp = async () => {
      const response = await fetch(`/api/en/tg-login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login_ju_telegram: telegramId }),
      });
      if (!response.ok) {
        console.error("Failed to login to mini app");
        WebApp.showAlert("Login failed. Please try again.");
        return;
      }
      const data = await response.json();
      console.log(data);
    };
    checkMembership();
    loginToMiniApp();
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
        <Route path="/ticket-quota" element={<TicketQuota />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
