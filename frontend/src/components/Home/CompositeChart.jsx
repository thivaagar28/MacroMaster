import { Flex } from '@chakra-ui/react';
import axiosInstance from '../../services/axios';
import {useEffect, useState} from 'react'
import Chart from "react-apexcharts";


export const CompositeChart = ({country, measure}) => {

    const [options, setOptions] = useState({
        chart : {
        id : 'composite',
        type: 'line',
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
        },
        stroke: {
                width: [5,5,4],
                curve: 'smooth'
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
        text: undefined,
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
            text: 'Rate of Change'
        },
        },
        xaxis:{
            categories : [], //updated through fetch data
            
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
    
    const [series, setSeries] = useState([]);

    useEffect(() => {
        let poc = '';
        if(measure === 'MoM'){
            poc = 'poc1'
        } else if (measure === 'YoY'){
            poc = 'poc12'
        } else {
            poc = null
            return
        }
        const fetch_features = () => {
            axiosInstance.get('/'+ country.toLowerCase() +'/cmpt_' + poc).then((res) => {
                console.log(res.data);
                const data = res.data;

                // Transform the data
                const categories = data.month;
                let maxLength = categories.length;

                const transformedSeries = Object.keys(data).filter(key => key !== 'month').map(key => {
                    const seriesData = data[key];
                    while (seriesData.length < maxLength) {
                        seriesData.push(null); // Pad with null to ensure same length
                    }
                    return {
                        name: key.toUpperCase(),
                        data: seriesData
                    };
                });

                // Determine the initial zoom range (last 12 data points)
                const totalDataPoints = categories.length;
                const initialRangeStart = Math.max(0, totalDataPoints - 15);
                const initialRangeEnd = totalDataPoints;

                //title
                const title = 'Composite Index for '+ country +' (' + measure + ')';

                // Update state with the transformed data
                setOptions(prevOptions => ({
                ...prevOptions,
                xaxis: {
                    ...prevOptions.xaxis,
                    categories: categories,
                    min: initialRangeStart,
                    max: initialRangeEnd,
                }, title:{
                    text: title
                }
            }));

            setSeries(transformedSeries);
        }).catch((err) => {
            console.error(err);
        }).finally(() => {
            console.log('done');
        });
    }

    fetch_features();
    }, [country, measure]);

  return (
    <Flex flex={1}>
      <Chart options={options} series={series} type="area" height={'100%'} width={'600'}/>
    </Flex>
  )
}
