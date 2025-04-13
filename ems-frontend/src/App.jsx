import { useState } from 'react'
import './App.css'
import ListEmployeeComponent from './components/ListEmployeeComponent'
import HeaderComponent from './components/HeaderComponent'
import FooterComponent from './components/FooterComponent'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import EmployeeComponent from './components/EmployeeComponent'

function App() {

  return (
    <>

    <BrowserRouter>
        <HeaderComponent/>
        <Routes>
          {/* // Http://localhost:8081 */}
            <Route path="/" element={<ListEmployeeComponent/>}/>
            {/* // Http://localhost:8081/employees */}
            <Route path="/employees" element={<ListEmployeeComponent/>}/>
            {/* // Http://localhost:8081/add-employee */}
            <Route path="/add-employee" element={<EmployeeComponent/>}/>
            {/* // Http://localhost:8081/edit-employee/:id */}
            <Route path="/edit-employee/:id" element={<EmployeeComponent/>}/>

            {/* // Http://localhost:8081/delete-employee/:id */}
            <Route path="/delete-employee/:id" element={<EmployeeComponent/>}/>
          
        </Routes>
        <FooterComponent/>
    </BrowserRouter>



      
    </>
  )
}

export default App
