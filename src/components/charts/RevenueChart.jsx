import { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useGetProductsQuery } from "../../redux/feature/products/productApi";

const RevenueChart = () => {

  const {data: products } = useGetProductsQuery();

  const mapedProductsForName = products?.results?.map((product)=>{
    return product.product_name
  })

  const mapedProductsForAmount = products?.results?.map((product)=>{
    return product.selling_price
  })

  const [state] = useState({
    series: [
      {
        name: mapedProductsForName,
        data: mapedProductsForAmount
      },
    ],
    options: {

      chart: {
        height: 350,
        type: "line",
        toolbar: false,
        zoom: {
          enabled: false,
        },
      },

      tooltip: {
        enabled: true,
      },

      markers: {
        colors: ["#CCEABB"],
        hover: {
          sizeOffset: 8
        }
    },

      dataLabels: {
        enabled: false,
      },

      stroke: {
        curve: "smooth",
        colors: ["#CCEABB"],
      },

      grid: {
        show: true,
      },

      xaxis: {
        categories: [
          "Aug 10",
          "Aug 13",
          "Aug 16",
          "Aug 19",
          "Aug 21",
          "Aug 13",
          "Aug 25",
          "Aug 26",
        ],
      },
    },
  });

  return (
    <div id="chart">
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="line"
        height={350}
      />
    </div>
  );
};

export default RevenueChart;
