import { Box, Button, Flex, Menu, MenuButton, MenuItem, MenuList, Stat, StatArrow, StatHelpText, Text, useToast } from '@chakra-ui/react'
import { useState, useEffect, useRef } from 'react'
import { useParams, useLocation } from 'react-router-dom';
import axiosInstance from '../../services/axios';
import Chart from "react-apexcharts";


export const StatView = ({name='MacroName', perc=null, trend = false}) => {

  const isMounted = useRef(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const toast = useToast();

  const refreshPage = () => {
        window.location.reload(false);
  }

  const [options, setOptions] = useState({
        chart: {
            height: 320,
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
            width: [4], // Set the same stroke width for all series
            curve: 'smooth',
        },
        markers: {
        size: 0,
        },
        labels: undefined,
        title: {
        text: undefined,
        align: 'middle',
        },
        xaxis: {
        },
    });

  const [series, setSeries] = useState([]);

  const fetch_data = () => {
    const queryParams = new URLSearchParams(location.search);
    const country = queryParams.get('country');
    const index = queryParams.get('index');

    let title =''

    if(country === 'usa'){
      title = 'USA '
    } else if (country === 'malaysia'){
      title = 'Malaysia '
    } else{
      title = null
    }

    if(index === 'cpi'){
      title += 'Consumer Price Index'
    } else if (index === 'inf'){
      title += 'Inflation Rate'
    } else if (index === 'gr'){
      title += 'Goverment Reserves (Billions)'
    } else if (index === 'ipi'){
      title += 'Industrial Production Index'
    } else if (index === 'lt_ir'){
      title += 'Long-term Interest Rate'
    } else if (index === 'st_ir'){
      title += 'Short-term Interest Rate'
    } else if (index === 'gdp'){
      title += 'Gross Domestic Product'
    } else if (index === 'ur'){
      title += 'Unemployment Rate'
    } else if (index === 'ppi'){
      title += 'Price Producer Index'
    } else if (index === 'wrt'){
      title += 'Wholesale & Retail Trade Index'
    } else if (index === 'bcli'){
      title += 'Business Cycle Leading Indicator Index'
    }

    let url = '/' + country + '/' + index;
    axiosInstance.get(url).then((res) => {
      console.log(res.data);
      const month = res.data.month;

      const transformedSeries = Object.keys(res.data).filter(key => key !== 'month').map(key => ({
        name: key.toUpperCase(),
        data: res.data[key].map(value => {
          if (typeof value === 'string' && !isNaN(parseFloat(value))) {
                return parseFloat(value).toFixed(5);
            }
            return value;
        }),
      }));

      // Update state with the transformed data
      setOptions((prevOptions) => ({
          ...prevOptions,
          labels: month,
          title:{
            text: title
          }
      }));

      setSeries(transformedSeries);

    }).catch((err) => {
        console.error(err);
        toast({
            title: "Something went wrong. Page will be reloaded in few seconds",
            status: 'error',
            isClosable: 'true',
            duration: 1500
        });
        //setTimeout( refreshPage, 2000);
    }).finally(() => {
        setLoading(false);
    });
  }

  useEffect(() => {
        fetch_data();
    }, []);

  return (
    <Flex mt={3} bg="RGBA(100,84,132, 0.51)" h={'full'} w={'full'} borderRadius="2xl" position={'relative'} flexDir={'row'} justifyContent={'flex-start'} mb={3}>
      <Flex id='chart' w={'full'} justifyContent={'center'} alignItems={'center'}>
        <Chart options={options} series={series} type="line" height={'97%'} width={'1300'}/>
      </Flex>
    <div id="html-dist"></div>
    </Flex>
  )
}
