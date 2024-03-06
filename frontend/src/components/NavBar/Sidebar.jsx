import {Box, Divider, Flex, IconButton, Text, Heading, Avatar } from '@chakra-ui/react'
import {
    FiMenu,
    FiX,
    FiHome,
    FiUser,
    FiSettings
} from 'react-icons/fi'
import { NavItem } from './NavItem';

export const Sidebar = ({collapse, setCollapse}) => {
  return (
    <>
    <Box flexDirection={'column'} alignItems={'baseline'} w={'full'}>
        <Flex flexDir={'column'} w={'100%'} alignItems={collapse ? 'center' : 'center'}>
          <IconButton background={'none'} icon={ collapse ? <FiX strokeWidth={3}/> : <FiMenu  strokeWidth={3}/>} fontSize={'2xl'} color={'#d4a600'} onClick={() => {
            collapse ? setCollapse(false) : setCollapse(true)
          }}/>
        </Flex>
        <NavItem collapse={collapse} icon={FiHome} title={"Dashboard"} description={'Home'}/> {/* Need navigation */}
        <NavItem collapse={collapse} icon={FiUser} title={"Account"} description={'Account Settings'}/> {/* Need to hide button when guest and navigation */}
        <NavItem collapse={collapse} icon={FiSettings} title={"Settings"} description={'Application Settings'}/>
    </Box>
    <Flex 
        p={'5%'}
        flexDir={'column'}
        w={'100%'}
        alignItems={collapse ? "center" : 'center'}
        mb={2}>
        <Divider mb={4}/>
        <Flex mt={4} align="center">
            <Avatar size="sm" src="avatar-1.jpg" />
            <Flex flexDir="column" ml={4} display={collapse ? "flex" : "none"}>
                <Heading as="h3" size="sm">Thivaagar Loganathan</Heading> {/* Should be replaced with current user name and email using jwt */}
                <Text color="gray">thivaagar28@gmail.com</Text>
            </Flex>
        </Flex>
    </Flex>
    </>
  )
}
