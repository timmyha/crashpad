import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {

  const [collapseNav, setCollapseNav] = useState(false)
  
  const controlNavbar = () => {
    window.scrollY > 130
    ? setCollapseNav(true) 
    : setCollapseNav(false)
  }

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar)
    return () => {
      window.removeEventListener('scroll', controlNavbar)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
  };

  return (
    <div onClick={scrollToTop}>
    <Container>
    { collapseNav
    ? <CollapseTitle>
    <CollapseName>crashpad.</CollapseName>
    </CollapseTitle>
    : <TitleDiv>
    <SiteName>crashpad.</SiteName>
    </TitleDiv> }
    </Container>
    </div>
  )
}

const Container = styled.div`
  display: flex;
  z-index: 100000;
`

const TitleDiv = styled.div`
  display: flex;
  position: fixed;
  margin-top: 0px;
  height: 100px;
  background-color: #E882B2;
  color: #181314;
  width: 100%;
  cursor: pointer;
  z-index: 100000;
  &:hover {
    color: #F1E0AD;
  }`

  const CollapseTitle = styled.div`
  display: flex;
  position: fixed;
  margin-top: 0px;
  height: 20px;
  background-color: #E882B2;
  color: #181314;
  width: 100%;
  cursor: pointer;
  z-index: 10000;
  &:hover {
    color: #FCF894;
  }`


const SiteName = styled.h1`
  font-size: 20vw;
  margin: auto;
   @media (min-width: 650px) {
     font-size: 8rem;
   }`

const CollapseName = styled.h1`
  font-size: 25px;
  margin-left: 20%;
    }`

export default Navbar