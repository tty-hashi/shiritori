import React from 'react'
import { Box, Button, Link, Stack, Text } from '@chakra-ui/react'
import { FiExternalLink } from 'react-icons/fi'
import { AiFillPicture } from 'react-icons/ai'

type Props = {
  list: string[]
  isCheck: boolean
  setIsCheck: React.Dispatch<React.SetStateAction<boolean>>
}

const InputList: React.FC<Props> = ({ list, setIsCheck, isCheck }) => {
  const isEven = (num: number) => (num % 2 === 0 ? true : false)
  return (
    <Stack maxW={700} mx={'auto'} my={8} gap={6}>
      {list.map((item: string, index) => (
        <Box
          key={item}
          bg={isEven(index) ? 'red.100' : 'green.100'}
          w={'70%'}
          ml={!isEven(index) ? 'auto' : 0}
          py={2}
          px={4}
          borderRadius={isEven(index) ? '0 15px 15px 15px' : '15px 0 15px 15px'}
          textAlign={'left'}
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          {item}
          <Box display={'flex'} gap={4}>
            <Link p={2} target="blank" href={`https://ja.wikipedia.org/wiki/${item}`}>
              <FiExternalLink size={'2em'} />
            </Link>
            <Link p={2} target="blank" href={`https://www.google.com/search?tbm=isch&q=${item}`}>
              <AiFillPicture size={'2em'} />
            </Link>
          </Box>
        </Box>
      ))}
      <Button maxW={'300px'} margin={'auto'} onClick={() => setIsCheck((prev) => !prev)}>
        {isCheck ? 'もどる' : 'かくにんする'}
      </Button>
    </Stack>
  )
}

export default InputList
