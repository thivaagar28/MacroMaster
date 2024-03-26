import { Box, Button, Flex, HStack, Heading, Text, Tooltip, useToast } from "@chakra-ui/react"
import { Sidebar } from "../../NavBar/Sidebar"
import './DefaultLayout.css'
import { useState } from "react"
import { useAuth } from '../../../hooks/useAuth'
import { FiLogIn, FiLogOut } from "react-icons/fi"
import { useLocation, useNavigate } from "react-router-dom"


export const DefaultLayout = ({children}) => {
  const auth = useAuth();
  const {logout} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapse, setCollapse] = useState(false);
  const handleCollapse= (value) =>{
    setCollapse(value) 
  };
  const toast = useToast();

  const user_logout = async () =>{
    const promise = new Promise(async (resolve, reject) => {
      try {
        await logout();
        resolve(200);
      } catch (error) {
        reject(error);
      }
    })
    // Will display the loading toast until the promise is either resolved
    // or rejected.
    toast.promise(promise, {
      success: { title: 'Logout successful', description: 'You have been logged out', isClosable: true, position:'bottom-right' },
      error: { title: 'Logout failed', description: 'Unable to log out. Please try again later.', isClosable: true, position:'bottom-right' },
      loading: { title: 'Logging out', description: 'Please wait while we log you out', isClosable: true, position:'bottom-right' },
    })
  }

  return ( /*auth.isInitialized  &&*/ ( //prevent non-initialized content glimpse but has spinner functionality
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
      flexDirection="column"
      position="relative" px={2} py={3}>
        <Flex alignContent={'center'} justifyContent={'space-between'} px={4}>
          <Flex flexDir={"column"}>
            <Text >The New Approach</Text>
            <Heading as="h1" size="lg" fontFamily={'roboto'}>MacroMaster</Heading>
          </Flex>
          <Flex justifyContent={"center"} alignItems={"center"} flexDir={'row'}>
            <Heading as="h1" size="md" fontFamily={'roboto'}>Welcome {auth?.isAuthenticated ? `${auth.user.username}` : 'Guest'}</Heading>
            <Tooltip>
              {auth?.isAuthenticated ? <Button ml={3} rightIcon={<FiLogOut />} loadingText="Logging Out" variant={'outline'} colorScheme="purple" size={'sm'} onClick={user_logout}>Log Out</Button> : <Button ml={3} rightIcon={<FiLogIn />} variant={'outline'} colorScheme="purple" size={'sm'} onClick={() => navigate("/login", {replace: true, state: { from: location }})}>Login / Register</Button> }
            </Tooltip>
          </Flex>
        </Flex>
        <Flex h={'full'} p={2} position={'relative'} justifyContent={'center'} alignItems={'center'}>{children}</Flex>
        </Flex>
    </HStack>
        
  ))
}

