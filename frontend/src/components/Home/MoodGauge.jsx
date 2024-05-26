import { Box, Divider, Flex, Text, useToast } from '@chakra-ui/react'
import GaugeComponent from 'react-gauge-component';
import { useState, useEffect } from 'react';
import axiosInstance from '../../services/axios';
import { NumberDisplay } from './NumberDisplay';

export const MoodGauge = ({country, measure}) => {
    const [value, setValue] = useState();
    const [monthValue, setMonthValue] = useState();
    const [yearValue, setYearValue] = useState();
    const toast = useToast();

    useEffect(() => {
        console.log('running effect')
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
            axiosInstance.get('/'+ country.toLowerCase() +'/mm_' + poc).then((res) => {
            console.log(res.data);
            setValue(Math.floor(res.data.MarketMood[0]));
            setMonthValue(Math.floor(res.data.MarketMood[1]));
            setYearValue(Math.floor(res.data.MarketMood[2]));

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
            console.log('done');
        })}

        fetch_features();
    }, [country, measure]);
    
  return (
    <Flex w={'full'} justifyContent={'center'} alignItems={'center'} flexDir={'column'}>
        <Box>
            <Text fontSize='lg' as={'b'}>{country} Market Mood</Text>
            <Divider/>
        </Box>
        <Box height={'80%'} width={'80%'}>
            <GaugeComponent
                type="semicircle"
                arc={{
                    width: 0.3,
                    // gradient: true,
                    subArcs: [
                    {
                        limit: 15,
                        color: '#EA4228',
                        showTick: true,
                        tooltip: {
                        text: 'Market is Hot!'
                        },
                    },
                    {
                        limit: 35,
                        color: '#F5CD19',
                        showTick: true,
                        tooltip: {
                        text: 'Lightly Volatile...'
                        }
                    },
                    {
                        limit: 65,
                        color: '#5BE12C',
                        showTick: true,
                        tooltip: {
                        text: 'Neutral'
                        }
                    },
                    {
                        limit: 85, color: '#F5CD19', showTick: true,
                        tooltip: {
                        text: 'Lightly Volatile...'
                        }
                    },
                    {
                        color: '#EA4228',
                        tooltip: {
                        text: 'Market is Hot!'
                        }
                    }
                    ]
                }}
                pointer={{
                    color: '#345243',
                    length: 0.80,
                    width: 15,
                    // animate: true,
                    // elastic: true,
                    animationDelay: 200,
                }}
                labels={{
                    valueLabel: { formatTextValue: value => value},
                    tickLabels: {
                    type: 'outer',
                    defaultTickValueConfig: { formatTextValue: value => value },
                    ticks: [
                        { value: 50 },
                    ],
                    }
                }}
                value={value}
                minValue={0}
                maxValue={100}
                style={{
                    width: '100%',
                    height: '100%'
                }}
        />
        </Box>
        <Flex flexDir={'row'} width={'100%'} px={5} mx={5} justifyContent={'center'}>
            <Text mr={2}>1 month ago ..........</Text>
            <NumberDisplay number={monthValue}/>
            <Text ml={5} mr={2}>1 year ago ..........</Text>
            <NumberDisplay number={yearValue}/>
        </Flex>
    </Flex>
  )
}
