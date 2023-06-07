import React from 'react'
import './App.css'
import { ChakraProvider } from '@chakra-ui/react'
import ShiritoriRoom from './ components/templete/ShiritoriRoom'

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <ShiritoriRoom />
      </div>
    </ChakraProvider>
  )
}

export default App
