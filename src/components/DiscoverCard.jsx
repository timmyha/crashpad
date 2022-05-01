import styled from "styled-components"
import { Link } from "react-router-dom";


const DiscoverCard = ( { category, icon, text, color, lineColor } ) => {

  return (
    <Link to={`/category/${category}`}>
    <Card>
      <IconCircle style={{"backgroundColor": `${color}`}}>
        <Icon>
        {icon}
        </Icon>
      </IconCircle>
      <Text>
        {text}
        <LinkText>
        <span>discover&nbsp;</span> 
        <span 
          style={{"textDecoration":`underline 5px ${lineColor}`}}>
            {`${category}${ category[category.length - 1]=== 'h' ? 'es' : 's'}`}
        </span>
        </LinkText>
      </Text>
    </Card>
    </Link>
  )
}

const Card = styled.div`
  display: flex;
  position: relative;
  top: 0;
  flex-direction: row;
  width: 100%;
  height: 250px;
  box-shadow: 0px 5px 0.75rem gray;
  border-radius: 10px;
  margin-bottom: 30px;
  cursor: pointer;
    &:hover {
      top: -5px;
      transition: top ease 0.2s;
    }
    @media (max-width: 700px) {
      flex-direction: column;
      height: 400px;
    }
`;

const IconCircle = styled.div`
  display: flex;
  min-height: 100px;
  width: 100px;
  border-radius: 100%;
  align-self: center;
  margin: auto;
  background-color: #9491ec;
  @media (max-width: 700px) {
    margin-top: 50px;
  }
`;

const Icon = styled.div`
  display: flex;
  margin: auto;
  color: white;
  font-size: 70px;
`;

const CardText = styled.div`
  display: flex; 
  flex-direction: column; 
`;

const Text = styled.div`
  display: flex;
  margin: auto;
  margin-top: 60px;
  margin-left: 0px;
  line-height: 20px;
  font-size: 1rem;
  height: 300px;
  width: 50%;
  flex-direction: column;
  @media (max-width: 700px) {
    line-height: 18px;
    text-align: justify;
    width: 230px;
    margin: auto;
    margin-top: 20px;
  }
`;

const LinkText = styled.div`
  display: flex;
  font-size: 35px;
  font-family: rubik;
  margin-top: 50px;
  flex-direction: row;
  width: 200px;
  margin-left: -30px;
    @media (max-width: 700px) {
      font-size: 20px;
      margin-left: 0px;
    }
`

export default DiscoverCard