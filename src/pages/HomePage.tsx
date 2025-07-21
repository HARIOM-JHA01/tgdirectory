import React, { useEffect } from 'react';
import WebApp from '@twa-dev/sdk';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import BannerCarousel from '../components/TopBannerCarousel';
import tgdcBanner from '../assets/tgdc.jpg';

const HomePage: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        WebApp.BackButton.show();
        WebApp.BackButton.onClick(() => {
            window.history.back();
        });

        return () => {
            WebApp.BackButton.offClick(() => {
                window.history.back();
            });
        };
    }, []);

    return (
        <Layout bgColor="bg-[#d3edfa]">
            <div className="text-white">
                {/* Title */}
                <div className="text-center py-4">
                    <h1 className="text-xl font-normal text-blue-800">
                        Will Be Cover all Languages over the World
                    </h1>
                </div>

                {/* Search Field */}
                <div className="px-4 pb-4">
                    <div className="max-w-2xl mx-auto bg-white">
                        <p className="text-lg text-center font-mono font-semibold text-blue-800">
                            Links Submitted So Far...
                        </p>
                        <input
                            type="text"
                            placeholder="0000122213"
                            className="disabled w-full rounded-lg text-blue-800 text-center text-lg font-mono"
                        />
                    </div>
                </div>

                {/* Banner Carousel from API */}
                <BannerCarousel 
                    
                />

                {/* TG Directory Channel Banner */}
                <div className="px-4 pb-4">
                    <img
                        src={tgdcBanner}
                        alt="TG Directory Logo"
                        className="w-full h-auto rounded-lg shadow-lg"
                    />
                </div>

                {/* How to submit link */}
                <div className="text-center pb-4">
                    <a 
                      href="https://www.youtube.com/watch?v=OW5oJiNMcdA"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xl font-normal text-blue-800 hover:underline cursor-pointer"
                    >
                        How to submit link
                    </a>
                </div>

                {/* Action Buttons */}
                <div className="px-4 pb-6 space-y-2">
                    <button
                        onClick={() => navigate('/submit-link')}
                        className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white py-3 rounded-lg text-base font-semibold"
                    >
                        Submit Link is Free
                    </button>
                    <button
                    onClick={() => navigate('/search-link')}
                    className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white py-3 rounded-lg text-base font-semibold">
                        Search Link
                    </button>
                    <button
                        onClick={() => navigate('/country-feature-listing')}
                        className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white py-3 rounded-lg text-base font-semibold"
                    >
                        Country Feature listing
                    </button>
                    <button
                        onClick={() => navigate('/global-feature-listing')}
                        className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white py-3 rounded-lg text-base font-semibold"
                    >
                        Global Feature Listing
                    </button>
                    {/* <button className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white py-3 rounded-lg text-base font-semibold">
                        Promote your business
                    </button> */}
                </div>
            </div>
        </Layout>
    );
};

export default HomePage;