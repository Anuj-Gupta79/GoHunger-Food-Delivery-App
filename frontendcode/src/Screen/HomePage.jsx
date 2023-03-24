import React from "react";

import Navbar from "../Components/Navbar";
import Card from "../Components/Card";
import Footer from "../Components/Footer";

export default function HomePage() {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div>
        <Card />
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}
