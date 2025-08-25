import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { useNavigate } from "react-router-dom";
import { telegramId } from "../utils/telegramUtils";

interface TicketHistoryItem {
    id: string;
    title: string;
    amount: string | null;
    ticket: string;
    payment_type: string;
    transcation_date: string;
    status: string;
    ticket_by_admin?: string;
}

const paymentTypeMap: Record<string, string> = {
    "1": "Toncoin",
    "2": "Paypal",
    "3": "Admin",
};

const statusMap: Record<string, string> = {
    "1": "Success",
    "0": "Pending",
};

const TicketHistory: React.FC = () => {
    const navigate = useNavigate();
    const [history, setHistory] = useState<TicketHistoryItem[]>([]);
    const [availableTickets, setAvailableTickets] = useState<number>(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            setLoading(true);
            try {
                const res = await fetch(
                    `/api/ticket-history/?user_id=${telegramId}`,
                    {
                        credentials: "include",
                        headers: {
                            Cookie: "ci_session_frontend=htisddc3dkt348sf54k7imou8gets6vm",
                        },
                    }
                );
                console.log("Response ", res);
                const text = await res.text();
                // Remove any leading non-JSON characters (e.g., username prefix)
                const jsonStart = text.indexOf("{");
                const cleanText =
                    jsonStart !== -1 ? text.slice(jsonStart) : text;
                const data = JSON.parse(cleanText);
                // Fix: available_ticket may be a string, convert to number
                setHistory(data.success?.data?.listArr || []);
                let avail = data.success?.data?.available_ticket;
                if (typeof avail === "string") avail = parseInt(avail, 10);
                setAvailableTickets(
                    typeof avail === "number" && !isNaN(avail) ? avail : 0
                );
                console.log(`Available tickets: ${avail}`);
            } catch {
                setHistory([]);
                setAvailableTickets(0);
            }
            setLoading(false);
        };
        fetchHistory();
    }, []);

    const handleBuyMoreTicket = () => {
        navigate("/buy-tickets");
    };

    return (
        <Layout bgColor="bg-blue-50">
            <div className="px-4 py-6">
                {/* Available Tickets Banner */}
                <div className="mb-6">
                    <div className="bg-green-500 text-white p-3 rounded-md text-center font-medium mx-auto max-w-xl">
                        You have {availableTickets} Available Tickets (Quota)
                        for feature listing
                    </div>
                </div>

                {/* Buy More Ticket Button */}
                <div className="mb-6 flex justify-center">
                    <button
                        onClick={handleBuyMoreTicket}
                        className="bg-green-500 hover:bg-green-600 text-white font-medium py-2.5 px-6 rounded-md transition-colors"
                    >
                        Buy more ticket
                    </button>
                </div>

                {/* Ticket Purchase History Title */}
                <div className="mb-6 text-center">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Ticket Purchased history
                    </h1>
                </div>

                {/* Ticket History Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse">
                        <thead>
                            <tr>
                                <th className="bg-cyan-500 text-white p-3 border border-cyan-600 text-center">
                                    Pkg title
                                </th>
                                <th className="bg-cyan-500 text-white p-3 border border-cyan-600 text-center">
                                    Price
                                </th>
                                <th className="bg-cyan-500 text-white p-3 border border-cyan-600 text-center">
                                    Tkt qty
                                </th>
                                <th className="bg-cyan-500 text-white p-3 border border-cyan-600 text-center">
                                    Payment mode
                                </th>
                                <th className="bg-cyan-500 text-white p-3 border border-cyan-600 text-center">
                                    Date
                                </th>
                                <th className="bg-cyan-500 text-white p-3 border border-cyan-600 text-center">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="text-center py-8 text-gray-500"
                                    >
                                        Loading...
                                    </td>
                                </tr>
                            ) : history.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="text-center py-8 text-gray-500"
                                    >
                                        No ticket history found.
                                    </td>
                                </tr>
                            ) : (
                                history.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="hover:bg-blue-50"
                                    >
                                        <td className="p-3 border border-gray-300 text-center bg-white">
                                            {item.title}
                                        </td>
                                        <td className="p-3 border border-gray-300 text-center bg-white">
                                            {item.amount
                                                ? item.amount
                                                : "Reward"}
                                        </td>
                                        <td className="p-3 border border-gray-300 text-center bg-white">
                                            {item.ticket !== "0"
                                                ? item.ticket
                                                : item.ticket_by_admin || "-"}
                                        </td>
                                        <td className="p-3 border border-gray-300 text-center bg-white">
                                            {paymentTypeMap[
                                                item.payment_type
                                            ] || item.payment_type}
                                        </td>
                                        <td className="p-3 border border-gray-300 text-center bg-white">
                                            {new Date(item.transcation_date).toLocaleDateString("en-GB")}
                                        </td>
                                        <td className="p-3 border border-gray-300 text-center bg-white">
                                            <span
                                                className={`px-2 py-1 rounded-full text-white text-sm font-medium ${item.status === "1"
                                                        ? "bg-green-500"
                                                        : item.status === "0"
                                                            ? "bg-yellow-500"
                                                            : "bg-red-500"
                                                    }`}
                                            >
                                                {statusMap[item.status] ||
                                                    (item.status === "2"
                                                        ? "Rejected"
                                                        : item.status)}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
};

export default TicketHistory;
