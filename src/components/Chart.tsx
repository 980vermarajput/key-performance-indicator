import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { ChartValueTypes } from "../types/api/snapshot";

const Chart = ({
  width,
  values,
}: {
  width: number;
  values: ChartValueTypes[];
}) => {
  const options = {
    chart: {
      type: "areaspline",
      height: "110px",
      width: width,
    },
    title: {
      text: "",
    },
    xAxis: {
      visible: false,
      categories: values?.map((ele: ChartValueTypes) => ele?.date),
    },
    yAxis: {
      visible: false,
    },
    legend: {
      enabled: false,
    },
    // tooltip: {
    //   enabled: false,
    // },
    series: [
      {
        name: "Data",
        data: values?.map((ele: ChartValueTypes) => ele?.value),
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
          },
          stops: [
            [0, Highcharts.color("#119F97").setOpacity(0.2).get("rgba")],
            [1, Highcharts.color("#119F97").setOpacity(0).get("rgba")],
          ],
        },
        color: "#119F97",
        marker: {
          enabled: false,
          states: {
            hover: {
              enabled: false,
            },
          },
        },
      },
    ],
    // plotOptions: {
    //   responsive: {
    //     rules: [
    //       {
    //         condition: {
    //           maxWidth: 100,
    //         },
    //         chartOptions: {
    //           chart: {
    //             spacing: [0, 0, 0, 0],
    //           },
    //           title: {
    //             style: {
    //               fontSize: "14px",
    //             },
    //           },
    //         },
    //       },
    //     ],
    //   },
    // },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default Chart;
