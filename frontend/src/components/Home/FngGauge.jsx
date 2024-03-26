import { Box, Divider, Flex, Text } from '@chakra-ui/react'
import GaugeComponent from 'react-gauge-component';

export const FngGauge = () => {
  return (
    <Flex w={'full'} justifyContent={'center'} alignItems={'center'} flexDir={'column'}>
        <Box>
            <Text fontSize='lg' as={'b'}>Fear & Greed Index</Text>
            <Divider/>
        </Box>
        <Flex flexDirection={'row'}>
            <GaugeComponent
                value={50}
                type="radial"
                labels={{
                    valueLabel: { formatTextValue: value => value},
                    tickLabels: {
                    type: "inner",
                    ticks: [
                        { value: 20 },
                        { value: 40 },
                        { value: 60 },
                        { value: 80 },
                        { value: 100 }
                    ]
                    }
                }}
                arc={{
                    colorArray: ['#5BE12C','#EA4228'],
                    subArcs: [{limit: 10}, {limit: 30}, {}, {}, {}],
                    padding: 0.02,
                    width: 0.3
                }}
                pointer={{
                    elastic: true,
                    animationDelay: 0
                }}
            />    
            <Flex h={'full'} justifyContent={'space-around'} flexDir={'column'}>
                <Text>Previous Close</Text>
                <Text>1 week ago</Text>
                <Text>1 month ago</Text>
                <Text>1 year ago</Text>
            </Flex>
        </Flex>
    </Flex>
  )
}
