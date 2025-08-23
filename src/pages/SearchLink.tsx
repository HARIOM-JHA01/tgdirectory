import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import TopBannerCarousel from "../components/TopBannerCarousel";
import BottomBannerCarousel from "../components/BottomBannerCarousel";
import WebApp from "@twa-dev/sdk";
import { useLanguage } from "../context/LanguageContext";

const SearchLink: React.FC = () => {
    const [selectedType, setSelectedType] = useState<"Group" | "Channel">(
        "Group"
    );
    const [tag, setTag] = useState("");
    const [carouselIndex, setCarouselIndex] = useState(0);
    const { t } = useLanguage();
    interface SearchResult {
        id: string;
        sl_type: string; // '0' for group, '1' for channel
        sl_title: string;
        sl_description: string;
        sl_link: string;
        sl_avtar: string;
        sl_tag_1?: string;
        sl_tag_2?: string;
        sl_tag_3?: string;
        sl_tag_4?: string;
        sl_tag_5?: string;
        sl_tag_6?: string;
    }

    const [results, setResults] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setResults([]);
        const typeParam = selectedType === "Channel" ? 1 : 0;
        try {
            const response = await fetch(
                `/api/en/search?isSearch=1&type=${typeParam}&tag=${encodeURIComponent(
                    tag
                )}`,
                {
                    credentials: "include",
                }
            );
            if (!response.ok) throw new Error("Failed to fetch results");
            const data = await response.json();
            setResults(data?.searchArr || []);
        } catch (err: unknown) {
            setError((err as Error).message || "Unknown error");
        } finally {
            setLoading(false);
        }
    };

    const handleContactUs = () => {
        window.open("https://t.me/tgdirectory_org", "_blank");
    };

    // Carousel navigation handlers
    const handlePrev = () => {
        setCarouselIndex((prev) =>
            prev === 0 ? results.length - 1 : prev - 1
        );
    };
    const handleNext = () => {
        setCarouselIndex((prev) =>
            prev === results.length - 1 ? 0 : prev + 1
        );
    };

    return (
        <Layout bgColor="bg-[#d3edfa]">
            <div className="flex flex-col h-full">
                {/* Contact Us Button */}
                <div className="px-4 pt-4 pb-2">
                    <button
                        onClick={handleContactUs}
                        className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium"
                    >
                        {t("CU")}
                    </button>
                </div>

                {/* Promotional Banner */}
                <TopBannerCarousel />

                {/* Group/Channel Toggle */}
                <div className="px-4 pt-4">
                    <div className="flex bg-white rounded-lg overflow-hidden border border-gray-300">
                        <button
                            className={`flex-1 py-3 text-center ${selectedType === "Group"
                                    ? "bg-blue-500 text-white"
                                    : "text-gray-700"
                                }`}
                            onClick={() => setSelectedType("Group")}
                        >
                            {t("GU")}
                        </button>
                        <button
                            className={`flex-1 py-3 text-center ${selectedType === "Channel"
                                    ? "bg-blue-500 text-white"
                                    : "text-gray-700"
                                }`}
                            onClick={() => setSelectedType("Channel")}
                        >
                            {t("CH")}
                        </button>
                    </div>
                </div>

                {/* Tags Input */}
                <div className="px-4 pt-2">
                    <div>
                        <p className="text-center text-gray-700 text-sm">
                            {t("TGS")}
                        </p>
                        <div className="relative">
                            <input
                                type="text"
                                value={tag}
                                onChange={(e) => setTag(e.target.value)}
                                placeholder={t("ES")}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700"
                            />
                            <p className="text-red-500 text-xs mt-1 ml-1">
                                {t("MAS")}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Search Button */}
                <div className="px-4 pt-2">
                    <button
                        onClick={handleSearch}
                        className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium"
                        disabled={loading}
                    >
                        {loading ? t("SE") + "..." : t("SE")}
                    </button>
                </div>

                {/* Results as Carousel */}
                <div className="px-4 pt-4">
                    {error && (
                        <div className="text-red-500 text-center">{error}</div>
                    )}
                    {results.length > 0 && (
                        <div className="flex flex-col items-center">
                            <div className="bg-[#b3e6ff] rounded-xl p-4 w-full max-w-md flex flex-col items-center relative shadow-lg">
                                {/* Avatar and Title */}
                                <div className="flex items-center w-full mb-2">
                                    {/* Avatar */}
                                    {results[carouselIndex].sl_avtar &&
                                        results[carouselIndex].sl_avtar.startsWith(
                                            "http"
                                        ) ? (
                                        <img
                                            src={
                                                results[carouselIndex].sl_avtar
                                            }
                                            alt={
                                                results[carouselIndex].sl_title
                                            }
                                            className="w-16 h-16 rounded-lg object-cover border border-blue-300 mr-3"
                                        />
                                    ) : (
                                        <div className="w-16 h-16 rounded-lg bg-blue-200 flex items-center justify-center text-2xl font-bold text-white border border-blue-300 mr-3">
                                            {results[
                                                carouselIndex
                                            ].sl_title.slice(0, 2)}
                                        </div>
                                    )}
                                    {/* Title */}
                                    <input
                                        type="text"
                                        value={results[carouselIndex].sl_title}
                                        readOnly
                                        className="flex-1 bg-white border border-blue-200 rounded-md px-3 py-2 text-lg font-normal text-gray-700 focus:outline-none cursor-default min-w-0"
                                    />
                                </div>
                                {/* Description */}
                                <textarea
                                    value={
                                        results[carouselIndex].sl_description
                                    }
                                    readOnly
                                    className="w-full bg-white border border-blue-200 rounded-md px-3 py-2 text-gray-700 focus:outline-none cursor-default resize-none mb-4 min-h-[90px]"
                                />
                                {/* Visit Button */}
                                <button
                                    onClick={async () => {
                                        await navigator.clipboard.writeText(
                                            results[carouselIndex]
                                                .sl_description || ""
                                        );
                                        window.open(
                                            `https://t.me/${results[carouselIndex].sl_link}`,
                                            "_blank"
                                        );
                                    }}
                                    className="w-full bg-[#00baff] hover:bg-[#0099dd] text-white py-3 rounded-lg font-medium text-lg mb-2"
                                >
                                    {t("VI")}
                                </button>
                                {/* Carousel Arrows and Share Button */}
                                <div className="flex items-center justify-between w-full mt-2">
                                    <button
                                        onClick={handlePrev}
                                        className="text-blue-700 text-2xl px-2 focus:outline-none"
                                        aria-label="Previous"
                                    >
                                        &#x25C0;
                                    </button>
                                    <button
                                        onClick={async () => {
                                            const typeParam = selectedType === "Channel" ? 1 : 0;
                                            const shareUrl = `https://telegramdirectory.org/en/search?isSearch=1&type=${typeParam}&tag=${encodeURIComponent(tag)}`;
                                            if (navigator.share) {
                                                try {
                                                    await navigator.share({
                                                        title: results[carouselIndex].sl_title,
                                                        text: results[carouselIndex].sl_description,
                                                        url: shareUrl,
                                                    });
                                                } catch (e) {
                                                    // User cancelled share or error
                                                }
                                            } else {
                                                await navigator.clipboard.writeText(shareUrl);
                                                WebApp.showAlert(t("COPY_SUCCESS"));
                                            }
                                        }}
                                        className="bg-[#00baff] hover:bg-[#0099dd] text-white px-8 py-2 rounded-lg font-medium text-lg"
                                    >
                                        {t("SH")}
                                    </button>
                                    <button
                                        onClick={handleNext}
                                        className="text-blue-700 text-2xl px-2 focus:outline-none"
                                        aria-label="Next"
                                    >
                                        &#x25B6;
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Bottom Banner Carousel */}
                <div className="pt-6 mt-auto">
                    <BottomBannerCarousel height="h-[135px]" />
                </div>
            </div>
        </Layout>
    );
};

export default SearchLink;
