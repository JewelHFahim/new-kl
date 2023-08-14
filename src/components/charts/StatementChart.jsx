import ReactApexChart from "react-apexcharts";

function StatementChart() {

  const seriesData = [
    {
      name: "Income",
      type: "column",
      data: [70, 45, 95, 70, 70],
    },
    {
      name: "Cashflow",
      type: "column",
      data: [60, 45, 65, 70, 60],
    },
    {
      name: "Revenue",
      type: "line",
      data: [35, 25, 80, 60, 55],
    },
  ];

  const options = {

    chart: {
      height: 350,
      type: "line",
      stacked: false,
      toolbar: {
        show: false,
      },
    },

    fill: {
      colors: ["#BAD1E8", "#7D68FC"],
    },

    dataLabels: {
      enabled: false,
    },

    stroke: {
      width: [0, 0, 4],
      curve: "smooth",
      colors: ["#3F3F44"],
    },

    title: {
      text: "Statement",
      align: "left",
      offsetX: 10,
      offsetY: -6,
      style: {
        fontSize:  '14px',
        fontWeight:  'bold',
        fontFamily:  "Work Sans",
        color:  '#3F3F44'
      },
    },

    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May"],
    },

    yaxis: [
      {

        axisTicks: {
          show: true,
        },

        axisBorder: {
          show: false,
        },

        labels: {
          style: {
            colors: "#3f3f444d",
          },
        },
        tooltip: {
          enabled: true,
        },
      },

      {
        seriesName: "Income",
        opposite: true,
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: "#3f3f444d",
          },
        },
      },
    ],

    tooltip: {
      fixed: {
        enabled: true,
        position: "topLeft",
        offsetY: 30,
        offsetX: 60,
      },
    },

    legend: {
      horizontalAlign: "center",
      offsetY: -305,
      itemMargin: {
        horizontal: 20,
        vertical: 0,
      },
      markers: {
        fillColors: ["#BAD1E8", "#7D68FC", "#3F3F44"],
      },
    },
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={seriesData}
        type="line"
        height={350}
      />
    </div>
  );
}

export default StatementChart;
