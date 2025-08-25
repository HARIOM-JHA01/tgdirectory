import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { telegramId } from "../utils/telegramUtils";
import { useLanguage } from "../context/useLanguage";

type FilterType =
    | "All features listing"
    | "Disabled"
    | "Approved"
    | "Rejected"
    | "Running"
    | "Expired";

interface FeatureListing {
    fid: string;
    sl_link: string;
    start_date: string | null;
    expire_date: string | null;
    days: string;
    country_name: string;
    sl_type: string;
    sl_title: string;
    status: string;
}

const filterOptions: { label: FilterType; value: string }[] = [
    { label: "All features listing", value: "3" },
    { label: "Running", value: "3" },
    { label: "Expired", value: "4" },
];

const MyFeatureListing: React.FC = () => {
    const navigate = useNavigate();
    const { l_key } = useLanguage();
    const [filterType, setFilterType] = useState<FilterType>(
        "All features listing"
    );
    const [listings, setListings] = useState<FeatureListing[]>([]);
    const [visibleCount, setVisibleCount] = useState<number>(5);
    const [customPageTitle, setCustomPageTitle] = useState<string>("");

    useEffect(() => {
        const fetchUserIdAndListings = async () => {
            try {
                const selectedOption = filterOptions.find(
                    (opt) => opt.label === filterType
                );
                const statusParam = selectedOption?.value ?? "";
                const url = `/api/${l_key.toLowerCase()}/my-feature-list?telegram_id=${telegramId}&status=${statusParam}`;
                const response = await axios.get(url, {
                    headers: {
                        Cookie: "ci_session_frontend=dnlf4sf5bs367ijtjf8qek2i92965ljq",
                    },
                });
                const fetched = response.data?.dataArr || [];
                setListings(fetched);
            } catch (error) {
                setListings([]);
                console.error("Failed to fetch feature listings:", error);
            }
        };

        fetchUserIdAndListings();
        setVisibleCount(5); // Reset count on filter change
    }, [filterType, l_key]);

    useEffect(() => {
        const fetchFeatureListings = async () => {
            try {
                const url = `/api/${l_key.toLowerCase()}/my-feature-list?telegram_id=${telegramId}&status=3`;
                const response = await fetch(url);
                const data = await response.json();
                setListings(data.dataArr || []);
                setCustomPageTitle("My Feature Listings");
            } catch (error) {
                setListings([]);
                setCustomPageTitle("My Feature Listings");
                console.error("Failed to fetch feature listings:", error);
            }
        };
        fetchFeatureListings();
        setVisibleCount(5);
    }, [l_key]);

    const filteredListings = (): FeatureListing[] => listings;

    const handleSubmittedLinkClick = () => {
        navigate("/my-submitted-links");
    };

    const visibleListings = filteredListings().slice(0, visibleCount);

    return (
        <Layout bgColor="bg-blue-50">
            <div className="px-4 py-6">
                <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">
                    {customPageTitle}
                </h1>
                <div className="flex justify-center mb-4">
                    <button
                        onClick={handleSubmittedLinkClick}
                        className="bg-green-500 hover:bg-green-600 text-white font-medium py-2.5 px-6 rounded-md transition duration-200"
                    >
                        Submitted Link
                    </button>
                </div>

                <div className="mb-4">
                    <select
                        value={filterType}
                        onChange={(e) =>
                            setFilterType(e.target.value as FilterType)
                        }
                        className="w-full md:w-80 px-4 py-2.5 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {filterOptions.map((opt) => (
                            <option key={opt.value} value={opt.label}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="overflow-x-auto">
                    <div className="inline-block min-w-full">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr className="bg-blue-500 text-white">
                                    <th className="px-4 py-3 text-left text-sm font-medium whitespace-nowrap">
                                        Link
                                    </th>
                                    <th className="px-4 py-3 text-left text-sm font-medium whitespace-nowrap">
                                        Start Date
                                    </th>
                                    <th className="px-4 py-3 text-left text-sm font-medium whitespace-nowrap">
                                        Expire Date
                                    </th>
                                    <th className="px-4 py-3 text-center text-sm font-medium whitespace-nowrap">
                                        Days
                                    </th>
                                    <th className="px-4 py-3 text-left text-sm font-medium whitespace-nowrap">
                                        Country
                                    </th>
                                    <th className="px-4 py-3 text-left text-sm font-medium whitespace-nowrap">
                                        Type
                                    </th>
                                    <th className="px-4 py-3 text-left text-sm font-medium whitespace-nowrap">
                                        Title
                                    </th>
                                    <th className="px-4 py-3 text-center text-sm font-medium whitespace-nowrap">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {visibleListings.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={8}
                                            className="py-8 text-center text-gray-500"
                                        >
                                            No data available
                                        </td>
                                    </tr>
                                ) : (
                                    visibleListings.map((listing) => {
                                        const isRunning =
                                            listing.status === "3";
                                        const isExpired =
                                            listing.status === "4";
                                        return (
                                            <tr
                                                key={listing.fid}
                                                className="hover:bg-blue-50"
                                            >
                                                <td className="px-4 py-3 whitespace-nowrap">
                                                    <a
                                                        href={`https://t.me/${listing.sl_link}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-600 hover:underline"
                                                    >
                                                        {listing.sl_link}
                                                    </a>
                                                </td>
                                                <td className="px-4 py-3 whitespace-nowrap text-gray-500">
                                                    {listing.start_date || "-"}
                                                </td>
                                                <td className="px-4 py-3 whitespace-nowrap text-gray-500">
                                                    {listing.expire_date || "-"}
                                                </td>
                                                <td className="px-4 py-3 whitespace-nowrap text-center">
                                                    {listing.days}
                                                </td>
                                                <td className="px-4 py-3 whitespace-nowrap">
                                                    {listing.country_name}
                                                </td>
                                                <td className="px-4 py-3 whitespace-nowrap">
                                                    {Number(listing.sl_type) ===
                                                        0
                                                        ? "Group"
                                                        : "Channel"}
                                                </td>
                                                <td className="px-4 py-3 whitespace-nowrap">
                                                    {listing.sl_title}
                                                </td>
                                                <td className="px-4 py-3 whitespace-nowrap text-center">
                                                    {isRunning ? (
                                                        <span className="inline-block bg-green-600 text-white px-4 py-2 rounded font-semibold text-base">
                                                            Running as features
                                                            listing
                                                        </span>
                                                    ) : isExpired ? (
                                                        <span className="inline-block bg-yellow-400 text-white px-4 py-2 rounded font-semibold text-base">
                                                            Expired
                                                        </span>
                                                    ) : (
                                                        <span className="inline-block bg-gray-300 text-gray-700 px-4 py-2 rounded font-semibold text-base">
                                                            Unknown
                                                        </span>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* Load More Button */}
                {visibleCount < filteredListings().length && (
                    <div className="mt-4 flex justify-center">
                        <button
                            onClick={() => setVisibleCount((prev) => prev + 5)}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-md transition duration-200"
                        >
                            Load More
                        </button>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default MyFeatureListing;
