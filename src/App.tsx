import WebApp from "@twa-dev/sdk";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const BOT_TOKEN = "7207272180:AAE8AY94WPGRNY_m4s8lw6qeDRZGZCNmwwE";
const CHANNEL_NAME = "@TGDirectories";

function App() {
    const [showWelcome, setShowWelcome] = useState(false);
    const [showUsernameExistPopup, setShowUsernameExistPopup] = useState(false);
    const [deletingUser, setDeletingUser] = useState(false);
    // Removed unused telegramId state

    useEffect(() => {
        WebApp.ready();

        const user = WebApp.initDataUnsafe?.user;
        const telegramId = user?.id; // Use this variable directly where needed
        const username = user?.username || "";
        // Check for username first
        if (!username) {
            WebApp.showAlert("You do not have a username for your telegram account. Please set a username before using this app.", () => {
                WebApp.close();
            });
            return;
        }
        // const telegramId = "1882287904";
        // const username = "hariomjha01";
        const checkMembership = async () => {
            try {
                const response = await fetch(
                    `https://api.telegram.org/bot${BOT_TOKEN}/getChatMember?chat_id=${CHANNEL_NAME}&user_id=${telegramId}`
                );
                const data = await response.json();
                console.log(data);

                if (
                    data?.ok &&
                    ["member", "administrator", "creator"].includes(
                        data.result.status
                    )
                ) {
                    console.log("User has joined the channel");
                    // allow access to mini app
                    await loginToMiniApp();
                } else {
                    const params = {
                        title: "Join our Channel",
                        message:
                            "To use this app, you need to join our official Telegram channel for access.\n\nClick the button below to join, then return to the app.",
                        buttons: [
                            {
                                id: "close",
                                text: "Close App",
                                type: "destructive" as const,
                            },
                            {
                                id: "join",
                                text: "Join Channel",
                                type: "default" as const,
                            },
                        ],
                    };
                    WebApp.showPopup(params, (buttonId) => {
                        if (buttonId === "join") {
                            // Show a custom modal with a clickable hyperlink (styled as a real popup)
                            const modal = document.createElement("div");
                            modal.style.position = "fixed";
                            modal.style.top = "0";
                            modal.style.left = "0";
                            modal.style.width = "100vw";
                            modal.style.height = "100vh";
                            modal.style.background = "rgba(0,0,0,0.35)";
                            modal.style.display = "flex";
                            modal.style.alignItems = "center";
                            modal.style.justifyContent = "center";
                            modal.style.zIndex = "9999";
                            modal.innerHTML = `
                <div style="background: #fff; padding: 2.5rem 1.5rem 2rem 1.5rem; border-radius: 1.25rem; max-width: 95vw; min-width: 320px; box-shadow: 0 8px 32px rgba(0,0,0,0.18), 0 1.5px 6px rgba(0,0,0,0.10); text-align: center; position: relative; animation: popup-fade-in 0.3s;">
                  <button id="close-modal-btn" style="position: absolute; top: 1rem; right: 1rem; background: transparent; border: none; font-size: 1.5rem; color: #888; cursor: pointer;">&times;</button>
                  <img src='src/assets/tgd-logo.png' alt='TGD Logo' style='display: block; margin: 0 auto 1rem auto; width: 56px; height: 56px; border-radius: 16px; box-shadow: 0 2px 8px rgba(0,136,204,0.10);' />
                  <h2 style="font-size: 1.35rem; font-weight: bold; margin-bottom: 0.75rem; color: #0088cc; letter-spacing: 0.01em;">Join Our Telegram Channel</h2>
                  <p style="margin-bottom: 1.5rem; color: #444; font-size: 1.05rem;">Click the link below to join our channel:</p>
                  <a href="https://t.me/TGDirectories" target="_blank" rel="noopener noreferrer" style="color: #0088cc; font-size: 1.13rem; word-break: break-all; text-decoration: underline; font-weight: 500;">https://t.me/TGDirectories</a>
                  <div style="margin-top: 2.2rem;">
                    <button id="join-channel-btn" style="background: linear-gradient(90deg,#0088cc 60%,#32c5ff 100%); color: white; border: none; border-radius: 0.6rem; padding: 0.85rem 2.2rem; font-size: 1.08rem; font-weight: 600; box-shadow: 0 2px 8px rgba(0,136,204,0.10); cursor: pointer; margin-bottom: 0.5rem;">Join Channel Now !!!</button>
                  </div>
                </div>
                <style>@keyframes popup-fade-in { from { opacity: 0; transform: scale(0.95);} to { opacity: 1; transform: scale(1);} }</style>
              `;
                            document.body.appendChild(modal);
                            document
                                .getElementById("close-modal-btn")
                                ?.addEventListener("click", () => {
                                    document.body.removeChild(modal);
                                    WebApp.close();
                                });
                            document
                                .getElementById("join-channel-btn")
                                ?.addEventListener("click", () => {
                                    window.location.href =
                                        "https://t.me/TGDirectories";
                                    setTimeout(() => {
                                        WebApp.close();
                                    }, 300);
                                });
                        }
                        if (buttonId === "close") {
                            WebApp.close();
                        }
                    });
                }
            } catch (err) {
                console.error("Error checking chat membership", err);
                WebApp.showAlert(
                    "To use this app, you have to Join to our channel: https://t.me/tgdirectories\nJoin us and try again later"
                );
                WebApp.close();
            }
        };

        const loginToMiniApp = async () => {
            let country_name = "";
            try {
                const ipRes = await fetch("https://ipapi.co/json/");
                if (ipRes.ok) {
                    const ipData = await ipRes.json();
                    country_name = ipData.country_name || "";
                }
            } catch (e) {
                console.error("Failed to fetch country info", e);
            }

            const formData = new FormData();
            formData.append("login_ju_telegram", telegramId?.toString() || "");
            formData.append("login_ju_telegram_username", username || "");
            formData.append("country_id", country_name);

            const response = await fetch(`/api/en/tg-login`, {
                method: "POST",
                body: formData,
                credentials: "include",
            });
            if (!response.ok) {
                console.error("Failed to login to mini app");
                WebApp.showAlert("Login failed. Please try again.");
                return;
            }
            let data = null;
            try {
                const text = await response.text();
                data = text ? JSON.parse(text) : {};
            } catch (e) {
                console.error("Failed to parse login response as JSON", e);
                data = {};
            }
            console.log("Login response:", data);
            if (data.is_username_exist === 1) {
                setShowUsernameExistPopup(true);
                return;
            }
            if (data.is_first === 1) {
                setShowWelcome(true);
            }
        };
        checkMembership();
        loginToMiniApp();
    }, []);

    // Custom Welcome Card
    const WelcomeCard = () => (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center relative">
                <h2 className="text-2xl font-bold text-blue-600 mb-4">
                    Congratulations !!!!!
                </h2>
                <p className="text-gray-700 mb-4 whitespace-pre-line">
                    You have Successfully loggedin to TGDirectories APP.
                    {"\n"}As a Token of Rewards{" "}
                    <span className="font-bold">"Free Tickets"</span> has been
                    added to your account.{"\n"}
                    {"\n"}Use these tickets to make your Submitted listing as a
                    Features listing for Global / Country based.
                </p>
                <button
                    className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg text-lg transition"
                    onClick={() => {
                        setShowWelcome(false);
                        window.location.href = "/tgdirectory/submit-link";
                    }}
                >
                    Submit Link now
                </button>
            </div>
        </div>
    );

    // Custom Username Exist Popup
    const UsernameExistPopup = () => (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center relative">
                <h2 className="text-xl font-bold text-blue-600 mb-4">
                    You are already an existing user on our website
                </h2>
                <p className="text-gray-700 mb-4 whitespace-pre-line">
                    To use this app here you have to delete your web account. As
                    a Bonus you will be rewarded with FREE TICKETS to make your
                    listing as features listing.
                </p>
                <div className="bg-yellow-100 text-yellow-800 rounded p-3 mb-4 text-sm">
                    Please note: By deleting your website account your all old
                    data will be erased.
                </div>
                <div className="flex justify-center gap-4 mb-6">
                    <button
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg text-base transition"
                        onClick={async () => {
                            setDeletingUser(true);
                            try {
                                const formData = new FormData();
                                formData.append(
                                    "telegram_username",
                                    WebApp.initDataUnsafe?.user?.username || ""
                                );
                                await fetch(
                                    "/api/disable-user",
                                    {
                                        method: "POST",
                                        body: formData,
                                    }
                                );
                                setShowUsernameExistPopup(false);
                                setDeletingUser(false);
                                WebApp.close(); // Close the app after deletion
                            } catch {
                                setDeletingUser(false);
                                WebApp.showAlert(
                                    "Failed to delete web account. Please try again."
                                );
                            }
                        }}
                        disabled={deletingUser}
                    >
                        {deletingUser ? "Deleting..." : "Delete web Account"}
                    </button>
                    <button
                        className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-6 rounded-lg text-base transition"
                        onClick={() => {
                            setShowUsernameExistPopup(false);
                            WebApp.close();
                        }}
                        disabled={deletingUser}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <>
            {showWelcome && <WelcomeCard />}
            {showUsernameExistPopup && <UsernameExistPopup />}
            <BrowserRouter basename="/tgdirectory">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/submit-link" element={<SubmitLink />} />
                    <Route path="/search-link" element={<SearchLink />} />
                    <Route
                        path="/country-feature-listing"
                        element={<CountryFeatureListing />}
                    />
                    <Route
                        path="/global-feature-listing"
                        element={<GlobalFeatureListing />}
                    />
                    <Route
                        path="/my-submitted-links"
                        element={<MySubmittedLinks />}
                    />
                    <Route
                        path="/my-feature-listing"
                        element={<MyFeatureListing />}
                    />
                    <Route path="/buy-tickets" element={<BuyTickets />} />
                    <Route path="/ticket-history" element={<TicketHistory />} />
                    <Route
                        path="/featured-channels"
                        element={<FeaturedChannels />}
                    />
                    <Route
                        path="/announcement"
                        element={<AnnouncementPage />}
                    />
                    <Route path="/ticket-quota" element={<TicketQuota />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
