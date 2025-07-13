import React from "react";
import Slider from "../../components/Slider/Slider";
import AllPublisher from "../../components/AllPublisher/AllPublisher";
import TrendingArticles from "../../components/TrendingArticles/TrendingArticles";
import Plans from "../../components/Plans/Plans";
import CountUp from "../../components/CountUp/CountUp";
import NewsTicker from "../../components/NewsTricker/NewsTricker";
import { Feedback } from "../../components/Feedback/Feedback";

const Home = () => {
  return (
    <div>
      <Slider></Slider>
      <AllPublisher></AllPublisher>
      <NewsTicker></NewsTicker>
      <TrendingArticles></TrendingArticles>
      <Plans></Plans>
      <Feedback></Feedback>
      <CountUp></CountUp>
    </div>
  );
};

export default Home;
