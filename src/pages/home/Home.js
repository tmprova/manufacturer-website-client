import React from "react";
import Banner from "./Banner";
import Content from "./Content";
import Features from "./Features";
import Manufacturing from "./Manufacturing";
import Products from "./products/Products";
import Summary from "./Summary";
import Review from "./Review";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Products></Products>
      <Review></Review>
      <Summary></Summary>
      <Manufacturing></Manufacturing>
      <Features></Features>
      <Content></Content>
    </div>
  );
};

export default Home;
