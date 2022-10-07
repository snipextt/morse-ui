import { useEffect, useState } from "react";
import { Steps } from "antd";
import { useQuery } from "@tanstack/react-query";

import Spinner from "../Components/Spinner";

import { getUserProfile } from "../lib/profile";

const { Step } = Steps;

const Onboarding = () => {
  const { status, data } = useQuery(["profile"], getUserProfile);
  const [current, setCurrent] = useState(0);
  const onChange = (value: number) => {
    console.log("onChange:", current);
    setCurrent(value);
  };

  console.log(status, data);

  return (
    <div className="onboarding-container">
      {status === "loading" ? (
        <Spinner />
      ) : (
        <Steps current={current} onChange={onChange}>
          <Step title="Step 1" description="This is a description." />
          <Step title="Step 2" description="This is a description." />
          <Step title="Step 3" description="This is a description." />
        </Steps>
      )}
    </div>
  );
};

export default Onboarding;
