import { useState } from "react";
import ReactApexChart from "react-apexcharts";

const HotProductChart = () => {

  const [state] = useState({

    series: [
      {
        data: [3551 , 2951, 2125],
      },
    ],

    options: {

      chart: {
        type: "bar",
        height: 350,
        toolbar: {
          show: false,
        },
      },

      grid: {
        show: false,
      },

      colors: ['#BBC3EA'],

      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: "horizontal",
          shadeIntensity: 0.5,
          gradientToColors: ["#fff","#BBC3EA"],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 100],
        }
      },

      plotOptions: {
        bar: {
          borderRadius: 4,
          barHeight: '40%',
          horizontal: true,
          dataLabels:{
            position: 'bottom'
          }
        },
      },

      dataLabels: {
        enabled: true,
        offsetX: 0,
        textAnchor: 'start',

        style: {
          colors: ['#000'],
          fontSize:  '14px',
          fontWeight: '400',
          fontFamily: "Work Sans",
        },

        formatter: function (val, opt) {
          return opt.w.globals.labels[opt.dataPointIndex] + " $" + val
        },

        dropShadow: {
          enabled: true
        }
      },

      xaxis: { 
        categories: [ "Tomatto", "Onion", "Chicken"],
        labels: { show: false },
        axisBorder: {
          show: false,
        },
       },
      
      yaxis: { 
        labels: { show: false },
       },

    },
  });

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="bar"
          height={350}
        />
      </div>
    </div>
  );
};

export default HotProductChart;
