import React from "react";
import Slider from "../../components/Slider/Slider";
import AllPublisher from "../../components/AllPublisher/AllPublisher";
import TrendingArticles from "../../components/TrendingArticles/TrendingArticles";
import Plans from "../../components/Plans/Plans";
import CountUp from "../../components/CountUp/CountUp";

const Home = () => {
  return (
    <div>
      <Slider></Slider>
      <AllPublisher></AllPublisher>
      <TrendingArticles></TrendingArticles>
      <Plans></Plans>
      <CountUp></CountUp>
    </div>
  );
};

export default Home;
