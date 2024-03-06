import { Box, Flex, HStack } from "@chakra-ui/react"
import { Sidebar } from "../../NavBar/Sidebar"
import './DefaultLayout.css'
import { useState } from "react"

export const DefaultLayout = ({children}) => {
  const [collapse, setCollapse] = useState(false);
  const handleCollapse= (value) =>{
    setCollapse(value) 
  };
  return (
    <HStack  flexDirection={'row'} p={3} w="full" h="100vh">
        <Flex pos={'absolute'} w={'full'} h={"100vh"} top={0} left={0} bgImage={"background.jpg"} bgPosition={'center'} bgRepeat={'no-repeat'} bgSize={'cover'} zIndex={-5}/>
        <Box className="bg" zIndex={-4}/>
        <Flex h={'100%'} 
          w={collapse ? 250 : 75} 
          bg="rgba(255, 255, 255, 0.2)"
          backdropFilter={'blur(30px)'}
          alignItems={collapse ? 'flex-start' :"center"}
          p={4}
          flexDirection="column"
          justifyContent="space-between"
          transition="ease-out .2s"
          boxShadow={'0 4px 12px 0 rgba(0, 0, 0, 0.05)'}
          borderRadius="3xl"><Sidebar collapse={collapse} setCollapse={handleCollapse}/></Flex>
        <Flex w="full"
        h="full"
        bg="RGBA(255, 255, 255, 0.24)"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        position="relative"
        borderRadius="3xl">{children}</Flex>
    </HStack>
        
  )
}

