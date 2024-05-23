import { Box, Flex, Stat, StatArrow, StatHelpText, Text } from '@chakra-ui/react'

export const MacroStat = ({name='MacroName', perc=null, trend = false}) => {
  return (
    <Box display={'flex'} height={'auto'} justifyContent={'space-between'} alignItems={'center'}>
      <Text>{name}</Text>
      <Flex alignItems={'center'}>
        <Stat>
          <StatHelpText m={0} whiteSpace={'nowrap'}>
            {perc !== null ? 
            <>
              <StatArrow type={ trend ? 'increase' : 'decrease'}/>
              {perc} %
            </>:
              <Text>NaN</Text>
            }
        </StatHelpText>
        </Stat>
      </Flex>
    </Box>
  )
}


/*<Flex flexDir={'row'} mr={10} w={'20%'} justifyContent={'space-between'}>
        <Text>{name}</Text>
        <Text fontWeight={'md'}>{value}</Text>
  </Flex>*/