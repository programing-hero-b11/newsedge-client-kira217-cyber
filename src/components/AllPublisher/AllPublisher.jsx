import React from "react";
import { motion } from "framer-motion";

const allPublisher = [
  { name: "BBC News", logo: "https://i.ibb.co/HDdHfWKn/channels4-profile.jpg" },
  { name: "CNN", logo: "https://i.ibb.co/Kz3ZxpYw/CNN-Logo-4.png" },
  {
    name: "Al Jazeera",
    logo: "https://i.ibb.co/jP2xsVGV/Aljazeera-logo-English-1024x768.png",
  },
  {
    name: "Reuters",
    logo: "https://i.ibb.co/0RXCPkWh/nahtge0g-reuters-logo-625x300-06-July-25.webp",
  },
  { name: "Sky News", logo: "https://i.ibb.co/RxH9MpP/images.png" },
  { name: "France 24", logo: "https://i.ibb.co/wN2wFmCw/unnamed.jpg" },
  {
    name: "Fox News",
    logo: "https://i.ibb.co/FkLjYYgK/51-Du-C9sj-Nm-L.png",
  },
  {
    name: "CNBC",
    logo: "https://i.ibb.co/LX0Wp6fT/w-CA2dt-Ubkmmo-UBCHkv-H26-Y.jpg",
  },
  {
    name: "NHK World – Japan",
    logo: "https://i.ibb.co/hx2FWPx7/NHK-World-svg.png",
  },
];

const AllPublisher = () => {
  return (
    <section className="max-w-7xl mx-auto mt-10">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-10 text-primary"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          All Publisher
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allPublisher.map((publisher, index) => (
            <motion.div
              key={index}
              className=" rounded-xl shadow hover:shadow-lg hover:-translate-y-1 transition-all p-6 text-center cursor-pointer border border-blue-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <div className="text-[#2563EB] mb-3 flex justify-center">
                <img className="w-20 h-20" src={publisher.logo} alt="" />
              </div>
              <h3 className="text-lg font-semibold">{publisher.name}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllPublisher;
