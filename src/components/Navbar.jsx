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

  return (
    <Link to="/">
    <Container>
    { collapseNav
    ? <CollapseTitle>
    <CollapseName>crashpad.</CollapseName>
    </CollapseTitle>
    : <TitleDiv>
    <SiteName>crashpad.</SiteName>
    </TitleDiv> }
    </Container>
    </Link>
  )
}

const Container = styled.div`
  display: flex;
`

const TitleDiv = styled.div`
  display: flex;
  position: fixed;
  margin: 0px;
  height: 100px;
  background-color: #E882B2;
  color: #181314;
  width: 100%;
  cursor: pointer;
  transition: .1s;
  &:hover {
    color: #F1E0AD;
  }`

  const CollapseTitle = styled.div`
  position: fixed;
  display: flex;
  margin: 0px;
  height: 20px;
  margin-bottom: 80px;
  background-color: #E882B2;
  color: #181314;
  width: 100%;
  cursor: pointer;
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