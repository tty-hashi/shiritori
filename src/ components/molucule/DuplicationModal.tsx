import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  Button,
  useDisclosure,
} from '@chakra-ui/react'

type Props = {
  isOpen: boolean
  setClose: () => void
}

const DuplicationModal: React.FC<Props> = ({ isOpen, setClose }) => {
  const modalCloseHandler = () => {
    setClose()
  }
  return (
    <>
      <Modal isOpen={isOpen} onClose={modalCloseHandler}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={'center'}>まけぇ ^ ^</ModalHeader>
          <ModalCloseButton />
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={modalCloseHandler}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default DuplicationModal
