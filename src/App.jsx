import { useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Splash from './components/Splash'
import Discover from './pages/Discover'
import Profile from './pages/Profile'
import Listings from './pages/Listings'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import ForgotPassword from './pages/ForgotPassword'
import styled from 'styled-components'
import { Routes, Route } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Content>
        <Routes>
          <Route path='/' element={<Splash />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/discover' element={<Discover />} />
          <Route path='/listings' element={<Listings />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/forgotpassword' element={<ForgotPassword />} />
        </Routes>
      </Content>
      <Footer />
    </>
  )
}

const Content = styled.div`
  display: flex;
  margin-top: 50px;
  `

export default App
