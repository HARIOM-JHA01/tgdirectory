import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";

interface Announcement {
    id: number;
    title: string;
    description: string;
    updated_at?: string;
}
const AnnouncementPage: React.FC = () => {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [selectedOption, setSelectedOption] = useState<string>("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnnouncements = async () => {
            setLoading(true);
            try {
                const res = await fetch(
                    "/api/get-notice-announcement"
                );
                const data = await res.json();
                setAnnouncements(data.result || []);
                if (data.result && data.result.length > 0) {
                    setSelectedOption(data.result[0].title);
                }
            } catch {
                setAnnouncements([]);
            }
            setLoading(false);
        };
        fetchAnnouncements();
    }, []);

    const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(e.target.value);
    };

    const selectedAnnouncement = announcements.find(
        (a) => a.title === selectedOption
    );

    return (
        <Layout bgColor="bg-blue-50">
            <div className="max-w-2xl mx-auto px-4 py-8">
                {/* Dropdown selector */}
                <div className="mb-6 flex flex-col sm:flex-row gap-3 items-center">
                    <label className="font-medium text-gray-700">
                        Select Announcement:
                    </label>
                    <select
                        value={selectedOption}
                        onChange={handleOptionChange}
                        className="flex-1 border border-blue-300 rounded-md py-2 px-3 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                    >
                        {announcements.map((a) => (
                            <option key={a.id} value={a.title}>
                                {a.title}
                            </option>
                        ))}
                    </select>
                </div>
                {/* Content based on selected option */}
                <div className="bg-white rounded-xl shadow-lg p-6 min-h-[160px] border border-blue-100">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-8">
                            <svg
                                className="animate-spin h-8 w-8 text-blue-400 mb-2"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v8z"
                                ></path>
                            </svg>
                            <span className="text-blue-500 font-medium">
                                Loading...
                            </span>
                        </div>
                    ) : selectedAnnouncement ? (
                        <>
                            <h2 className="text-xl font-semibold text-blue-600 mb-2">
                                {selectedAnnouncement.title}
                            </h2>
                            <div
                                className="prose max-w-none text-gray-800"
                                dangerouslySetInnerHTML={{
                                    __html: selectedAnnouncement.description,
                                }}
                            />
                        </>
                    ) : (
                        <div className="text-center text-gray-500">
                            No announcement found.
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default AnnouncementPage;
