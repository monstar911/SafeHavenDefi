import React from "react";
import { Heading } from "@pancakeswap/uikit";
import PageHeader from "../../../components/PageHeader";

const Hero = () => {
  return (
    <PageHeader>
      <Heading
        as="h1"
        scale="xxl"
        color="text"
        mb="16px"
        style={{ userSelect: "none" }}
      >
        Referral
      </Heading>
      <Heading scale="lg" color="text" style={{ userSelect: "none" }}>
        Promotion is the most important aspect to the success of a crypto project. This is why we have implemented a referral program in the SafeFarms !
        Earn a 3% extra commission based on the rewards your referral generates!
        Referral bonus is earned when harvesting SLT rewards !
      </Heading>
    </PageHeader>
  );
};

export default Hero;
