import {Box, Divider, Flex, IconButton, Text, Heading, Avatar } from '@chakra-ui/react'
import {
    FiMenu,
    FiX,
    FiHome,
    FiUser,
    FiSettings
} from 'react-icons/fi'
import { NavItem } from './NavItem';
import { ThemeToggle } from './ThemeToggle';
import { useAuth } from '../../hooks/useAuth';

export const Sidebar = ({collapse, setCollapse}) => {
  const auth = useAuth();
  return (
    <>
    <Box flexDirection={'column'} alignItems={'baseline'} w={'full'}>
      <Flex flexDir={'column'} w={'100%'} alignItems={collapse ? 'center' : 'center'}>
        <IconButton background={'none'} icon={ collapse ? <FiX strokeWidth={3}/> : <FiMenu  strokeWidth={3}/>} fontSize={'2xl'} color={'#d4a600'} onClick={() => {
          collapse ? setCollapse(false) : setCollapse(true)
        }}/>
      </Flex>
      <NavItem collapse={collapse} icon={FiHome} title={"Dashboard"} path='/' />
      {auth?.isAuthenticated && <><NavItem collapse={collapse} icon={FiUser} title={"Account"} path='/account_settings'/>
      {/*<NavItem collapse={collapse} icon={FiSettings} title={"Settings"} />*/}
      </>}
    </Box>
    <Flex p={'5%'} flexDir={'column'}w={'100%'} alignItems={collapse ? "center" : 'center'} mb={2}>
      {auth?.isAuthenticated && <ThemeToggle collapse={collapse}/>}
      <Divider mb={4}/>
      <Flex mt={4} align="center">
          <Avatar size="sm" src="avatar-1.jpg" />
          <Flex flexDir="column" ml={4} display={collapse ? "flex" : "none"}>
              <Heading as="h3" size="sm">{auth?.user ? `${auth.user.first_name} ${auth.user.last_name}` : "Guest"}</Heading>
              {auth.user && <Text color="gray">{auth.user.email}</Text>}
          </Flex>
      </Flex>
    </Flex>
    </>
  )
}
