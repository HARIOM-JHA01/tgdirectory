import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { useNavigate } from "react-router-dom";

interface TicketData {
    id: string;
    ticket: string;
    is_admin: string;
    title: string;
    status: string;
    price: string;
    offer_price: string;
    b4u_credit: string | null;
    created_at: string;
    modified_date: string;
    toncoin: string;
}

const BuyTickets: React.FC = () => {
    const navigate = useNavigate();
    const [tickets, setTickets] = useState<TicketData[]>([]);
    // const [availableTickets, setAvailableTickets] = useState<number>(0);
    const [buyTicketStatus, setBuyTicketStatus] = useState<string>("1");

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const res = await fetch(
                    "https://telegramdirectory.org/api/buy-ticket-new"
                );
                const data = await res.json();
                setTickets(data.data?.listArr || []);
                // let avail = data.data?.available_ticket;
                // if (typeof avail === "string") avail = parseInt(avail, 10);
                // setAvailableTickets(
                //     typeof avail === "number" && !isNaN(avail) ? avail : 0
                // );
                setBuyTicketStatus(data.data?.byticketstatus ?? "1");
            } catch (e) {
                setTickets([]);
                // setAvailableTickets(0);
                setBuyTicketStatus("0");
            }
        };
        fetchTickets();
    }, []);

    const handleTicketHistory = () => {
        navigate("/ticket-history");
    };

    const handleBuyNow = (ticketId: string, amount: string, noOfTicket: string) => {
        navigate(
            `/ticket-quota?ticketId=${encodeURIComponent(
                ticketId
            )}&amount=${encodeURIComponent(amount)}&noOfTicket=${encodeURIComponent(noOfTicket)}`
        );
        console.log(`Buying ticket id ${ticketId} for ${amount} USDT`);
    };

    // Prepare ticket groups for table layout
    const diamond = tickets.find(
        (t) => t.title.trim().toLowerCase() === "diamond"
    );
    const platinum = tickets.find(
        (t) => t.title.trim().toLowerCase() === "platinum"
    );
    const pDiamond = tickets.find(
        (t) => t.title.trim().toLowerCase() === "p diamond"
    );
    const pPlatinum = tickets.find(
        (t) => t.title.trim().toLowerCase() === "p platinum"
    );

    return (
        <Layout bgColor="bg-blue-50">
            <div className="px-4 py-4">
                {/* Available Tickets Banner */}
                {/* <div className="bg-green-500 text-white p-3 rounded-md mb-4 text-center font-medium">
                    You have {availableTickets} Available Tickets (Quota) for
                    feature listing
                </div> */}

                {/* Promotion Banner */}
                <div className="bg-gradient-to-r from-purple-500 to-fuchsia-400 text-white p-4 rounded-md mb-4 flex items-center">
                    <div className="bg-white rounded-full p-1 mr-3">
                        <svg
                            className="w-8 h-8 text-purple-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    </div>
                    <div>
                        <span className="text-2xl font-bold">50%</span> off for
                        Telegram Premium
                        <div className="text-sm">join our Channel</div>
                    </div>
                </div>

                {/* Check Now Banner */}
                <div className="bg-white p-3 rounded-md mb-4 flex items-center justify-between">
                    <div className="font-medium">Check</div>
                    <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm font-medium">
                        Buy Now
                    </button>
                    <div className="font-medium">Is Open for Big Discount</div>
                </div>

                {/* Ticket Table Design */}
                {buyTicketStatus === "0" && (
                    <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4 text-center font-medium">
                        Ticket purchase is currently disabled.
                    </div>
                )}
                <div className="overflow-hidden rounded-md max-w-md mx-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr>
                                <th className="bg-cyan-500 text-white p-3 border border-cyan-600 text-center">
                                    Tickets
                                </th>
                                <th className="bg-cyan-500 text-white p-3 border border-cyan-600 text-center">
                                    Diamond
                                </th>
                                <th className="bg-cyan-500 text-white p-3 border border-cyan-600 text-center">
                                    Platinum
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* First row: Ticket quantity */}
                            <tr>
                                <td className="bg-cyan-500 text-white p-3 border border-cyan-600 text-center font-medium">
                                    Tickets
                                </td>
                                <td className="bg-white p-3 border border-gray-200 text-center">
                                    {diamond?.ticket || "-"}
                                </td>
                                <td className="bg-white p-3 border border-gray-200 text-center">
                                    {platinum?.ticket || "-"}
                                </td>
                            </tr>
                            {/* Second row: USDT (price) */}
                            <tr>
                                <td className="bg-cyan-500 text-white p-3 border border-cyan-600 text-center font-medium">
                                    USDT
                                </td>
                                <td className="bg-fuchsia-400 text-white p-3 border border-fuchsia-500 text-center font-bold">
                                    {diamond?.toncoin || "0"}
                                </td>
                                <td className="bg-fuchsia-400 text-white p-3 border border-fuchsia-500 text-center font-bold">
                                    {platinum?.toncoin || "0"}
                                </td>
                            </tr>
                            {/* Third row: Buy Now buttons */}
                            <tr>
                                <td className="bg-cyan-500 text-white p-3 border border-cyan-600 text-center font-medium">
                                    <svg
                                        className="w-8 h-8 text-white mx-auto"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                </td>
                                <td className="bg-white p-3 border border-gray-200 text-center">
                                    <button
                                        onClick={() =>
                                            handleBuyNow(
                                                diamond?.id || "",
                                                diamond?.toncoin || "0",
                                                diamond?.ticket || ""
                                            )
                                        }
                                        className={`px-4 py-2 rounded font-medium transition-colors w-full 
                                            ${
                                                !diamond ||
                                                buyTicketStatus === "0"
                                                    ? "bg-gray-400 text-white cursor-not-allowed"
                                                    : "bg-green-500 hover:bg-green-600 text-white cursor-pointer"
                                            }`}
                                        disabled={
                                            !diamond || buyTicketStatus === "0"
                                        }
                                    >
                                        Buy Now
                                    </button>
                                </td>
                                <td className="bg-white p-3 border border-gray-200 text-center">
                                    <button
                                        onClick={() =>
                                            handleBuyNow(
                                                platinum?.id || "",
                                                platinum?.toncoin || "0",
                                                platinum?.ticket || ""
                                            )
                                        }
                                        className={`px-4 py-2 rounded font-medium transition-colors w-full 
                                            ${
                                                !platinum ||
                                                buyTicketStatus === "0"
                                                    ? "bg-gray-400 text-white cursor-not-allowed"
                                                    : "bg-green-500 hover:bg-green-600 text-white cursor-pointer"
                                            }`}
                                        disabled={
                                            !platinum || buyTicketStatus === "0"
                                        }
                                    >
                                        Buy Now
                                    </button>
                                </td>
                            </tr>
                            {/* Repeat header for P Diamond/P Platinum */}
                            <tr>
                                <th className="bg-cyan-500 text-white p-3 border border-cyan-600 text-center">
                                    Tickets
                                </th>
                                <th className="bg-cyan-500 text-white p-3 border border-cyan-600 text-center">
                                    P Diamond
                                </th>
                                <th className="bg-cyan-500 text-white p-3 border border-cyan-600 text-center">
                                    P Platinum
                                </th>
                            </tr>
                            {/* Ticket quantity for P Diamond/P Platinum */}
                            <tr>
                                <td className="bg-cyan-500 text-white p-3 border border-cyan-600 text-center font-medium">
                                    Tickets
                                </td>
                                <td className="bg-white p-3 border border-gray-200 text-center">
                                    {pDiamond?.ticket || "-"}
                                </td>
                                <td className="bg-white p-3 border border-gray-200 text-center">
                                    {pPlatinum?.ticket || "-"}
                                </td>
                            </tr>
                            {/* USDT row for P Diamond/P Platinum (show toncoin) */}
                            <tr>
                                <td className="bg-cyan-500 text-white p-3 border border-cyan-600 text-center font-medium">
                                    USDT
                                </td>
                                <td className="bg-fuchsia-400 text-white p-3 border border-fuchsia-500 text-center font-bold">
                                    {pDiamond?.toncoin || "-"}
                                </td>
                                <td className="bg-fuchsia-400 text-white p-3 border border-fuchsia-500 text-center font-bold">
                                    {pPlatinum?.toncoin || "-"}
                                </td>
                            </tr>
                            {/* Buy Now buttons for P Diamond/P Platinum */}
                            <tr>
                                <td className="bg-cyan-500 text-white p-3 border border-cyan-600 text-center">
                                    <svg
                                        className="w-8 h-8 text-white mx-auto"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            fill="#fff"
                                        />
                                        <rect
                                            x="9"
                                            y="11"
                                            width="6"
                                            height="2"
                                            rx="1"
                                            fill="#00bcd4"
                                        />
                                    </svg>
                                </td>
                                <td className="bg-white p-3 border border-gray-200 text-center">
                                    <button
                                        onClick={() =>
                                            handleBuyNow(
                                                pDiamond?.id || "",
                                                pDiamond?.toncoin || "0",
                                                pDiamond?.ticket || ""
                                            )
                                        }
                                        className={`px-4 py-2 rounded font-medium transition-colors w-full 
                                            ${
                                                !pDiamond ||
                                                buyTicketStatus === "0"
                                                    ? "bg-gray-400 text-white cursor-not-allowed"
                                                    : "bg-green-500 hover:bg-green-600 text-white cursor-pointer"
                                            }`}
                                        disabled={
                                            !pDiamond || buyTicketStatus === "0"
                                        }
                                    >
                                        Buy Now
                                    </button>
                                </td>
                                <td className="bg-white p-3 border border-gray-200 text-center">
                                    <button
                                        onClick={() =>
                                            handleBuyNow(
                                                pPlatinum?.id || "",
                                                pPlatinum?.toncoin || "0",
                                                pPlatinum?.ticket || ""
                                            )
                                        }
                                        className={`px-4 py-2 rounded font-medium transition-colors w-full 
                                            ${
                                                !pPlatinum ||
                                                buyTicketStatus === "0"
                                                    ? "bg-gray-400 text-white cursor-not-allowed"
                                                    : "bg-green-500 hover:bg-green-600 text-white cursor-pointer"
                                            }`}
                                        disabled={
                                            !pPlatinum ||
                                            buyTicketStatus === "0"
                                        }
                                    >
                                        Buy Now
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {/* Ticket History Button */}
                <div className="mt-6 flex justify-center">
                    <button
                        onClick={handleTicketHistory}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2.5 px-6 rounded-md transition-colors"
                    >
                        View Ticket History
                    </button>
                </div>
            </div>
        </Layout>
    );
};

export default BuyTickets;
