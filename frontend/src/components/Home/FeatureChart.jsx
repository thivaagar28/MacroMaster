import { Flex } from '@chakra-ui/react';
import axiosInstance from '../../services/axios';
import {useEffect, useState} from 'react'
import Chart from "react-apexcharts";


export const FeatureChart = ({country, measure}) => {

    const [options, setOptions] = useState({
        chart : {
        id : 'feature',
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
            range: undefined
        },
        tooltip: {
        shared: false,
        y: {
            formatter: function (val) {
            return (val)
            }
        },
        },
        colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0', '#3F51B5', '#546E7A', '#D4526E', '#8D5B4C', '#F86624'],
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
            axiosInstance.get('/'+ country.toLowerCase() +'/features_' + poc).then((res) => {
                console.log(res.data);
                const data = res.data;

                // Transform the data
                const categories = data.month;
                const transformedSeries = Object.keys(data).filter(key => key !== 'month').map(key => ({
                name: key.toUpperCase(),
                data: data[key]
                }));

                // Determine the initial zoom range (last 12 data points)
                const totalDataPoints = categories.length;
                const initialRangeStart = Math.max(0, totalDataPoints - 15);
                const initialRangeEnd = totalDataPoints - 1;

                //title
                const title = 'Features Selected for '+ country +' CI (' + measure + ')';

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
