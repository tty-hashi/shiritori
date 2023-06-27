import React, { useEffect } from 'react'
import axios from 'axios'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { Box, Button, Flex, Text, keyframes } from '@chakra-ui/react'

type Props = {
  voiceList: string[]
  setVoiceList: React.Dispatch<React.SetStateAction<string[]>>
  prevLastWord: string
  isCheck: boolean
}

const VoiceInput: React.FC<Props> = ({ voiceList, setVoiceList, prevLastWord, isCheck }) => {
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
    <div id="react-speech-recognition" style={{ display: isCheck ? 'none' : 'block' }}>
      {prevLastWord && <Text p={4}>{`次のはじめの文字は、「${prevLastWord}」`}</Text>}
      {voiceList.length !== 0 && <Text p={4}>{`今は、${voiceList.length + 1}回目`}</Text>}

      <Button
        colorScheme="teal"
        variant="solid"
        w={'80%'}
        maxW={'300px'}
        p={8}
        fontSize={'2xl'}
        onClick={() => SpeechRecognition.startListening()}
        position={'relative'}
        transition={'cubic-bezier(0.215, 0.61, 0.355, 1) .4s'}
        _after={{
          display: listening ? 'block' : 'none',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 4,
          height: 4,
          borderRadius: '50%',
          content: '""',
          transition: 'opacity linear 0.4s',
          animation,
        }}
      >
        スタート
      </Button>
      <Flex gap={4} justifyContent={'center'} my={8}>
        <Button p={8} colorScheme="red" variant="outline" onClick={resetOnClickHandler}>
          さいしょから
        </Button>
        <Button p={8} colorScheme="teal" variant="outline" onClick={prevOnClickHandler}>
          戻す
        </Button>
      </Flex>
      <Text h={6}>{transcript}</Text>
    </div>
  )
}
export default VoiceInput
