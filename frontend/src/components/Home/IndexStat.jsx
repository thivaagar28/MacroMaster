import { Box, Flex, Stat, StatArrow, StatHelpText, StatNumber, Text, Tooltip, } from '@chakra-ui/react'
import React from 'react'
import { FiHelpCircle } from 'react-icons/fi'

export const IndexStat = ({index_name = 'Index Name', ticker='Ticker', desc='Index Description', value = '00.00', perc= '00.00'}) => {
  return (
    <>
    <Flex>
      <Stat>
        <Flex flexDir={'row'} alignItems={'center'}>
          <Text fontWeight={'md'} mr={3}>{`${index_name} (${ticker})`}</Text>
          <Tooltip label={desc} placement='right' variant="blackMode" hasArrow>
            <Box><FiHelpCircle/></Box>
          </Tooltip>
        </Flex>
        <StatNumber>$ {value}</StatNumber>
        <StatHelpText >
          {perc > 0 ? <StatArrow type='increase' /> : <StatArrow type='decrease' /> }
          {perc} %
        </StatHelpText>
      </Stat>
    </Flex>
  </>
  )
}
