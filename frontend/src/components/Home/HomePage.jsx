import { Button, Flex, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { MacroIndex } from './MacroIndex'
import { FngGauge } from './FngGauge'
import { LineChart } from './LineChart'


export const HomePage = () => {
  return (
    <Flex w={'full'} h={'full'} flexDir={'column'}>
        <Flex justifyContent={'flex-start'}>
            <Menu>
                {({ isOpen }) => (
                    <>
                    <MenuButton mr={4} size={'sm'} isActive={isOpen} as={Button} rightIcon={ isOpen ? <FiChevronUp strokeWidth={3} color={'#d4a600'}/> : <FiChevronDown strokeWidth={3} color={'#d4a600'}/>} >
                        Select Country
                    </MenuButton>
                    <MenuList size={'sm'}>
                        <MenuItem >Malaysia</MenuItem>
                        <MenuItem onClick={() => alert('Kagebunshin')}>USA (Global)</MenuItem>
                    </MenuList>
                    </>
                )}
            </Menu>
            <Menu>
                {({ isOpen }) => (
                    <>
                    <MenuButton size={'sm'} isActive={isOpen} as={Button} rightIcon={ isOpen ? <FiChevronUp strokeWidth={3} color={'#d4a600'}/> : <FiChevronDown strokeWidth={3} color={'#d4a600'}/>} >
                        Period
                    </MenuButton>
                    <MenuList>
                        <MenuItem>...</MenuItem>
                    </MenuList>
                    </>
                )}
            </Menu>
        </Flex>
        <MacroIndex/>
        <Flex flex={1} pt={3}>
            <Flex w={'45%'} justifyContent={'center'}>
                <FngGauge/>
            </Flex>
            <Flex flex={1}>
                <LineChart/>
            </Flex>
        </Flex>
    </Flex>
  )
}
