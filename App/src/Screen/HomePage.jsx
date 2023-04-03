import React from "react";

import Navbar from "../Components/Navbar";
import Card from "../Components/Card";
import Footer from "../Components/Footer";
import Carousal from "../Components/Carousal";

export default function HomePage() {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div>
        <Carousal></Carousal>
      </div>
      <div className='d-flex m-2 gap-3'>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
      <div className='d-flex m-2 gap-3'>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
      <div className='d-flex m-2 gap-3'>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}
