import { Box, Stack } from '@chakra-ui/react'
import React from 'react'

type Props = {
  list: string[]
}

const InputList: React.FC<Props> = ({ list }) => {
  const isEven = (num: number) => (num % 2 === 0 ? true : false)
  return (
    <Stack maxW={700} mx={'auto'} my={8} gap={6}>
      {list.map((item: string, index) => (
        <Box
          key={item}
          bg={isEven(index) ? 'red.100' : 'green.100'}
          w={'60%'}
          ml={!isEven(index) ? 'auto' : 0}
          py={2}
          px={4}
          borderRadius={isEven(index) ? '0 15px 15px 15px' : '15px 0 15px 15px'}
          textAlign={'left'}
        >
          {item}
        </Box>
      ))}
    </Stack>
  )
}

export default InputList
