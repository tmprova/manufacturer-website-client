import React from "react";
import Banner from "./Banner";
import Content from "./Content";
import Features from "./Features";
import Manufacturing from "./Manufacturing";
import Products from "./products/Products";
import Summary from "./Summary";

const Home = () => {
  return (
    <div>
      <h1>home</h1>
      <Banner></Banner>
      <Products></Products>
      <Summary></Summary>
      <Manufacturing></Manufacturing>
      <Features></Features>
      <Content></Content>
    </div>
  );
};

export default Home;
