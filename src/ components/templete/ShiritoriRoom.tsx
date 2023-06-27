import React, { useEffect, useRef, useState } from 'react'
import { Box } from '@chakra-ui/react'

import VoiceInput from '../molucule/VoiceInput'
import InputList from '../molucule/InputList'
import DuplicationModal from '../molucule/DuplicationModal'

const ShiritoriRoom: React.FC = () => {
  const [voiceList, setVoiceList] = useState<string[]>([])
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [prevLastWord, setPrevLastWord] = useState<string>('')
  const [isCheck, setIsCheck] = useState<boolean>(false)

  const chatContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (voiceList.length === 0) return
    // 重複があるかどうかを判定
    const isDuplication = voiceList.filter((x, i, self) => self.indexOf(x) !== i)
    const array = [...voiceList]
    // 最後が「ん」か？
    const lastWord = array.pop()
    const isEndWithN = lastWord?.endsWith('ん')
    if (isDuplication.length > 0 || isEndWithN) {
      return setIsModalOpen(true)
    }
    // 最後の文字が前回の最後の文字と同じか？
    if (lastWord?.startsWith(prevLastWord) || prevLastWord === undefined) {
      const lastWordLastChar = voiceList[voiceList.length - 1]?.charAt(voiceList[voiceList.length - 1].length - 1)
      const lastWordPrevLastChar = voiceList[voiceList.length - 1]?.charAt(voiceList[voiceList.length - 1].length - 2)
      switch (lastWordLastChar) {
        case 'ゃ':
          setPrevLastWord('や')
          break
        case 'ゅ':
          setPrevLastWord('ゆ')
          break
        case 'ょ':
          setPrevLastWord('よ')
          break
        case 'ぁ':
          setPrevLastWord('あ')
          break
        case 'ぃ':
          setPrevLastWord('い')
          break
        case 'ぅ':
          setPrevLastWord('う')
          break
        case 'ぇ':
          setPrevLastWord('え')
          break
        case 'ぉ':
          setPrevLastWord('お')
          break

        case 'ー':
          setPrevLastWord(lastWordPrevLastChar)
          break
        default:
          setPrevLastWord(lastWordLastChar)
          break
      }
    } else {
      setIsModalOpen(true)
      setPrevLastWord('')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [voiceList])

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }
  useEffect(() => {
    scrollToBottom()
  }, [voiceList])
  return (
    <>
      {isModalOpen && <DuplicationModal isOpen={isModalOpen} setClose={() => setIsModalOpen(false)} />}
      <Box mx={4} my={16} ref={chatContainerRef} style={{ maxHeight: 'calc(100vh - 100px)', overflowY: 'scroll' }}>
        <Box textAlign={'center'} position="sticky" top={0} bgColor={'white'}>
          <VoiceInput voiceList={voiceList} setVoiceList={setVoiceList} prevLastWord={prevLastWord} isCheck={isCheck} />
        </Box>
        <InputList list={voiceList} setIsCheck={setIsCheck} isCheck={isCheck} />
      </Box>
      <a href="http://www.goo.ne.jp/" style={{ width: '100px', display: 'block', margin: '0 auto' }}>
        <img src="//u.xgoo.jp/img/sgoo.png" alt="supported by goo" title="supported by goo" />
      </a>
    </>
  )
}

export default ShiritoriRoom
