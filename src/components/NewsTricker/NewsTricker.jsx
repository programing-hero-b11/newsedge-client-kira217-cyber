import React from "react";
import { FaBolt } from "react-icons/fa";
import "./NewsTicker.css";

const headlines = [
  "🔥 Breaking: Government announces new tech policy!",
  "🚨 Crime: Major cyber fraud busted in Dhaka!",
  "📚 Education: SSC results declared today!",
  "✈️ Travel: Bangladesh opens visa-free travel to new countries!",
  "🩺 Health: New vaccine launched for seasonal flu!",
  "⚖️ Politics: Parliament passes new digital law!",
];

const NewsTicker = () => {
  return (
    <div className="news-ticker-container py-2 overflow-hidden max-w-7xl mx-auto">
      <div className="ticker-wrapper flex items-center gap-4">
        <div className="flex items-center gap-2 font-bold px-4 text-primary text-lg">
          <FaBolt />
          Live :
        </div>
        <div className="ticker">
          <div className="ticker-move">
            {headlines.map((headline, idx) => (
              <span key={idx} className="ticker-item">
                {headline}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsTicker;
