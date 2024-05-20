import { SimpleGrid } from '@chakra-ui/react'
import { MacroStat } from './MacroStat'

export const MacroData = () => {
  return (
    <SimpleGrid w={'full'} columns={4} spacingX='5' spacingY='5px'>
      <MacroStat name='Consumer Price Index (CPI)' trend={true} />
      <MacroStat name='Inflation Growth Rate'/> 
      <MacroStat name='Goverment Reserves'/>
      <MacroStat name='Industrial Production'/>
      <MacroStat name='Long Term Interest Rate'/>
      <MacroStat name='Short Term Interest Rate'/>
      <MacroStat name='Gross Domestic Product (GDP)'/>
      <MacroStat name='Unemployment Rate'/>
      <MacroStat name='Producer Price Index (PPI)'/>
      <MacroStat name='Trade In Goods'/>
      <MacroStat name='Business Cycle Indicators (BCI)'/>
    </SimpleGrid>
  )
}
