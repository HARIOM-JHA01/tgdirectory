import React, { useEffect, useState } from "react";
import WebApp from "@twa-dev/sdk";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import BannerCarousel from "../components/TopBannerCarousel";
import tgdcBanner from "../assets/tgdc.jpg";
import { useLanguage } from "../context/useLanguage";

const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const [linkCount, setLinkCount] = useState<string>("...");
    const { t } = useLanguage();

    useEffect(() => {
        WebApp.BackButton.show();
        WebApp.BackButton.onClick(() => {
            window.history.back();
        });

        // Fetch link count from API
        fetch("/api/get-link-count")
            .then((res) => res.json())
            .then((data) => {
                setLinkCount(data.generate_id);
            })
            .catch(() => setLinkCount("N/A"));

        return () => {
            WebApp.BackButton.offClick(() => {
                window.history.back();
            });
        };
    }, []);

    return (
        <Layout bgColor="bg-[#d3edfa]">
            <div className="text-white">
                {/* Title */}
                <div className="text-center py-4">
                    <h1 className="text-xl font-normal text-blue-800">
                        {t("CTL")}
                    </h1>
                </div>

                {/* Search Field */}
                <div className="px-4 pb-4">
                    <div className="max-w-2xl mx-auto bg-white">
                        {/* <p className="text-lg text-center font-mono font-semibold text-blue-800">
                            {t("ULS")}
                        </p> */}
                        <div className="w-full rounded-lg text-blue-800 text-center text-lg font-mono py-2">
                            {linkCount}
                        </div>
                    </div>
                </div>

                {/* Banner Carousel from API */}
                <BannerCarousel />

                {/* TG Directory Channel Banner */}
                <div
                    className="px-4 pb-4"
                    onClick={() =>
                        window.open("https://t.me/TGDirectories", "_blank")
                    }
                >
                    <img
                        src={tgdcBanner}
                        alt="TG Directory Logo"
                        className="w-full h-auto rounded-lg shadow-lg"
                    />
                </div>

                {/* How to submit link */}
                <div className="text-center pb-4">
                    <a
                        href="https://www.youtube.com/watch?v=OW5oJiNMcdA"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xl font-normal text-blue-800 hover:underline cursor-pointer"
                    >
                        {t("HSL")}
                    </a>
                </div>

                {/* Action Buttons */}
                <div className="px-4 pb-6 space-y-2">
                    <button
                        onClick={() => navigate("/submit-link")}
                        className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white py-3 rounded-lg text-base font-semibold"
                    >
                        {t("SL")}
                    </button>
                    <button
                        onClick={() => navigate("/search-link")}
                        className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white py-3 rounded-lg text-base font-semibold"
                    >
                        {t("SRL")}
                    </button>
                    <button
                        onClick={() => navigate("/country-feature-listing")}
                        className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white py-3 rounded-lg text-base font-semibold"
                    >
                        {t("CFL")}
                    </button>
                    <button
                        onClick={() => navigate("/global-feature-listing")}
                        className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white py-3 rounded-lg text-base font-semibold"
                    >
                        {t("GFL")}
                    </button>
                </div>
            </div>
        </Layout>
    );
};

export default HomePage;
