import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import TopBannerCarousel from "../components/TopBannerCarousel";
import { useLanguage } from "../context/useLanguage";

interface Country {
    id: string;
    name: string;
    code: string;
}

interface Channel {
    id: string;
    name: string;
    description: string;
    username: string;
    avatar?: string;
}

const CountryFeatureListing: React.FC = () => {
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(
        null
    );
    const [countries, setCountries] = useState<Country[]>([]);
    const [channels, setChannels] = useState<Channel[]>([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const CI_COOKIE = "ci_session_frontend=lmt4a7p2v6piqcob56f9ntt1hkrm1ei3";
    const { l_key } = useLanguage();

    useEffect(() => {
        async function fetchCountries() {
            try {
                const res = await fetch("/api/getCountry", {
                    headers: { Cookie: CI_COOKIE },
                    credentials: "include",
                });
                if (!res.ok) throw new Error();
                const data = await res.json();
                const mapped = (data.CountryData || [])
                    .filter(
                        (c: { country_id: string }) => c.country_id !== "248"
                    )
                    .map(
                        (c: {
                            country_id: string;
                            country_name: string;
                            country_2_char_code?: string;
                        }) => ({
                            id: String(c.country_id),
                            name: String(c.country_name),
                            code: String(c.country_2_char_code || ""),
                        })
                    );
                setCountries(mapped);
                // Set default country to country_id '98' if it exists, else first
                const defaultCountry: Country | undefined = mapped.find((c: Country) => c.id === '98') || mapped[0];
                if (defaultCountry) setSelectedCountry(defaultCountry);
            } catch {
                setCountries([]);
            }
        }
        fetchCountries();
    }, []);

    useEffect(() => {
        async function fetchChannels() {
            if (!selectedCountry) return;
            setLoading(true);
            try {
                const res = await fetch(
                    `/api/${l_key.toLowerCase()}/global-feature-link-list/?country_id=${selectedCountry.id}`,
                    {
                        headers: { Cookie: CI_COOKIE },
                        credentials: "include",
                    }
                );
                if (!res.ok) throw new Error();
                const data = await res.json();
                interface ChannelData {
                    fid: string;
                    sl_title: string;
                    sl_description: string;
                    sl_link: string;
                    sl_avtar?: string;
                }

                const mapped = (data.dataArr || []).map((ch: ChannelData) => ({
                    id: String(ch.fid),
                    name: String(ch.sl_title),
                    description: String(ch.sl_description),
                    username: String(ch.sl_link),
                    avatar: ch.sl_avtar ? String(ch.sl_avtar) : undefined,
                }));
                setChannels(mapped);
            } catch {
                setChannels([]);
            }
            setLoading(false);
        }
        fetchChannels();
    }, [selectedCountry, l_key]);

    return (
        <Layout>
            <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 flex flex-col">
                <div className=" ">
                    <TopBannerCarousel height="h-[150px]" />
                </div>

                <div className="mx-2">
                    <div className="relative">
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="w-full bg-white border-2 border-cyan-400 rounded-xl p-4 flex items-center justify-between text-left"
                        >
                            <span className="text-gray-800 font-medium text-lg">
                                {selectedCountry?.name ?? "Select Country"}
                            </span>
                            <svg
                                className={`w-5 h-5 text-gray-600 transition-transform ${dropdownOpen ? "rotate-180" : ""
                                    }`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>

                        {dropdownOpen && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
                                {countries.map((c) => (
                                    <button
                                        key={c.id}
                                        onClick={() => {
                                            setSelectedCountry(c);
                                            setDropdownOpen(false);
                                        }}
                                        className={`w-full text-left px-4 py-3 hover:bg-gray-50 ${selectedCountry?.id === c.id
                                            ? "bg-blue-50 text-blue-600"
                                            : "text-gray-800"
                                            }`}
                                    >
                                        {c.name}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex-1 flex flex-col">
                    <div className="mx-auto w-full max-w-2xl mt-4 space-y-1 px-2 flex-1">
                        {loading ? (
                            <div className="text-center text-gray-500 py-8">
                                Loading channels...
                            </div>
                        ) : channels.length === 0 ? (
                            <div className="text-center text-gray-500 py-8">
                                No featured channels found.
                            </div>
                        ) : (
                            channels.map((ch) => (
                                <div
                                    key={ch.id}
                                    className="border-2 border-blue-300 rounded-md shadow-sm w-full flex p-2"
                                >
                                    {/* Left Avatar Column */}
                                    <div className="flex justify-center">
                                        <div className="w-full h-full flex items-center justify-center pr-2">
                                            {ch.avatar ? (
                                                <img
                                                    src={ch.avatar}
                                                    alt={ch.name}
                                                    className="w-20 h-20 rounded-lg border-blue-300 border-4"
                                                    onError={(e) => {
                                                        e.currentTarget.src =
                                                            "https://telegramdirectory.org/img/logo.png";
                                                    }}
                                                />
                                            ) : (
                                                <svg
                                                    className="w-12 h-12 text-cyan-400"
                                                    viewBox="0 0 24 24"
                                                    fill="currentColor"
                                                >
                                                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                                                </svg>
                                            )}
                                        </div>
                                    </div>

                                    {/* Right Content Column (col-10 equivalent) */}
                                    <div className="w-10/12 flex flex-col justify-center">
                                        <input
                                            type="text"
                                            value={ch.name}
                                            readOnly
                                            className="w-full border-4 border-blue-300 rounded-sm mb-2 text-gray-800 font-medium"
                                        />
                                        <button
                                            onClick={() =>
                                                window.open(
                                                    ch.username.startsWith("http")
                                                        ? ch.username
                                                        : `https://t.me/${ch.username}`,
                                                    "_blank"
                                                )
                                            }
                                            className="bg-blue-400 hover:bg-blue-600 text-white py-2 rounded-2xl font-medium transition"
                                        >
                                            Visit channel
                                        </button>
                                    </div>
                                </div>

                            ))
                        )}
                    </div>

                    <div className="mx-auto w-full max-w-2xl flex justify-end pr-2 mt-2 mb-8">
                        <button
                            className="w-10 h-10 flex items-center justify-center bg-cyan-400 hover:bg-cyan-500 rounded-full shadow transition-all disabled:opacity-50"
                            disabled
                        >
                            <svg
                                className="w-6 h-6 text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 3a1 1 0 01.993.883L11 4v10.586l3.293-3.293a1 1 0 011.497 1.32l-.083.094-5 5a1 1 0 01-1.32.083l-.094-.083-5-5a1 1 0 011.32-1.497l.094.083L9 14.586V4a1 1 0 011-1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CountryFeatureListing;
