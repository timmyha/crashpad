import { useState } from 'react'
import PrivateRoute from './components/PrivateRoute'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Splash from './components/Splash'
import Discover from './pages/Discover'
import Profile from './pages/Profile'
import Listings from './pages/Listings'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Category from './pages/Category'
import Contact from './pages/Contact'
import CreateListing from './pages/CreateListing'
import ForgotPassword from './pages/ForgotPassword'
import UpdateListing from './pages/UpdateListing'
import styled from 'styled-components'
import { Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast'
import Listing from './pages/Listing'
import ScrollToTop from './hooks/ScrollToTop'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            marginBottom: '130px'
          },
          error: {
          style: {
            color: 'black',
            backgroundColor: '#e882b2'
          }},
          success: {
          style: {
            color: 'black',
            backgroundColor: '#85ffe5'
        }}
      }}
      />
      <Navbar />
      <Content>
        <ScrollToTop />
        <Routes>
          <Route path='/' element={<Splash />} />
          <Route path='/profile' element={<PrivateRoute />}>
            <Route path='/profile' element={<Profile /> } />
              </Route>
          <Route path='/discover' element={<Discover />} />
          <Route path='/listings' element={<Listings />} />
          <Route path='/category/:categoryName/:listingId' element={<Listing />} />
          <Route path='/create' element={<CreateListing />} />
          <Route path='/edit/:listingId' element={<UpdateListing />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/category/:categoryName' element={<Category />} />
          <Route path='/forgotpassword' element={<ForgotPassword />} />
          <Route path='/contact/:ownerId' element={<Contact />} />
        </Routes>
      </Content>
      <Footer />
    </>
  )
}

const Content = styled.div`
  display: flex;
  margin-top: 0px;
  `

export default App
