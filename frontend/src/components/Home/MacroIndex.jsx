import { Divider, Flex, Text } from '@chakra-ui/react'
import { IndexStat } from './IndexStat'
import { MacroData } from './MacroData'

export const MacroIndex = () => {
  return (
    <Flex mt={3} bg="RGBA(100,84,132, 0.51)" h={'40%'} borderRadius="2xl" position={'relative'} flexDir={'row'} justifyContent={'flex-start'}>
        <Flex bg={'#47406F'} w={'5%'} h={"full"}  borderTopLeftRadius={'2xl'} borderBottomLeftRadius={'2xl'} justifyContent={'center'} alignItems={'center'}>
            <Text fontSize={'lg'}  py={2} whiteSpace={'nowrap'} pos={'absolute'} h={'fit-content'} transformOrigin={'center'} transform={'rotate(-90.28deg)'}>Macroeconomic 101</Text>
        </Flex>
        <Flex w={'full'} p={2} flexDir={'column'}>
            <Flex h={'fit-content'} px={3} justifyContent={'space-around'}>
                <IndexStat index_name='NASDAQ' ticker='^IXIC' desc='Nasdaq Composite'/>
                <IndexStat index_name='S&P500' ticker='^GSPC'desc="Standard & Poor's 500 Index"/>
                <IndexStat index_name='DJIA' ticker='^DJI' desc='Dow Jones Industrial Average'/>
                <IndexStat index_name='CBOE VIX'ticker='^VIX' desc="Chicago Board Options Exchange's CBOE Volatility Index"/>
            </Flex>
            <Divider my={1}/>
            <Flex flex={1} px={5}>
              <MacroData/>
            </Flex>
        </Flex>
    </Flex>
  )
}
