import { Flex, Heading, Tab, TabList, TabPanel, TabPanels, Tabs, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { DetailsForm } from './DetailsForm'
import { PasswordForm } from './PasswordForm'

export const AccountSettings = () => {
  return (
    <Flex flexDir={'column'} justifyContent={'center'} alignItems={'center'} background={useColorModeValue('gray.100', "gray.700")} p={12} rounded={6}>
        <Heading mb={6}>Change</Heading>
        <Tabs isFitted variant='soft-rounded' colorScheme='purple'>
            <TabList >
                <Tab>Details</Tab>
                <Tab>Password</Tab>
            </TabList>
            <TabPanels >
                <TabPanel>
                    <DetailsForm/>
                </TabPanel>
                <TabPanel>
                    <PasswordForm/>
                </TabPanel>
            </TabPanels>
        </Tabs>
    </Flex>
  )
}
