import React from 'react';
import Layout from '../components/layout/Layout';
import { useNavigate } from 'react-router-dom';
import { ticketHistory, availableTickets } from '../data/data';

const TicketHistory: React.FC = () => {
  const navigate = useNavigate();

  const handleBuyMoreTicket = () => {
    navigate('/buy-tickets');
  };

  return (
    <Layout bgColor="bg-blue-50">
      <div className="px-4 py-6">
        {/* Available Tickets Banner */}
        <div className="mb-6">
          <div className="bg-green-500 text-white p-3 rounded-md text-center font-medium mx-auto max-w-xl">
            You have {availableTickets} Available Tickets (Quota) for feature listing
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
          <h1 className="text-2xl font-bold text-gray-800">Ticket Purchased history</h1>
        </div>

        {/* Ticket History Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr>
                <th className="bg-cyan-500 text-white p-3 border border-cyan-600 text-center">Pkg title</th>
                <th className="bg-cyan-500 text-white p-3 border border-cyan-600 text-center">Price</th>
                <th className="bg-cyan-500 text-white p-3 border border-cyan-600 text-center">Tkt qty</th>
                <th className="bg-cyan-500 text-white p-3 border border-cyan-600 text-center">Payment mode</th>
                <th className="bg-cyan-500 text-white p-3 border border-cyan-600 text-center">Date</th>
                <th className="bg-cyan-500 text-white p-3 border border-cyan-600 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {ticketHistory.map((item) => (
                <tr key={item.id} className="hover:bg-blue-50">
                  <td className="p-3 border border-gray-300 text-center bg-white">{item.packageTitle}</td>
                  <td className="p-3 border border-gray-300 text-center bg-white">{item.price}</td>
                  <td className="p-3 border border-gray-300 text-center bg-white">{item.ticketQuantity}</td>
                  <td className="p-3 border border-gray-300 text-center bg-white">{item.paymentMode}</td>
                  <td className="p-3 border border-gray-300 text-center bg-white">{item.date}</td>
                  <td className="p-3 border border-gray-300 text-center bg-white">{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default TicketHistory;