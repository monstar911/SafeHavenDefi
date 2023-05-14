import React from "react";
import "./chart.scss";

const Chart = ({ isDark }) => {
  return (
    <div>
      <iframe
        id="tradingview_chart"
        name="tradingview_chart"
        src="https://charts.bogged.finance/?c=bsc&t=0x9caE753B661142aE766374CEFA5dC800d80446aC&embed=1"
        title="Financial Chart"
        frameborder="0"
        allowtransparency="true"
        scrolling="no"
        allowfullscreen=""
        width="100%"
        style={{ display: "block" }}
        height={600}
      ></iframe>
    </div>
  );
};

export default Chart;
