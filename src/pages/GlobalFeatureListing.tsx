import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { ApiChannel } from "../types/types";
import TopBannerCarousel from "../components/TopBannerCarousel";
import { useLanguage } from "../context/useLanguage";

const GlobalFeatureListing: React.FC = () => {
    const [channels, setChannels] = useState<ApiChannel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [visibleCount, setVisibleCount] = useState(5);
    const { l_key } = useLanguage();

    useEffect(() => {
        const fetchChannels = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch(
                    `/api/${l_key.toLowerCase()}/global-feature-link-list/?country_id=248`,
                    {
                        headers: {
                            Cookie: "ci_session_frontend=lmt4a7p2v6piqcob56f9ntt1hkrm1ei3",
                        },
                        credentials: "include",
                    }
                );
                if (!response.ok) throw new Error("Failed to fetch");
                const data = await response.json();
                setChannels(data.dataArr || []);
            } catch (err: unknown) {
                setError("Failed to load channels.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchChannels();
    }, [l_key]);

    const handleVisitChannel = (username: string) => {
        window.open(`https://t.me/${username}`, "_blank");
    };

    // Helper to render avatar or fallback
    const renderAvatar = (channel: ApiChannel) => {
        if (channel.sl_avtar && channel.sl_avtar.includes("http")) {
            return (
                <img
                    src={channel.sl_avtar}
                    alt={channel.sl_title}
                    className="w-20 h-20 min-w-[80px] min-h-[80px] max-w-[80px] max-h-[80px] aspect-square rounded-lg object-cover border border-blue-300 bg-white"
                />
            );
        }
        // Fallback: Telegram icon for missing avatar
        if (channel.sl_title) {
            // If title is 2 words, use initials, else use first 2 letters
            const words = channel.sl_title.split(" ");
            const initials =
                words.length >= 2
                    ? words[0][0] + words[1][0]
                    : channel.sl_title.slice(0, 2);
            if (initials.toUpperCase() === "BK") {
                // Special fallback for 'BK' as in screenshot
                return (
                    <div className="w-20 h-20 rounded-lg bg-blue-200 flex items-center justify-center text-3xl font-bold text-white border border-blue-300">
                        BK
                    </div>
                );
            }
        }
        return (
            <div className="w-20 h-20 rounded-lg bg-blue-200 flex items-center justify-center border border-blue-300">
                <svg
                    className="w-12 h-12 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                >
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
            </div>
        );
    };

    return (
        <Layout>
            <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 flex flex-col">
                {/* Global Featured Title - moved to top */}
                {/* <div className="mx-auto w-full max-w-2xl py-6 px-4">
                    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
                        <h2 className="text-center text-xl font-semibold text-gray-800">
                            Featured Telegram Channels
                        </h2>
                    </div>
                </div> */}

                {/* Promotional Banner - now below the title */}
                <TopBannerCarousel height="h-[150px]" />

                {/* Channel Listings */}
                <div className="mx-auto w-full max-w-2xl px-2">
                    {isLoading && (
                        <div className="text-center text-lg">Loading...</div>
                    )}
                    {error && (
                        <div className="text-center text-red-500">{error}</div>
                    )}
                    {!isLoading && !error && channels.length === 0 && (
                        <div className="text-center text-gray-500">
                            No channels found.
                        </div>
                    )}
                    {!isLoading &&
                        !error &&
                        channels.slice(0, visibleCount).map((channel, idx) => (
                            <div
                                key={idx}
                                className="border-2 border-blue-300 rounded-md shadow-sm w-full flex p-2"
                            >
                                {/* Left Avatar Column */}
                                <div className="flex justify-center">
                                    <div className="w-full h-full flex items-center justify-center pr-2">
                                        {renderAvatar(channel)}
                                    </div>
                                </div>
                                {/* Right Content Column */}
                                <div className="w-10/12 flex flex-col justify-center">
                                    <input
                                        type="text"
                                        value={` ${channel.sl_title}`}
                                        readOnly
                                        className="w-full border-4 border-blue-300 rounded-sm mb-2 py-1 text-gray-800 font-medium"
                                    />
                                    <button
                                        onClick={() =>
                                            handleVisitChannel(channel.sl_link)
                                        }
                                        className="bg-blue-600 text-white py-1 rounded-lg shadow-md font-medium transition"
                                    >
                                        Visit channel
                                    </button>
                                </div>
                            </div>
                        ))}
                </div>

                {/* Load More Button */}
                <div className="mx-auto flex justify-center m-2">
                    {visibleCount < channels.length && (
                        <button
                            className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full hover:from-indigo-600 hover:to-purple-700 transition-all"
                            onClick={() => setVisibleCount((prev) => prev + 5)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 4.5v15m7.5-7.5h-15"
                                />
                            </svg>
                        </button>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default GlobalFeatureListing;
