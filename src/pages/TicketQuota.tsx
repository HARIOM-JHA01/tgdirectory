import { useState, useEffect, useRef } from "react";
import walletTransfer from "../assets/wallet-transfer.jpg";
import Layout from "../components/layout/Layout";
import { useLocation, useNavigate } from "react-router-dom";
import WebApp from "@twa-dev/sdk";

const TicketQuota = () => {
    interface User {
        id?: string;
        first_name?: string;
        last_name?: string;
        username?: string;
    }
    interface Country {
        country_id: string;
        country_name: string;
    }

    const dataRef = useRef<{ user?: User }>({});
    useEffect(() => {
        WebApp.ready();
        dataRef.current = {
            user: WebApp.initDataUnsafe.user
                ? {
                    ...WebApp.initDataUnsafe.user,
                    id: WebApp.initDataUnsafe.user.id?.toString(),
                }
                : undefined,
        };
    }, []);

    const [country, setCountry] = useState("");
    const [countries, setCountries] = useState<Country[]>([]);
    const [transactionCode, setTransactionCode] = useState("");
    const [paypalEmailId, setPaypalEmailId] = useState("");
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [userId, setUserId] = useState<string | null>(null);
    const [isUserIdLoading, setIsUserIdLoading] = useState(true);
    const router = useNavigate();

    useEffect(() => {
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
    }, []);

    const user = (dataRef.current?.user ?? {}) as User;
    const telegramId = user?.id || "";

    useEffect(() => {
        const fetchUserId = async () => {
            setIsUserIdLoading(true);
            try {
                const formData = new FormData();
                formData.append("telegram_id", telegramId || "");
                const res = await fetch("/api/get-user-id", {
                    method: "POST",
                    body: formData,
                    credentials: "include",
                });
                const responseText = await res.text();
                try {
                    const data = JSON.parse(responseText);
                    if (data.status) {
                        setUserId(data.user_id);
                    }
                } catch {
                    // If response is not JSON, assume it's the user ID directly
                    if (responseText && !isNaN(Number(responseText))) {
                        setUserId(responseText);
                    } else {
                        setUserId(null);  // Invalid response
                    }
                }
            } catch {
                setUserId(null);
            } finally {
                setIsUserIdLoading(false);
            }
        };
        fetchUserId();
        const intervalId = setInterval(() => {
            if (!userId && telegramId) {
                fetchUserId();
            } else if (userId) {
                clearInterval(intervalId);
            }
        }, 3000);
        return () => clearInterval(intervalId);
    }, [telegramId, userId]);

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const ticketId = params.get("ticketId");
    const amount = params.get("amount");
    const noOfTicket = params.get("noOfTicket");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSuccessMsg("");
        setErrorMsg("");
        try {
            const formData = new FormData();
            formData.append("user_id", userId || "");
            formData.append("paypal_email_id", paypalEmailId);
            formData.append("first_name", transactionCode);
            formData.append("payment_type", "1");
            formData.append("country_id", country);
            formData.append("telegram_id", telegramId);
            formData.append("id", ticketId || "");
            formData.append("amount", amount || "");
            const res = await fetch("/api/ticket-quota-payment", {
                method: "POST",
                body: formData,
                credentials: "include",
            });
            const data = await res.json();
            if (data.status && data.success?.success) {
                setSuccessMsg(data.success.success);
                setErrorMsg("");
                setCountry("");
                setTransactionCode("");
                setPaypalEmailId("");
                setTimeout(() => {
                    router("/ticket-history");
                }, 5000);
            } else {
                setSuccessMsg("");
                setErrorMsg("Failed to submit ticket quota request.");
            }
        } catch {
            setSuccessMsg("");
            setErrorMsg("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
                <div className="bg-white shadow-lg p-8 rounded-md w-full max-w-3xl">
                    <h2 className="text-center text-2xl font-bold text-blue-600 mb-6">
                        Stock Up Your Tickets
                    </h2>
                    <p className="text-center text-gray-700 mb-6">
                        You selected to stock up your ticket by{" "}
                        <span className="font-semibold">{noOfTicket}</span> for{" "}
                        <span className="font-semibold">
                            {amount} USDT TRC20
                        </span>
                    </p>
                    <div className="flex justify-center mb-8">
                        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                            Scan QR code or copy wallet address to make payment
                            and submit transaction details below
                        </button>
                    </div>
                    <form
                        className="grid md:grid-cols-2 gap-8"
                        onSubmit={handleSubmit}
                    >
                        <div className="text-center">
                            <h3 className="font-semibold text-lg mb-4">
                                Scan QR Code
                            </h3>
                            <img
                                src={walletTransfer}
                                alt="QR Code"
                                className="mx-auto border border-gray-300 rounded-lg mb-6"
                            />
                            <p className="text-sm font-medium break-all bg-gray-100 p-4 rounded-lg">
                                Copy Wallet Address
                                <br />
                                <span
                                    className="text-blue-600"
                                    onClick={() =>
                                        navigator.clipboard.writeText(
                                            "TK2TMn99SBCrdbZpSef7rFE3vTccvR6dCz"
                                        )
                                    }
                                >
                                    TK2TMn99SBCrdbZpSef7rFE3vTccvR6dCz
                                </span>
                            </p>
                        </div>
                        <div>
                            <label className="block mb-2 font-semibold text-center">
                                Submit Transaction Details
                            </label>
                            {/* <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded">
                                <div className="font-semibold mb-2 text-blue-700">
                                    Preview Submission {isUserIdLoading && "(Loading User ID...)"}
                                </div>
                                <ul className="text-sm text-gray-700 space-y-1">
                                    <li>
                                        <span className="font-medium">User ID:</span>{" "}
                                        {isUserIdLoading ? (
                                            <span className="text-blue-500 inline-flex items-center">
                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Loading...
                                            </span>
                                        ) : userId ? (
                                            userId
                                        ) : (
                                            <span className="text-red-500">Failed to load</span>
                                        )}
                                    </li>
                                    <li><span className="font-medium">Wallet Code:</span> {paypalEmailId}</li>
                                    <li><span className="font-medium">Transaction Code:</span> {transactionCode}</li>
                                    <li><span className="font-medium">Country ID:</span> {country}</li>
                                    <li><span className="font-medium">Ticket ID:</span> {ticketId}</li>
                                    <li><span className="font-medium">Amount:</span> {amount} USDT TRC20</li>
                                </ul>
                            </div> */}
                            <select
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="">Reconfirm Your Country</option>
                                {countries
                                    .filter((c) => c.country_id !== "248")
                                    .map((c) => (
                                        <option
                                            key={c.country_id}
                                            value={c.country_id}
                                        >
                                            {c.country_name}
                                        </option>
                                    ))}
                            </select>
                            <input
                                type="text"
                                placeholder="Enter your wallet address"
                                value={paypalEmailId}
                                onChange={e => setPaypalEmailId(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Enter Transaction Code"
                                value={transactionCode}
                                onChange={(e) =>
                                    setTransactionCode(e.target.value)
                                }
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <input
                                type="text"
                                value={`${amount} USDT TRC20`}
                                readOnly
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 bg-gray-100 text-gray-700"
                            />
                            <button
                                type="submit"
                                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition w-full"
                                disabled={loading || isUserIdLoading || !userId}
                            >
                                {loading ? "Submitting..." : isUserIdLoading ? "Loading User ID..." : "Submit"}
                            </button>
                            {successMsg && (
                                <div className="mt-4 text-green-600 text-center font-medium">
                                    {successMsg}
                                </div>
                            )}
                            {errorMsg && (
                                <div className="mt-4 text-red-600 text-center font-medium">
                                    {errorMsg}
                                </div>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default TicketQuota;
