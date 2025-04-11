import { useState } from 'react'
import './App.css'
import ListEmployeeComponent from './components/ListEmployeeComponent'
import HeaderComponent from './components/HeaderComponent'
import FooterComponent from './components/FooterComponent'
import {BrowserRouter, Route, Routes} from 'react-router-dom'

function App() {

  return (
    <>

    <BrowserRouter>
        <Routes>
          {/* // Http://localhost:8081 */}
            <Route path="/" element={<HeaderComponent/>}/>
            {/* // Http://localhost:8081/employees */}
            <Route path="/employees" element={<ListEmployeeComponent/>}/>
          
        </Routes>
        <FooterComponent/>
    </BrowserRouter>



      
    </>
  )
}

export default App
