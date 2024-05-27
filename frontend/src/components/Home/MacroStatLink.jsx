import { Box, Button, Flex, Menu, MenuButton, MenuItem, MenuList, Stat, StatArrow, StatHelpText, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

export const MacroStatLink = ({name='MacroName', perc=null, trend = false, country, index = null}) => {
    const navigate = useNavigate();

    const redirect =  () => {
        let url = `/stat_view?country=${country.toLowerCase()}&index=${index}`
        navigate(url, {replace: true})
    }
  return (
    <Box display={'flex'} height={'auto'} justifyContent={'space-between'} alignItems={'center'} as='button' onClick={() => redirect()}>
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
