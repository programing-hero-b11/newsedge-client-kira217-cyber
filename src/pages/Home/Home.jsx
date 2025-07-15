import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Slider from "../../components/Slider/Slider";
import AllPublisher from "../../components/AllPublisher/AllPublisher";
import TrendingArticles from "../../components/TrendingArticles/TrendingArticles";
import Plans from "../../components/Plans/Plans";
import CountUp from "../../components/CountUp/CountUp";
import NewsTicker from "../../components/NewsTricker/NewsTricker";
import { Feedback } from "../../components/Feedback/Feedback";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 10000); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <Slider />
      <AllPublisher />
      <NewsTicker />
      <TrendingArticles />
      <Plans />
      <Feedback />
      <CountUp />

      {/* 🌟 Stylish Large Subscription Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-70 p-4">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-3xl p-10 w-full max-w-3xl shadow-2xl transition-transform transform scale-100">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">
                🔓 প্রিমিয়াম কনটেন্ট আনলক করুন!
              </h2>
              <p className="text-lg md:text-xl">
                সাবস্ক্রিপশন নিন এবং এক্সক্লুসিভ আর্টিকেল পড়ার সুযোগ পান আজই।
              </p>
              <button
                onClick={() => navigate("/subscription")}
                className="mt-4 px-8 py-3 bg-white hover:cursor-pointer text-blue-600 font-semibold rounded-full shadow-md hover:scale-105 transition"
              >
                এখনই সাবস্ক্রাইব করুন
              </button>
            </div>
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-6 text-white text-2xl hover:cursor-pointer hover:text-red-300 transition"
              title="Close"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
