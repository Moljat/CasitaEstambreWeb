import React from "react";
import Header from "./components/header";

export default function Home() {
  return (
    <div> 
      <Header />
      <h1 className="text-2xl bg-cover" style={ {backgroundImage: "url=('./resources/header.jpg')"}}>Hello, world!</h1>
      </div>
  );
}
