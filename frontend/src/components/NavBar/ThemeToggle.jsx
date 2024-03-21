import { Switch, useColorMode, Flex, Text } from "@chakra-ui/react"


export const ThemeToggle = ({collapse = false, ...rest}) => {
    const {toggleColorMode, colorMode} =  useColorMode();
  return (
    <>
    <Flex mb={30} flexDir={'row'} w={'100%'} alignItems={'center'} justifyContent={collapse ? 'flex-start' : 'center'}>
      <Switch size={'md'} isChecked={colorMode === 'dark'} isDisabled={false} value={colorMode} colorScheme="green" onChange={toggleColorMode} {...rest}/>
      <Text ml={5} display={collapse ? 'flex' : "none"}>Dark Mode</Text>
    </Flex>
    </>
  )
}