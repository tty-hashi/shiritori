import React, { useEffect, useState } from 'react'
import { Box } from '@chakra-ui/react'

import VoiceInput from '../molucule/VoiceInput'
import InputList from '../molucule/InputList'
import DuplicationModal from '../molucule/DuplicationModal'

const ShiritoriRoom: React.FC = () => {
  const [voiceList, setVoiceList] = useState<string[]>([])
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  // 重複があるかどうかを判定
  useEffect(() => {
    const isDuplication = voiceList.filter((x, i, self) => self.indexOf(x) !== i)
    const array = [...voiceList]
    const isEndWithN = array.pop()?.endsWith('ん')
    if (isDuplication.length > 0 || isEndWithN) setIsModalOpen(true)
  }, [voiceList])

  const handleModalClose = () => setIsModalOpen(false)

  return (
    <>
      {isModalOpen && <DuplicationModal isOpen={isModalOpen} setClose={handleModalClose} />}
      <Box mx={4} my={16}>
        <VoiceInput voiceList={voiceList} setVoiceList={setVoiceList} />
        <InputList list={voiceList} />
      </Box>
      <a href="http://www.goo.ne.jp/" style={{ width: '100px', display: 'block', margin: '0 auto' }}>
        <img src="//u.xgoo.jp/img/sgoo.png" alt="supported by goo" title="supported by goo" />
      </a>
    </>
  )
}

export default ShiritoriRoom
