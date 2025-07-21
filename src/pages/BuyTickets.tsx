import React from 'react';
import Layout from '../components/layout/Layout';
import { useNavigate } from 'react-router-dom';
import { tickets, availableTickets } from '../data/data';

const BuyTickets: React.FC = () => {
  const navigate = useNavigate();

  const handleTicketHistory = () => {
    navigate('/ticket-history');
  };

  const handleBuyNow = (ticketType: string, price: number) => {
    navigate('/ticket-quota');
    console.log(`Buying ${ticketType} ticket for ${price} USDT`);
  };

  return (
    <Layout bgColor="bg-blue-50">
      <div className="px-4 py-4">
        {/* Available Tickets Banner */}
        <div className="bg-green-500 text-white p-3 rounded-md mb-4 text-center font-medium">
          You have {availableTickets} Available Tickets (Quota) for feature listing
        </div>

        {/* Promotion Banner */}
        <div className="bg-gradient-to-r from-purple-500 to-fuchsia-400 text-white p-4 rounded-md mb-4 flex items-center">
          <div className="bg-white rounded-full p-1 mr-3">
            <svg className="w-8 h-8 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <div>
            <span className="text-2xl font-bold">50%</span> off for Telegram Premium
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

        {/* Ticket Table */}
        <div className="overflow-hidden rounded-md">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="bg-cyan-500 text-white p-3 border border-cyan-600 text-center w-1/3">Tickets</th>
                <th className="bg-cyan-500 text-white p-3 border border-cyan-600 text-center w-1/3">Diamond</th>
                <th className="bg-cyan-500 text-white p-3 border border-cyan-600 text-center w-1/3">Platinum</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="bg-cyan-500 text-white p-3 border border-cyan-600 text-center font-medium">
                  Tickets
                </td>
                <td className="bg-white p-3 border border-gray-200 text-center">
                  {tickets[0].quantity}
                </td>
                <td className="bg-white p-3 border border-gray-200 text-center">
                  {tickets[1].quantity}
                </td>
              </tr>
              <tr>
                <td className="bg-cyan-500 text-white p-3 border border-cyan-600 text-center font-medium">
                  USDT
                </td>
                <td className="bg-fuchsia-400 text-white p-3 border border-fuchsia-500 text-center font-bold">
                  {tickets[0].price}
                </td>
                <td className="bg-fuchsia-400 text-white p-3 border border-fuchsia-500 text-center font-bold">
                  {tickets[1].price}
                </td>
              </tr>
              <tr>
                <td className="bg-cyan-500 text-white p-3 border border-cyan-600 text-center font-medium">
                  <svg className="w-8 h-8 text-white mx-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </td>
                <td className="bg-white p-3 border border-gray-200 text-center">
                  <button
                    onClick={() => handleBuyNow('Diamond Star', tickets[0].price)}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded font-medium transition-colors"
                  >
                    Buy Now
                  </button>
                </td>
                <td className="bg-white p-3 border border-gray-200 text-center">
                  <button
                    onClick={() => handleBuyNow('Platinum Star', tickets[1].price)}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded font-medium transition-colors"
                  >
                    Buy Now
                  </button>
                </td>
              </tr>
              <tr>
                <td className="bg-cyan-500 text-white p-3 border border-cyan-600 text-center font-medium">
                  USDT
                </td>
                <td className="bg-fuchsia-400 text-white p-3 border border-fuchsia-500 text-center font-bold">
                  {tickets[2].price}
                </td>
                <td className="bg-fuchsia-400 text-white p-3 border border-fuchsia-500 text-center font-bold">
                  {tickets[3].price}
                </td>
              </tr>
              <tr>
                <td className="bg-cyan-500 text-white p-3 border border-cyan-600 text-center">
                  <svg className="w-8 h-8 text-white mx-auto" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm4 0h-2v-6h2v6zm.5-13.5l-1.5 1.5-1.5-1.5L9 5.5 7.5 4 6 5.5 7.5 7 6 8.5 7.5 10l1.5-1.5L10.5 10 12 8.5 13.5 10l1.5-1.5L16.5 7 15 5.5l1.5-1.5L15 2.5l-1.5 1.5-1.5-1.5-1.5 1.5z" />
                  </svg>
                </td>
                <td className="bg-white p-3 border border-gray-200 text-center">
                  <button
                    onClick={() => handleBuyNow('Diamond Telegram', tickets[2].price)}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded font-medium transition-colors"
                  >
                    Buy Now
                  </button>
                </td>
                <td className="bg-white p-3 border border-gray-200 text-center">
                  <button
                    onClick={() => handleBuyNow('Platinum Telegram', tickets[3].price)}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded font-medium transition-colors"
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