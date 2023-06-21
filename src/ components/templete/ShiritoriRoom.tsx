import React, { useEffect, useState } from 'react'
import { Box } from '@chakra-ui/react'

import VoiceInput from '../molucule/VoiceInput'
import InputList from '../molucule/InputList'
import DuplicationModal from '../molucule/DuplicationModal'

const ShiritoriRoom: React.FC = () => {
  const [voiceList, setVoiceList] = useState<string[]>([])
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [prevLastWord, setPrevLastWord] = useState<string>('')

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
      setPrevLastWord(voiceList[voiceList.length - 1]?.charAt(voiceList[voiceList.length - 1].length - 1))
    } else {
      setIsModalOpen(true)
      setPrevLastWord('')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [voiceList])

  return (
    <>
      {isModalOpen && <DuplicationModal isOpen={isModalOpen} setClose={() => setIsModalOpen(false)} />}
      <Box mx={4} my={16}>
        <Box textAlign={'center'} position="sticky" top={0} bgColor={'white'}>
          <VoiceInput voiceList={voiceList} setVoiceList={setVoiceList} />
        </Box>
        <InputList list={voiceList} />
      </Box>
      <a href="http://www.goo.ne.jp/" style={{ width: '100px', display: 'block', margin: '0 auto' }}>
        <img src="//u.xgoo.jp/img/sgoo.png" alt="supported by goo" title="supported by goo" />
      </a>
    </>
  )
}

export default ShiritoriRoom
