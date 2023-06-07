import React, { useState } from 'react'
import VoiceInput from '../molucule/VoiceInput'
import InputList from '../molucule/InputList'
import { Box } from '@chakra-ui/react'

const ShiritoriRoom = () => {
  const [voiceList, setVoiceList] = useState<string[]>([])

  return (
    <Box mx={4} my={16}>
      <VoiceInput voiceList={voiceList} setVoiceList={setVoiceList} />
      <InputList list={voiceList} />
    </Box>
  )
}

export default ShiritoriRoom
