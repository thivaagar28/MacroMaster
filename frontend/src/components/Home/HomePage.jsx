import { Alert, AlertIcon, Box, Button, Divider, Flex, Image, Menu, MenuButton, MenuItem, MenuList, Skeleton, Stack, Text, useToast } from '@chakra-ui/react'
import { FiChevronDown, FiChevronUp, FiDatabase } from 'react-icons/fi'
import { MacroIndex } from './MacroIndex'
import {useEffect, useRef, useState} from 'react'
import axiosInstance from '../../services/axios';
import { MoodGauge } from './MoodGauge'
import { PredictionChart } from './PredictionChart'
import { useAuth } from '../../hooks/useAuth';

export const HomePage = () => {
    const auth = useAuth();

    const isMounted = useRef(false);
    const [loading, setLoading] = useState(true);

    const [monthlist, setMonthlist] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState('Period');
    const [selectedMeasure, setSelectedMeasure] = useState('Measure');
    const [selectedCountry, setSelectedCountry] = useState('Select Country');
    const [statData, setStatData] = useState();
    const toast = useToast();
    const refreshPage = () => {
        window.location.reload(false);
    }

    const fetchMonth = () =>{
        setLoading(true);
        let url = ''
        let country = ''

        if (selectedCountry === 'USA'){
            country = 'usa'
        } else if (selectedCountry === 'Malaysia'){
            country = 'malaysia'
        } else{
            return
        }
        
        if(selectedMeasure === 'MoM'){
            url = '/' + country + '/poc1_months'
        } else if (selectedMeasure === 'HF'){
            url = '/' + country + '/poc6_months'
        } else if (selectedMeasure === 'YoY'){
            url = '/' + country + '/poc12_months'   
        } else{
            url = null
            return
        }

        axiosInstance.get(url).then((res) => {
            setMonthlist(res.data);
        }).catch((err) => {
        console.error(err);
            toast({
                title: "Something went wrong. Page will be reloaded in few seconds",
                status: 'error',
                isClosable: 'true',
                duration: 1500
            });
            setTimeout( refreshPage, 2000);
        }).finally(() => {
            setLoading(false);
        });
    }

    const handleCountryClick = (country) =>{
        setSelectedCountry(country);
    }

    const handleMonthClick = (month) =>{
        setSelectedMonth(month.month);
    }

    const handleMeasureClick = (measure) =>{
        setSelectedMeasure(measure);
        fetchMonth();
    }

    const fetch_stat = () =>{
        if(selectedMeasure !== 'Period'){
            setLoading(true);
            let url = ''
            if(selectedMeasure === 'MoM'){
                url = '/' + selectedCountry.toLowerCase() +'/'+ selectedMonth +'/poc1'
            } else if (selectedMeasure === 'YoY'){
                url = '/' + selectedCountry.toLowerCase() +'/'+ selectedMonth +'/poc12'
            } else{
                url = null
                return
            }

            axiosInstance.get(url).then((res) => {
                setStatData(res.data);
            }).catch((err) => {
                console.error(err);
                toast({
                    title: "Something went wrong. Page will be reloaded in few seconds",
                    status: 'error',
                    isClosable: 'true',
                    duration: 1500
                });
                setTimeout( refreshPage, 2000);
            }).finally(() => {
                setLoading(false);
            });
        }
    }

    const default_settings = () => {
        setSelectedCountry('USA');
        handleMeasureClick('MoM');
        setSelectedMonth('May 24');
    }

    const download_csv = async () =>{
        try {
            let response = await axiosInstance.get('/' + selectedCountry.toLowerCase() + '/export_csv', {
                responseType: 'blob', // Important for handling binary data
            });

            const filename = selectedCountry.toLowerCase() + '_collection_export.csv'
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (error) {
            console.error('There was an error with the download', error);
            if (error.response && error.response.status === 401) {
                toast({
                    title: "Please register/login to access premium features",
                    status: 'error',
                    isClosable: 'true',
                    duration: 1500
                });
            } 
        }
    }

    useEffect(() => {
        if(!isMounted.current) return;
        fetchMonth();
    }, [selectedCountry, selectedMeasure]);

    useEffect(() => {
        if(!isMounted.current) return;
        fetch_stat();
    }, [selectedCountry, selectedMonth, selectedMeasure]);

    
  
    useEffect(() => {
        if(isMounted.current) return;
        default_settings();
        isMounted.current = true;
    }, []);

  return (
    <Flex w={'full'} h={'full'} flexDir={'column'}>
        <Flex justifyContent={'space-between'}>
            <Flex justifyContent={'flex-start'}>
                <Menu>
                    {({ isOpen }) => (
                        <>
                        <MenuButton mr={4} size={'sm'} isActive={isOpen} as={Button} rightIcon={ isOpen ? <FiChevronUp strokeWidth={3} color={'#d4a600'}/> : <FiChevronDown strokeWidth={3} color={'#d4a600'}/>} >
                            {selectedCountry}
                        </MenuButton>
                        <MenuList size={'sm'}>
                            <MenuItem onClick={() => handleCountryClick('Malaysia')} >Malaysia</MenuItem>
                            <MenuItem onClick={() => handleCountryClick('USA')}>USA (Global)</MenuItem>
                        </MenuList>
                        </>
                    )}
                </Menu>
                <Menu>
                    {({ isOpen }) => (
                        <>
                        <MenuButton mr={4} size={'sm'} isActive={isOpen} as={Button} rightIcon={ isOpen ? <FiChevronUp strokeWidth={3} color={'#d4a600'}/> : <FiChevronDown strokeWidth={3} color={'#d4a600'}/>} >
                            {selectedMonth}
                        </MenuButton>
                        <MenuList maxHeight={"60vh"} overflowY={"scroll"}>
                            {monthlist.map((month, index) => (
                                <MenuItem key={index} onClick={() => handleMonthClick({month})} >{month}</MenuItem>
                            ))}
                        </MenuList>
                        </>
                    )}
                </Menu>
                <Menu>
                    {({ isOpen }) => (
                        <>
                        <MenuButton size={'sm'} isActive={isOpen} as={Button} rightIcon={ isOpen ? <FiChevronUp strokeWidth={3} color={'#d4a600'}/> : <FiChevronDown strokeWidth={3} color={'#d4a600'}/>} >
                            {selectedMeasure}
                        </MenuButton>
                        <MenuList>
                            <MenuItem onClick={() => handleMeasureClick('MoM')}>MoM (1 month)</MenuItem>
                            <MenuItem onClick={() => handleMeasureClick('YoY')}>YoY (12 months)</MenuItem>
                        </MenuList>
                        </>
                    )}
                </Menu>
            </Flex>
            {auth?.isAuthenticated ? 
            <Button rightIcon={<FiDatabase />} size={'sm'} variant='outline' onClick={download_csv}>
                Download CSV
            </Button> :
            <Alert status='info' width={'fit-content'} px={2} py={0} size={'sm'}>
                <AlertIcon />
                Register/Login to access premium features!
            </Alert>
            }
        </Flex>
        <MacroIndex data={statData} country={selectedCountry}/>
        <Flex flex={1} pt={3}>
            <Flex w={'45%'} justifyContent={'center'}>
                {!auth?.isAuthenticated ?
                <>
                <Flex width={'full'} h={'full'} flexDir={'column'} alignItems={'center'}>
                    <Box>
                        <Text fontSize='lg' as={'b'}>{selectedCountry} Market Mood</Text>
                        <Divider/>
                    </Box>
                    <Flex h={'full'} alignItems={'center'} justifyContent={'center'}>
                        <Alert status='info' width={'94%'} h={'fit-content'} justifyContent={'center'} borderRadius={5}>
                        <AlertIcon />
                            Register/Login to access premium features!
                        </Alert>
                    </Flex>
                </Flex>
                </> : <MoodGauge country={selectedCountry} measure={selectedMeasure}/>
                }
                
            </Flex>
            <Flex flex={1}>
                {!auth?.isAuthenticated ?
                <>
                <Flex width={'full'} h={'full'} flexDir={'column'} alignItems={'center'}>
                    <Box>
                        <Text fontSize='lg' as={'b'}>{selectedCountry} Market Mood Prediction ({selectedMeasure})</Text>
                        <Divider/>
                    </Box>
                    <Flex h={'full'} alignItems={'center'} justifyContent={'center'}>
                        <Alert status='info' width={'94%'} h={'fit-content'} justifyContent={'center'} borderRadius={5}>
                        <AlertIcon />
                            Register/Login to access premium features!
                        </Alert>
                    </Flex>
                </Flex>
                </> : <PredictionChart country={selectedCountry} measure={selectedMeasure}/>
                }
            </Flex>
        </Flex>
    </Flex>
  )
}
