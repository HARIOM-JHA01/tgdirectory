import { useState } from 'react';
import walletTransfer from "../assets/wallet-transfer.jpg"
import Layout from '../components/layout/Layout';

const TicketQuota = () => {
    const [country, setCountry] = useState('');
    const [email, setEmail] = useState('');
    const [transactionCode, setTransactionCode] = useState('');

    return (
        <Layout>
            <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
                <div className="bg-white shadow-lg p-8 rounded-md w-full max-w-3xl">
                    <h2 className="text-center text-2xl font-bold text-blue-600 mb-6">
                        Stock Up Your Tickets
                    </h2>
                    <p className="text-center text-gray-700 mb-6">
                        You selected to stock up your ticket by <span className="font-semibold">200</span> for <span className="font-semibold">1500 Toncoin</span>
                    </p>

                    <div className="flex justify-center mb-8">
                        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                            Select Your Payment Method to Proceed
                        </button>
                    </div>

                    <form className="grid md:grid-cols-2 gap-8">
                        {/* Left section */}
                        <div>
                            <label className="block font-semibold mb-2">Toncoin Wallet</label>
                            <label className="block mb-2 font-semibold">Submit Transaction Details</label>

                            <select
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Reconfirm Your Country</option>
                                <option value="India">India</option>
                                <option value="USA">USA</option>
                                <option value="UK">UK</option>
                            </select>

                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:ring-2 focus:ring-blue-500"
                            />

                            <input
                                type="text"
                                placeholder="Input Transaction Code"
                                value={transactionCode}
                                onChange={(e) => setTransactionCode(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:ring-2 focus:ring-blue-500"
                            />

                            <input
                                type="text"
                                value="1500 Toncoin"
                                readOnly
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 bg-gray-100 text-gray-700"
                            />

                            <button type="submit" className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition w-full">
                                Submit
                            </button>
                        </div>

                        {/* Right section - QR & Wallet */}
                        <div className="text-center">
                            <h3 className="font-semibold text-lg mb-4">Scan QR Code</h3>
                            <img
                                src={walletTransfer}
                                alt="QR Code"
                                className="mx-auto border border-gray-300 rounded-lg mb-6"
                            />
                            <p className="text-sm font-medium break-all bg-gray-100 p-4 rounded-lg">
                                Copy Wallet Address<br />
                                <span className="text-blue-600">UQBHQOTb9cpVQ7I3Gml2f6eyV5JU97j_6dot0gJ52dcrg8ud</span>
                            </p>
                        </div>
                    </form>

                    <p className="text-center text-sm mt-8">
                        Make deposit here <a href="https://paypal.me/Bluemarketer" className="text-blue-600 underline">paypal.me/Bluemarketer</a>
                    </p>
                </div>
            </div>
        </Layout>
    );
};

export default TicketQuota;
