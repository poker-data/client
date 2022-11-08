import React from "react";
import Plot from "react-plotly.js";
import { formatDataSetLineChart  } from '../utils/Formatters';

const LineChart = (props) => {

 const { title } = props;

 const { dates, profits } = formatDataSetLineChart(props.data);  

  var Data = [
    {
      type: "scatter",
      //type: "bar",
      mode: "lines",
          x: dates,
          y: profits,
      // x: plot_data['x'],
       //y: plot_data['y'],
      marker: {
        color: "red",
        //color: "#1f77b4", // muted blue
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
    // autosize: true,
    // responsive: true,
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
