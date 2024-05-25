import React from 'react'
import { Box, Text } from '@chakra-ui/react';

export const NumberDisplay = ({number}) => {
    let bgColor;
    if (number > 0 && number < 15) {
        bgColor = 'red.500';
    } else if (number >= 15 && number < 35) {
        bgColor = 'yellow.500';
    } else if (number >= 35 && number < 65) {
        bgColor = 'green.500';
    } else if (number >= 65 && number < 85) {
        bgColor = 'yellow.500';
    } else if (number >= 85 && number <= 100) {
        bgColor = 'red.500';
    } else {
        bgColor = 'gray.500'; // Default color for values outside the specified range
    }
  return (
    <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            bg={bgColor}
            border={'1px'}
            borderColor={'gray.200'}
            borderRadius="50%"
            width="fit-content"
            height="fit-content"
            px={1}
        >
        <Text fontSize="lg" fontWeight="semi-bold" color="white">
            {number}
        </Text>
    </Box>
  )
}
