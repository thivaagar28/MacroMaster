import { Flex, Icon, Link, Menu, MenuButton, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

export const NavItem = ({icon, title, collapse, path}) => {
  const navigate = useNavigate();
  return (
    <Flex mt={30} flexDir={'column'} w={'100%'} alignItems={collapse ? 'flex-start' : 'center'}>
        <Menu >
            <Link p={3} borderRadius={8} _hover={{textDecor: 'none', backgroundColor: 'RGBA(255, 255, 255, 0.24)'}} w={collapse && '100%'} onClick={() => navigate(`${path}`, {replace: true})}>
                <MenuButton w={'100%'}>
                    <Flex>
                        <Icon as={icon} fontSize={'xl'}/>
                        <Text ml={5} display={collapse ? 'flex' : "none"}>{title}</Text>
                    </Flex>
                </MenuButton>
            </Link>
        </Menu>
    </Flex>
  )
}
