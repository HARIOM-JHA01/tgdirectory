import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { telegramId } from "../utils/telegramUtils";
import { useLanguage } from "../context/useLanguage";

type SubmittedLink = {
    id: string;
    sl_type: string;
    sl_title: string;
    sl_status: string;
    sl_link: string;
};

type ViewLinkDetails = {
    sl_type: string;
    sl_title: string;
    sl_description: string;
    sl_link: string;
    sl_tag_1?: string;
    sl_tag_2?: string;
    sl_tag_3?: string;
    sl_tag_4?: string;
    sl_tag_5?: string;
    sl_tag_6?: string;
    id?: string;
};

const MySubmittedLinks: React.FC = () => {
    const [submittedLinks, setSubmittedLinks] = useState<SubmittedLink[]>([]);
    const [showFeaturePopup, setShowFeaturePopup] = useState(false);
    const [featureLinkId, setFeatureLinkId] = useState<string | null>(null);
    const [featureType, setFeatureType] = useState<"country" | "global" | null>(
        null
    );
    const [countries, setCountries] = useState<
        {
            country_id: string;
            country_name: string;
            register_allow: number;
            allow: number;
        }[]
    >([]);
    const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [featureMsg, setFeatureMsg] = useState<string>("");
    const [showViewPopup, setShowViewPopup] = useState(false);
    const [viewDetails, setViewDetails] = useState<ViewLinkDetails | null>(
        null
    );
    const [viewLoading, setViewLoading] = useState(false);
    const [featureDuration, setFeatureDuration] = useState<string>("0");
    const [showEditForm, setShowEditForm] = useState(false);
    const [editForm, setEditForm] = useState<ViewLinkDetails | null>(null);
    const [editLoading, setEditLoading] = useState(false);
    const [editErrors, setEditErrors] = useState<Record<string, string>>({});

    const navigate = useNavigate();
    const { t, l_key } = useLanguage();

    const handleMyFeatureListing = () => {
        navigate("/my-feature-listing");
    };

    const handleView = async (link: string) => {
        const linkObj = submittedLinks.find((l) => l.sl_link === link);
        if (!linkObj) return;
        setViewLoading(true);
        setShowViewPopup(true);
        try {
            const res = await fetch(`/api/${l_key.toLowerCase()}/view-list?link_id=${linkObj.id}`, {
                credentials: "include",
            });
            const data = await res.json();
            setViewDetails(data || {});
        } catch {
            setViewDetails(null);
        }
        setViewLoading(false);
    };

    const handleCancelView = () => {
        setShowViewPopup(false);
        setViewDetails(null);
    };

    const handleDelete = async () => {
        if (!viewDetails?.id) return;
        setViewLoading(true);
        try {
            const formData = new FormData();
            formData.append("submit_link_id", viewDetails.id);
            await fetch(`/api/${l_key.toLowerCase()}/delete`, {
                method: "POST",
                body: formData,
                credentials: "include",
            });
            setShowViewPopup(false);
            setViewDetails(null);
            setSubmittedLinks((prev) =>
                prev.filter((l) => l.id !== viewDetails.id)
            );
        } catch (error) {
            console.error("Failed to delete link:", error);
        }
        setViewLoading(false);
    };

    const handleMakeItFeaturesListing = async (linkId: string) => {
        setFeatureLinkId(linkId);
        setFeatureType("global");
        setShowFeaturePopup(true);
        setFeatureMsg("");
        setSelectedCountries([]);
    };

    const handleEditClick = () => {
        setEditForm(viewDetails);
        setShowEditForm(true);
        setEditErrors({});
    };

    const handleEditFormChange = (field: string, value: string) => {
        setEditForm((prev) => (prev ? { ...prev, [field]: value } : prev));
    };

    const handleEditSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editForm?.id) return;
        setEditLoading(true);
        setEditErrors({});
        try {
            const formData = new FormData();
            formData.append("id", editForm.id);
            formData.append("sl_type", editForm.sl_type);
            formData.append("sl_title", editForm.sl_title);
            formData.append("sl_description", editForm.sl_description);
            formData.append("sl_link", editForm.sl_link);
            formData.append("telegram_id", telegramId?.toString() || "");
            for (let i = 1; i <= 6; i++) {
                formData.append(
                    `sl_tag_${i}`,
                    editForm[`sl_tag_${i}` as keyof ViewLinkDetails] || ""
                );
            }
            const res = await fetch(`/api/${l_key.toLowerCase()}/submit-link`, {
                method: "POST",
                body: formData,
                credentials: "include",
            });
            const data = await res.json();
            if (data.status !== 1 || data.success !== 1) {
                setEditErrors({ form: data.msg ? data.msg : t("FAILED_UPDATE") });
                setEditLoading(false);
                return;
            }
            setShowEditForm(false);
            setShowViewPopup(false);
            setViewDetails(null);
            setSubmittedLinks((prev) =>
                prev.map((l) =>
                    l.id === editForm.id
                        ? {
                            ...l,
                            sl_title: editForm.sl_title,
                            sl_type: editForm.sl_type,
                            sl_link: editForm.sl_link,
                        }
                        : l
                )
            );
        } catch (err: unknown) {
            // Try to extract API error message if possible
            if (err instanceof Response) {
                try {
                    const errorData = await err.json();
                    setEditErrors({ form: errorData.msg ? errorData.msg : t("FAILED_UPDATE") });
                } catch {
                    setEditErrors({ form: t("FAILED_UPDATE") });
                }
            } else if (typeof err === 'object' && err !== null && 'message' in err && typeof (err as { message: unknown }).message === 'string') {
                setEditErrors({ form: (err as { message: string }).message });
            } else {
                setEditErrors({ form: t("FAILED_UPDATE") });
            }
        }
        setEditLoading(false);
    };

    useEffect(() => {
        const fetchSubmittedLinks = async () => {
            try {
                const response = await axios.get(
                    `/api/${l_key.toLowerCase()}/submit-list?telegram_id=${telegramId}`,
                    {
                        headers: {
                            Cookie: "ci_session_frontend=a7booq7io5b88ghqll4va8gkvblvgb1i",
                        },
                    }
                );
                setSubmittedLinks(response.data || []);
            } catch (error) {
                console.error("Failed to fetch submitted links:", error);
            }
        };

        fetchSubmittedLinks();
    }, [l_key]);
    useEffect(() => {
        if (showFeaturePopup) {
            // Fetch feature duration (weeks/days)
            const fetchDuration = async () => {
                try {
                    const res = await fetch(
                        "/api/features-listing-day"
                    );
                    const data = await res.json();
                    setFeatureDuration(data?.data || "1");
                } catch {
                    setFeatureDuration("1");
                }
            };
            fetchDuration();
        }
    }, [showFeaturePopup]);

    useEffect(() => {
        if (showFeaturePopup && featureType === "country") {
            const fetchCountries = async () => {
                try {
                    const res = await fetch("/api/getCountry", {
                        credentials: "include",
                    });
                    const data = await res.json();
                    setCountries(data.CountryData || []);
                } catch {
                    setCountries([]);
                }
            };
            fetchCountries();
        }
    }, [showFeaturePopup, featureType]);

    const handleFeatureSubmit = async () => {
        if (!featureLinkId) return;
        setLoading(true);
        setFeatureMsg("");
        let link_booster = "248";
        let item_name = t("GFL");
        let country_ids: string[] = [];
        if (featureType === "country") {
            if (!selectedCountries.length) {
                setFeatureMsg(t("PLS_SC"));
                setLoading(false);
                return;
            }
            country_ids = selectedCountries;
            link_booster = "0";
            item_name = t("CFL");
        }
        try {
            const formData = new FormData();
            formData.append("telegram_id", telegramId?.toString() || "");
            formData.append("submit_link_id", featureLinkId);
            formData.append("item_name", item_name);
            formData.append("quantity", "1");
            formData.append("link_booster", link_booster);
            if (featureType === "country") {
                country_ids.forEach(id => formData.append("country_id[]", id));
            } else {
                formData.append("country_id", "248");
            }
            const res = await fetch("/api/make-feature-listing", {
                method: "POST",
                body: formData,
                credentials: "include",
            });
            const data = await res.json();
            if (data.status) {
                setFeatureMsg(data.message);
                setTimeout(() => {
                    setShowFeaturePopup(false);
                }, 5200);
            } else {
                setFeatureMsg(t("FAILED_SUBMIT"));
            }
        } catch {
            setFeatureMsg(t("FAILED_SUBMIT"));
        }
        setLoading(false);
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case "0":
                return t("PENDING");
            case "1":
                return t("APPROVED");
            case "2":
                return t("REJECTED");
            case "3":
                return t("RUNNING");
            case "4":
                return t("EXPIRED");
            case "5":
                return t("PENDING");
            default:
                return t("UNKNOWN");
        }
    };

    const getTypeText = (type: string) => {
        if (type === "0") return t("GROUP");
        if (type === "1") return t("CHANNEL");
        return type;
    };

    return (
        <Layout bgColor="bg-blue-50">
            {showFeaturePopup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full text-center relative">
                        <button
                            className="absolute top-2 right-3 text-gray-400 hover:text-gray-700 text-2xl"
                            onClick={() => setShowFeaturePopup(false)}
                        >
                            &times;
                        </button>
                        <h2 className="text-xl font-bold mb-4 text-blue-700">
                            {t("MFL")}
                        </h2>
                        <div className="mb-4 text-gray-800 text-base text-left">
                            <span className="font-semibold">
                                Make this listing as features listing for {featureDuration} week
                                {featureDuration !== "1" ? "s" : ""} and stand out from others.
                                1 ticket will be deducted from your available Ticket Quota.
                            </span>
                        </div>
                        <div className="mb-4 text-left">
                            <div className="p-4 border rounded-lg bg-gray-100">
                                <span className="font-semibold block mb-2 text-center">
                                    {"Select the type of feature listing"}
                                </span>
                                <div className="flex items-center gap-6">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="featureType"
                                            value="country"
                                            checked={featureType === "country"}
                                            onChange={() =>
                                                setFeatureType("country")
                                            }
                                        />
                                        {t("CFL")}
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="featureType"
                                            value="global"
                                            checked={featureType === "global"}
                                            onChange={() =>
                                                setFeatureType("global")
                                            }
                                        />
                                        {t("GFL")}
                                    </label>
                                </div>
                            </div>
                        </div>
                        {featureType === "country" && (
                            <div className="mt-4">
                                <label className="block mb-1 font-medium text-gray-700">
                                    {t("SC")}
                                </label>
                                <div className="max-h-48 overflow-y-auto border rounded-lg p-2 bg-white mb-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {countries
                                        .filter((c) => c.country_id !== "248")
                                        .map((c) => (
                                            <label key={c.country_id} className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    value={c.country_id}
                                                    checked={selectedCountries.includes(c.country_id)}
                                                    onChange={e => {
                                                        if (e.target.checked) {
                                                            setSelectedCountries(prev => [...prev, c.country_id]);
                                                        } else {
                                                            setSelectedCountries(prev => prev.filter(id => id !== c.country_id));
                                                        }
                                                    }}
                                                />
                                                <span>{c.country_name} (Max: {c.register_allow}, Avai: {c.allow})</span>
                                            </label>
                                        ))}
                                </div>
                                <div className="text-xs text-gray-500 mb-2">You can select multiple countries.</div>
                            </div>
                        )}
                        <div className="mt-4 flex justify-between gap-4">
                            <button
                                className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-6 rounded transition duration-200"
                                onClick={() => setShowFeaturePopup(false)}
                                disabled={loading}
                            >
                                {t("CLE")}
                            </button>
                            <button
                                className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded transition duration-200"
                                onClick={handleFeatureSubmit}
                                disabled={loading}
                            >
                                {loading
                                    ? t("SUBMIT") + "..."
                                    : t("SUBMIT")}
                            </button>
                        </div>
                        {featureMsg && (
                            <div className="mt-4 text-center text-sm text-green-600">
                                {featureMsg}
                            </div>
                        )}
                    </div>
                </div>
            )}
            <div className="px-4 py-6">
                <div className="flex justify-center mb-6">
                    <button
                        onClick={handleMyFeatureListing}
                        className="bg-green-500 hover:bg-green-600 text-white font-medium py-2.5 px-6 rounded-md transition duration-200"
                    >
                        {t("MYFL")}
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <div className="inline-block min-w-full bg-white rounded-lg shadow-md">
                        <table className="min-w-full border-collapse">
                            <thead>
                                <tr className="bg-gradient-to-r from-blue-600 to-blue-500 text-white">
                                    <th className="py-3.5 px-4 text-center font-semibold whitespace-nowrap">
                                        {t("ACT")}
                                    </th>
                                    <th className="py-3.5 px-4 text-center font-semibold whitespace-nowrap">
                                        {t("MFL")}
                                    </th>
                                    <th className="py-3.5 px-4 text-center font-semibold whitespace-nowrap">
                                        {t("TYP")}
                                    </th>
                                    <th className="py-3.5 px-4 text-center font-semibold whitespace-nowrap">
                                        {t("TT")}
                                    </th>
                                    <th className="py-3.5 px-4 text-center font-semibold whitespace-nowrap">
                                        {t("ST")}
                                    </th>
                                    <th className="py-3.5 px-4 text-center font-semibold whitespace-nowrap">
                                        {t("L")}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {submittedLinks.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={6}
                                            className="py-8 text-center text-gray-500"
                                        >
                                            {t("NF")}
                                        </td>
                                    </tr>
                                ) : (
                                    submittedLinks.map((link) => (
                                        <tr
                                            key={link.id}
                                            className="border-b border-gray-200 hover:bg-blue-50 transition-colors"
                                        >
                                            <td className="py-4 px-4 text-center whitespace-nowrap">
                                                <button
                                                    onClick={() =>
                                                        handleView(link.sl_link)
                                                    }
                                                    className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded transition duration-200 shadow-sm"
                                                >
                                                    {t("VW")}
                                                </button>
                                            </td>
                                            <td className="py-4 px-4 text-center whitespace-nowrap">
                                                <button
                                                    onClick={() =>
                                                        handleMakeItFeaturesListing(
                                                            link.id
                                                        )
                                                    }
                                                    className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded transition duration-200 shadow-sm"
                                                >
                                                    {t("MFL")}
                                                </button>
                                            </td>
                                            <td className="py-4 px-4 text-center whitespace-nowrap font-medium">
                                                {getTypeText(link.sl_type)}
                                            </td>
                                            <td className="py-4 px-4 text-center whitespace-nowrap">
                                                {link.sl_title}
                                            </td>
                                            <td className="py-4 px-4 text-center whitespace-nowrap">
                                                <span
                                                    className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${getStatusText(
                                                        link.sl_status
                                                    ) === t("APPROVED")
                                                        ? "bg-green-100 text-green-800 border border-green-200"
                                                        : getStatusText(
                                                            link.sl_status
                                                        ) === t(
                                                            "PENDING"
                                                        )
                                                            ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
                                                            : "bg-red-100 text-red-800 border border-red-200"
                                                        }`}
                                                >
                                                    {getStatusText(
                                                        link.sl_status
                                                    )}
                                                </span>
                                            </td>
                                            <td className="py-4 px-4 text-center whitespace-nowrap">
                                                <a
                                                    href={`https://t.me/${link.sl_link}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                                                >
                                                    {link.sl_link}
                                                </a>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {showViewPopup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-lg w-full text-center relative max-h-[90vh] overflow-y-auto">
                        <button
                            className="absolute top-2 right-3 text-gray-400 hover:text-gray-700 text-2xl"
                            onClick={handleCancelView}
                        >
                            &times;
                        </button>
                        <h2 className="text-xl font-bold mb-4 text-blue-700">
                            {t("LINK_DETAILS")}
                        </h2>
                        {showEditForm ? (
                            <form
                                onSubmit={handleEditSubmit}
                                className="space-y-4 text-left"
                            >
                                <div>
                                    <label className="block font-medium">
                                        {t("TYPE")}
                                    </label>
                                    <select
                                        value={editForm?.sl_type || "0"}
                                        onChange={(e) =>
                                            handleEditFormChange(
                                                "sl_type",
                                                e.target.value
                                            )
                                        }
                                        className="w-full border rounded px-3 py-2"
                                    >
                                        <option value="0">{t("GROUP")}</option>
                                        <option value="1">
                                            {t("CHANNEL")}
                                        </option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block font-medium">
                                        {t("TITLE")}
                                    </label>
                                    <input
                                        type="text"
                                        value={editForm?.sl_title || ""}
                                        onChange={(e) =>
                                            handleEditFormChange(
                                                "sl_title",
                                                e.target.value
                                            )
                                        }
                                        className="w-full border rounded px-3 py-2"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block font-medium">
                                        {t("DESCRIPTION")}
                                    </label>
                                    <textarea
                                        value={editForm?.sl_description || ""}
                                        onChange={(e) =>
                                            handleEditFormChange(
                                                "sl_description",
                                                e.target.value
                                            )
                                        }
                                        className="w-full border rounded px-3 py-2"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block font-medium">
                                        {t("LINK")}
                                    </label>
                                    <input
                                        type="text"
                                        value={editForm?.sl_link || ""}
                                        onChange={(e) =>
                                            handleEditFormChange(
                                                "sl_link",
                                                e.target.value
                                            )
                                        }
                                        className="w-full border rounded px-3 py-2"
                                        required
                                    />
                                </div>
                                {[1, 2, 3, 4, 5, 6].map((i) => (
                                    <div key={i}>
                                        <label className="block font-medium">
                                            {t("TAG")}
                                            {i}
                                        </label>
                                        <input
                                            type="text"
                                            value={
                                                editForm?.[
                                                `sl_tag_${i}` as keyof ViewLinkDetails
                                                ] || ""
                                            }
                                            onChange={(e) =>
                                                handleEditFormChange(
                                                    `sl_tag_${i}`,
                                                    e.target.value
                                                )
                                            }
                                            className="w-full border rounded px-3 py-2"
                                        />
                                    </div>
                                ))}
                                {editErrors.form && (
                                    <div className="text-red-600 text-sm">
                                        {editErrors.form}
                                    </div>
                                )}
                                <div className="flex justify-between mt-4">
                                    <button
                                        type="button"
                                        className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded font-semibold"
                                        onClick={() => setShowEditForm(false)}
                                        disabled={editLoading}
                                    >
                                        {t("CANCEL")}
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold"
                                        disabled={editLoading}
                                    >
                                        {editLoading
                                            ? t("SAVING") + "..."
                                            : t("SAVE")}
                                    </button>
                                </div>
                            </form>
                        ) : viewLoading ? (
                            <div className="py-8 text-gray-500">
                                {t("LOADING")}
                            </div>
                        ) : viewDetails ? (
                            <div className="bg-blue-100 p-2 rounded">
                                <table className="w-full border border-blue-200 text-left mb-4">
                                    <tbody>
                                        <tr>
                                            <td className="border border-blue-200 px-2 py-1">
                                                {t("TYPE")}
                                            </td>
                                            <td className="border border-blue-200 px-2 py-1">
                                                {viewDetails.sl_type === "1"
                                                    ? t("CHANNEL")
                                                    : t("GROUP")}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="border border-blue-200 px-2 py-1">
                                                {t("TITLE")}
                                            </td>
                                            <td className="border border-blue-200 px-2 py-1">
                                                {viewDetails.sl_title}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="border border-blue-200 px-2 py-1">
                                                {t("DESCRIPTION")}
                                            </td>
                                            <td className="border border-blue-200 px-2 py-1">
                                                {viewDetails.sl_description}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="border border-blue-200 px-2 py-1">
                                                {t("LINK")}
                                            </td>
                                            <td className="border border-blue-200 px-2 py-1">
                                                <a
                                                    href={`https://t.me/${viewDetails.sl_link}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:underline"
                                                >
                                                    {viewDetails.sl_link}
                                                </a>
                                            </td>
                                        </tr>
                                        {[1, 2, 3, 4, 5, 6].map((i) => (
                                            <tr key={i}>
                                                <td className="border border-blue-200 px-2 py-1">{`${t(
                                                    "TAG"
                                                )}${i}`}</td>
                                                <td className="border border-blue-200 px-2 py-1">
                                                    {viewDetails?.[
                                                        `sl_tag_${i}` as keyof ViewLinkDetails
                                                    ] || ""}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="flex justify-between mt-4">
                                    <button
                                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-semibold"
                                        onClick={handleEditClick}
                                    >
                                        {t("EDIT")}
                                    </button>
                                    <button
                                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded font-semibold"
                                        onClick={handleDelete}
                                        disabled={viewLoading}
                                    >
                                        {t("DELETE")}
                                    </button>
                                    <button
                                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-2 rounded font-semibold"
                                        onClick={handleCancelView}
                                    >
                                        {t("CANCEL")}
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="py-8 text-gray-500">
                                {t("NO_DETAILS")}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default MySubmittedLinks;
