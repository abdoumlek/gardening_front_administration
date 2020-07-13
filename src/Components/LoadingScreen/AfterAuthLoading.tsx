import React, { FC } from "react";
import LoadingScreen from "./LoadingScreen";
import "./AfterAuthLoading.css"
import Navigation from "../Navigation/Navigation";

const Home: FC<any> = () => {
  return (
    <>
      <Navigation/>
      <div className="page-wrapper">
        <LoadingScreen />
      </div>
    </>
  );
};

export default Home;
