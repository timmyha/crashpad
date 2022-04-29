import styled from 'styled-components';
import { Link } from 'react-router-dom';
import image from '../images/a.jpg'

function Discover() {
  return (
    
      <Container>
        <Link to="/category/couch">couches</Link>
        <Link to="/category/basement">basements</Link>
        <Link to="/category/crawlspace">crawlspaces</Link>
        <Link to="/category/closet">closets</Link>
      </Container>
    
  )
}

const Container = styled.div`
display: flex;
height: 100%;
width: 100%;
text-align: center;
flex-direction: column;
margin-top: 300px;`

const CatDiv = styled.div`
  display: flex;
  margin: auto;
  width: 80%;
  font-size: 6rem;
  background-image: linear-gradient(#e66465, transparent, blue), url(${props => props.img});
  height: 300px;`

export default Discover