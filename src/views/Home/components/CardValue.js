import React, { useEffect, useRef } from "react";
import { useCountUp } from "react-countup";
import { Text } from "@pancakeswap/uikit";

const CardValue = ({ value, decimals, fontSize = "40px", prefix }) => {
  const { countUp, update } = useCountUp({
    start: 0,
    end: value,
    duration: 1,
    separator: ",",
    decimals:
      decimals !== undefined ? decimals : value < 0 ? 4 : value > 1e5 ? 0 : 3,
  });

  const updateValue = useRef(update);

  useEffect(() => {
    updateValue.current(value);
  }, [value, updateValue]);

  return (
    <Text color="text" bold fontSize={fontSize}>
      {prefix}
      {countUp}
    </Text>
  );
};

export default CardValue;
