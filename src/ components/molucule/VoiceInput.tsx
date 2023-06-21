import React, { useEffect } from 'react'
import axios from 'axios'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { Box, Button, Flex, Text, keyframes } from '@chakra-ui/react'

type Props = {
  voiceList: string[]
  setVoiceList: React.Dispatch<React.SetStateAction<string[]>>
}

const VoiceInput: React.FC<Props> = ({ voiceList, setVoiceList }) => {
  const { transcript, finalTranscript, listening, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition()

  // ひらがな化API
  const gooApiKey = process.env.REACT_APP_GOO_API_KEY
  const gooApiUrl = 'https://labs.goo.ne.jp/api/hiragana'

  const convertToHiragana = async (word: string) => {
    if (!gooApiKey || !word) return
    axios
      .post(gooApiUrl, {
        app_id: gooApiKey,
        sentence: word,
        output_type: 'hiragana',
      })
      .then((res) => {
        setVoiceList([...voiceList, res.data.converted])
      })
  }

  useEffect(() => {
    if (finalTranscript === '') return
    convertToHiragana(finalTranscript)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finalTranscript])

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

  const resetOnClickHandler = () => {
    resetTranscript()
    setVoiceList([])
  }

  const prevOnClickHandler = () => {
    const array = [...voiceList]
    array.pop()
    resetTranscript()
    setVoiceList(array)
  }

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
        <Button colorScheme="teal" variant="solid" onClick={() => SpeechRecognition.startListening()}>
          スタート
        </Button>
        <Button colorScheme="red" variant="outline" onClick={resetOnClickHandler}>
          さいしょから
        </Button>
        <Button colorScheme="teal" variant="outline" onClick={prevOnClickHandler}>
          戻す
        </Button>
      </Flex>
      <Text h={6}>{transcript}</Text>
    </div>
  )
}
export default VoiceInput
