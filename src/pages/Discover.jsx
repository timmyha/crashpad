import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
flex-direction: column;
margin-top: 200px;`

export default Discover