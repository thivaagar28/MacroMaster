import { Flex, useToast } from '@chakra-ui/react';
import axiosInstance from '../../services/axios';
import {useEffect, useState} from 'react'
import Chart from "react-apexcharts";
import './linechart.css'

export const PredictionChart = ({country, measure}) => {

    const toast = useToast();

    const name_changer = (name) =>{
        if(name === 'MarketMood')
            name = 'Market Mood'
        if(name === 'pred_MarketMood')
            name = 'Predicted Market Mood'
        return name
    }
    
    const [options, setOptions] = useState({
        chart: {
            height: 350,
            type: 'line',
            stacked: false,
            zoom: {
                type: 'x',
                enabled: true,
                autoScaleYaxis: true
            },
            animations: {
                enabled: false
            },
            width: '100%',
            foreColor: '#ffffff',
            toolbar: {
            autoSelected: 'zoom'
        },
        },
        stroke: {
            width: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4], // Set the same stroke width for all series
            curve: 'smooth',
        },
        grid: {
        show : false
        },
        markers: {
        size: 0,
        },
        labels: undefined,
        title: {
        text: undefined,
        align: 'middle'
        },
        xaxis: {
        },
        colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0', '#3F51B5', '#546E7A', '#D4526E', '#8D5B4C', '#F86624'],
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
            axiosInstance.get('/'+ country.toLowerCase() +'/mmi_' + poc).then((res) => {
                console.log(res.data);
                const data = res.data;
                
                const categories = data.month;

                // Apply the name_changer function to each category
                const changedCategories = categories.map(name_changer);

                const transformedSeries = Object.keys(data).filter(key => key !== 'month').map(key => ({
                name: key.toUpperCase(),
                data: data[key],
                }));

                console.log(transformedSeries)

                const newSeries = transformedSeries.map(series => {
                return {
                    ...series,
                    tooltip: {
                    enabled: true,
                    },
                };
                });

                //title
                const title = country + ' Market Mood Prediction (' + measure + ')';

                // Update state with the transformed data
                setOptions((prevOptions) => ({
                    ...prevOptions,
                    labels: categories, 
                    title:{
                        text: title
                    }
                }));

                setSeries(newSeries);

            }).catch((err) => {
                console.error(err);
                if (err.response && err.response.status === 401) {
                toast({
                    title: "Please register/login to access premium features",
                    status: 'error',
                    isClosable: 'true',
                    duration: 1500
                });
            }
            }).finally(() => {
                console.log('finally');
            });
        }
        fetch_features();
    }, [country, measure]);

  return (
    <>
    <Flex id='chart'>
      <Chart options={options} series={series} type="line" height={'100%'} width={'750'}/>
    </Flex>
    <div id="html-dist"></div>
    </>
  )
}
