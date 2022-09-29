import React from "react";
import Plot from "react-plotly.js";
import { formatDataSet } from '../utils/Formatters';

const LineChart = (props) => {

 const { title } = props;

 const { index, dates, profits } = formatDataSet(props.data);  

  var Data = [
    {
      // type: "scatter",
      type: "bar",
      // mode: "lines+markers",
        //  x: [1, 2, 3],
        //  y: [2, 6, 3],
       x: index,
       y: profits,
      marker: {
        //color: "red",
        color: "#1f77b4", // muted blue
      },
    },
  ];

  var Layout = {
    title: {
      text: title,
      font: {
        size: 20,
        fontweight: "bold",
      },
    },
     autosize: true,
     responsive: true,
  };

  return (
    <Plot
      data={Data}
      layout={Layout}
      style={{
        width: "100%",
        height: "100%",
      }}
    />
  );
};

export default LineChart;
