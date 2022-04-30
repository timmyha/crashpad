import styled from 'styled-components';
import { Link } from 'react-router-dom';
import image from '../images/a.jpg'

function Discover() {
  return (

    <Container>
      hop on a freight train to LA and sleep
      on a <Link to="/category/couch"><Couch> couch</Couch></Link>.&emsp; get comfy
      in a <Link to="/category/crawlspace"><Crawlspace>crawlspace</Crawlspace></Link>
      &nbsp;in the shadow of the eiffel tower.&emsp; picture yourself atop the empire
      state building from a brooklyn <Basement>
      <Link to="/category/basement">basement</Link></Basement>.&emsp; broke in tokyo?
      sleep among the skyscrapers vertically in a <Closet><Link to="/category/closet">closet</Link></Closet>.
      <br />&emsp;&emsp;find your <span style={{"fontSize":"40px", 
                                    "fontFamily":"rubik",
                                    "backgroundColor":"#85ffe5",
                                    "lineHeight":"100px"}}>
                            <Link to='/'>crashpad.</Link>
                                      </span>
    </Container>

  )
}

const Container = styled.div`
height: 100%;
font-size: 30px;
width: 80%;
max-width: 670px;
margin: auto;
line-height: 50px;
font-family: Karla;
text-align: justify;
flex-direction: column;
margin-top: 200px;
  @media (max-width: 500px) {
    margin-bottom: 200px;
  }`

const Couch = styled.span`
  color: black;
  font-family: Rubik;
  font-size: 40px;
  text-decoration: underline 5px #9491ec;
    &:hover {
      opacity: .6;
    }`

const Crawlspace = styled.span`
  color: black;
  font-family: Rubik;
  font-size: 40px;
  text-decoration: underline 5px #fcf894;
    &:hover {
      opacity: .6;
    }`

const Closet = styled.span`
  color: black;
  font-family: Rubik;
  font-size: 40px;
  text-decoration: underline 5px #91d6ed;
    &:hover {
      opacity: .6;
    }`

const Basement = styled.span`
  color: black;
  font-family: Rubik;
  font-size: 40px;
  text-decoration: underline 5px #e882b2;
    &:hover {
      opacity: .6;
    }`

export default Discover