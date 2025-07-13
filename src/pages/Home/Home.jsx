import React from "react";
import Slider from "../../components/Slider/Slider";
import AllPublisher from "../../components/AllPublisher/AllPublisher";
import TrendingArticles from "../../components/TrendingArticles/TrendingArticles";

const Home = () => {
  return (
    <div>
      <Slider></Slider>
      <AllPublisher></AllPublisher>
      <TrendingArticles></TrendingArticles>
    </div>
  );
};

export default Home;
