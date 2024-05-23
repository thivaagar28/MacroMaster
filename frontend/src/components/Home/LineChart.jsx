import { Flex } from "@chakra-ui/react";
import { useState } from "react";
import Chart from "react-apexcharts";
import './linechart.css'

export const LineChart = () => {
  const [options, setObject] = useState({
    chart : {
      id : 'chart',
      type: 'area',
      stacked: false,
      width: '100%',
      zoom: {
        type: 'x',
        enabled: true,
        autoScaleYaxis: true
      },
      toolbar: {
        autoSelected: 'zoom'
      },
      foreColor: '#ffffff',
      fontFamily: 'BlinkMacSystemFont'
    },
    grid: {
      show : false
    },
    dataLabels: {
      enabled: false
    },
    markers: {
      size: 0,
    },
    title: {
      text: 'Features Selected for USA Composite Index (MoM)',
      align: 'middle'
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100]
      },
    },
    yaxis: {
      labels: {
        formatter: function (val) {
          return (val);
        },
      },
      title: {
        text: 'Price Index'
      },
    },
    xaxis:{
      categories : [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
    },
    tooltip: {
      shared: false,
      y: {
        formatter: function (val) {
          return (val)
        }
      },
    },
    responsive: [
    {
      breakpoint: 1000,
      options: {
        plotOptions: {
          bar: {
            horizontal: false
          }
        },
        legend: {
          position: "bottom"
        }
      }
    }],
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      floating: true,
      offsetY: -5,
      offsetX: -10
    }
  });
  const [series, setSeries] = useState([{
    name : 'SNP 500',
    data : [30, 40, 50, 35, 49, 60, 70, 91, 105]
  },{
    name : 'Predicted SNP 500',
    data : [35, 35, 60, 25, 43, 67, 57, 81, 120]
  }])
  return (
    <Flex flex={1}>
      <Chart options={options} series={series} type="area" height={'100%'} width={'500'}/>
    </Flex>
  )
}
