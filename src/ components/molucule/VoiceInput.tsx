import React, { useEffect, useState } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { Box, Button, Flex, Stack, Text, keyframes } from '@chakra-ui/react'

type Props = {
  voiceList: string[]
  setVoiceList: React.Dispatch<React.SetStateAction<string[]>>
}

const VoiceInput: React.FC<Props> = ({ voiceList, setVoiceList }) => {
  const { transcript, finalTranscript, listening, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition()

  useEffect(() => {
    if (finalTranscript === '') return
    setVoiceList([...voiceList, finalTranscript])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finalTranscript])

  console.log(voiceList)

  if (!browserSupportsSpeechRecognition) {
    return <span>ブラウザが音声認識未対応です</span>
  }

  const animationKeyframes = keyframes`
  0% {
    transform: translate(-50%, -50%) scale(1, 1);
    background-color: red;
    color:red;
  }
  100% {
    transform: translate(-50%, -50%) scale(4, 4);
    background-color: rgba(red, 0.2)
  }
`

  const animation = `${animationKeyframes} 2s ease-in-out infinite`

  return (
    <div id="react-speech-recognition">
      <Box
        w={10}
        h={10}
        mx={'auto'}
        position={'relative'}
        transition={'cubic-bezier(0.215, 0.61, 0.355, 1) .4s'}
        _after={{
          display: listening ? 'block' : 'none',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          content: '""',
          transition: 'opacity linear 0.4s',
          animation,
        }}
      >
        <Text>{listening ? 'on' : 'off'}</Text>
      </Box>

      <Flex gap={4} justifyContent={'center'} my={8}>
        <Button colorScheme="teal" variant="outline" onClick={() => SpeechRecognition.startListening()}>
          音声入力開始
        </Button>
        <Button colorScheme="red" variant="outline" onClick={() => resetTranscript()}>
          リセット
        </Button>
      </Flex>
      <Text h={6}>{transcript}</Text>
    </div>
  )
}
export default VoiceInput
