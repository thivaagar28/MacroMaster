import { Divider, Flex, Text, Spinner } from '@chakra-ui/react'
import { IndexStat } from './IndexStat'
import { SimpleGrid } from '@chakra-ui/react'
import { MacroStat } from './MacroStat'
import { MacroStatLink} from './MacroStatLink'
import { useAuth } from '../../hooks/useAuth';

export const MacroIndex = ({data, country}) => {
  const auth = useAuth();

  const trend_check_p = (value) => {
    return (value > 0)
  }
    
  const trend_check_n = (value) => {
    return (value < 0)
  }

  return (
    <Flex mt={3} bg="RGBA(100,84,132, 0.51)" h={'40%'} borderRadius="2xl" position={'relative'} flexDir={'row'} justifyContent={'flex-start'}>
        <Flex bg={'#47406F'} w={'5%'} h={"full"}  borderTopLeftRadius={'2xl'} borderBottomLeftRadius={'2xl'} justifyContent={'center'} alignItems={'center'}>
            <Text fontSize={'lg'}  py={2} whiteSpace={'nowrap'} pos={'absolute'} h={'fit-content'} transformOrigin={'center'} transform={'rotate(-90.28deg)'}>Macroeconomic 101</Text>
        </Flex>
        {data ? 
          <Flex w={'full'} p={2} flexDir={'column'}>
            <Flex h={'fit-content'} px={3} justifyContent={'space-around'}>
              {country === 'USA' ?
                <>
                  <IndexStat index_name='NASDAQ' ticker='^IXIC' desc='Nasdaq Composite' value={data.ixic_close} perc={data.ixic}/>
                  <IndexStat index_name='S&P500' ticker='^GSPC'desc="Standard & Poor's 500 Index" value={data.gspc_close} perc={data.gspc}/>
                  <IndexStat index_name='DJIA' ticker='^DJI' desc='Dow Jones Industrial Average'value={data.dji_close} perc={data.dji}/>
                  <IndexStat index_name='CBOE VIX'ticker='^VIX' desc="Chicago Board Options Exchange's CBOE Volatility Index" value={data.vix_close} perc={data.vix}/>
                </>  
               : <>
                  <IndexStat index_name='KLCI'ticker='^KLSE' desc="FTSE Bursa Malaysia KLCI" value={data.klse_close}  perc={data.klse}/>
               </>}
            </Flex>
            <Divider my={1}/>
            <Flex flex={1} px={5}>
              <SimpleGrid w={'full'} columns={4} spacingX='5' spacingY='5px'>
                {!auth?.isAuthenticated ? 
                <>
                <MacroStat name='Consumer Price Index (CPI)' perc={data.cpi} trend={trend_check_p(data.cpi)} />
                <MacroStat name='Inflation Growth Rate' perc={data.inf} trend={trend_check_n(data.inf)} /> 
                <MacroStat name='Goverment Reserves (Billions)' perc={data.ipi} trend={trend_check_p(data.cpi)} />
                <MacroStat name='Industrial Production Index' perc={data.ipi} trend={trend_check_p(data.ipi)} />
                <MacroStat name='Long Term Interest Rate' perc={data.lt_ir} trend={trend_check_n(data.lt_ir)} />
                <MacroStat name='Short Term Interest Rate' perc={data.st_ir} trend={trend_check_n(data.st_ir)} />
                <MacroStat name='Gross Domestic Product (GDP)' perc={data.gdpt} trend={trend_check_p(data.gdpt)} />
                <MacroStat name='Unemployment Rate'  perc={data.ur} trend={trend_check_n(data.ur)}/>
                <MacroStat name='Producer Price Index (PPI)'  perc={data.ppi} trend={trend_check_n(data.ppi)}/>
                <MacroStat name='Wholesale & Retail Trade'  perc={data.wrt} trend={trend_check_p(data.wrt)}/>
                <MacroStat name='Business Cycle Indicators (BCI)' perc={data.bcli} trend={trend_check_p(data.bcli)}/>
                </> : 
                <>
                <MacroStatLink name='Consumer Price Index (CPI)' perc={data.cpi} trend={trend_check_p(data.cpi)} country={country} index={'cpi'}/>
                <MacroStatLink name='Inflation Growth Rate' perc={data.inf} trend={trend_check_n(data.inf)} country={country} index={'inf'}/> 
                <MacroStatLink name='Goverment Reserves (Billions)' perc={data.ipi} trend={trend_check_p(data.cpi)} country={country} index={'gr'}/>
                <MacroStatLink name='Industrial Production Index' perc={data.ipi} trend={trend_check_p(data.ipi)} country={country} index={'ipi'}/>
                <MacroStatLink name='Long Term Interest Rate' perc={data.lt_ir} trend={trend_check_n(data.lt_ir)} country={country} index={'lt_ir'}/>
                <MacroStatLink name='Short Term Interest Rate' perc={data.st_ir} trend={trend_check_n(data.st_ir)} country={country} index={'st_ir'}/>
                <MacroStatLink name='Gross Domestic Product (GDP)' perc={data.gdpt} trend={trend_check_p(data.gdpt)} country={country} index={'gdp'}/>
                <MacroStatLink name='Unemployment Rate'  perc={data.ur} trend={trend_check_n(data.ur)} country={country} index={'ur'}/>
                <MacroStatLink name='Producer Price Index (PPI)'  perc={data.ppi} trend={trend_check_n(data.ppi)} country={country} index={'ppi'}/>
                <MacroStatLink name='Wholesale & Retail Trade'  perc={data.wrt} trend={trend_check_p(data.wrt)} country={country} index={'wrt'}/>
                <MacroStatLink name='Business Cycle Indicators (BCI)' perc={data.bcli} trend={trend_check_p(data.bcli)} country={country} index={'bcli'}/>
                </>
                }
                <Flex border={'3px solid'} borderColor={'#d4a600'} justifyContent={'center'} alignItems={'center'}>Data Cut-Off Date: 17th May 24</Flex>
              </SimpleGrid>
            </Flex>
          </Flex> : 
          <Flex w={'full'} h={'full'} justifyContent={'center'} alignItems={'center'}>
            <Spinner thickness='4px' speed='0.65s' emptyColor='green.200' color='green.500' size={'xl'}/>
          </Flex>
        }
    </Flex>
    
  )
}
