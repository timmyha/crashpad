import {Link} from 'react-router-dom'

import styled from 'styled-components'


const ListingItem = ( {listing, id, onDelete}) => {

  const colors = ["#E882B2", "#85FFE5", "#FCF894", "#91D6ED", "#9491EC"]

  let item = colors[Math.floor(Math.random()*colors.length)];

  return (
    <Container>
      <Card style={{"background": `${item}`}}>
      <Link to={`/category/${listing.type}/${id}`}>
        <ListingImg src={listing.imgUrls[0]} alt={listing.name} />
        <CardTitle>{listing.name}</CardTitle>
        <CardPrice>${listing.price}/night</CardPrice>
        { onDelete && <Delete onClick={()=> onDelete(id, listing.name)}>delete</Delete> }


      </Link>
      </Card>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  margin-bottom: 20px;
  justify-content: center;
  flex-direction: row;
`

const Card = styled.div`
  display: flex;
  width: 360px;
  border-radius: 10px;
  `

const ListingImg = styled.img`
  display: flex;
  margin: auto;
  margin-left: 5px;
  margin-top: 5px;
  width: 350px;
  border-radius: 5px;
  filter: grayscale(1);
  transition: .5s;
    &:hover {
      filter: grayscale(0);
    }`

const CardTitle = styled.div`
text-align: center;
  color: black;`

const CardPrice = styled.div`
  text-align: right;
  font-size: 30px;
  margin-right: 20px;
  color: black;`

const Delete = styled.div`
  text-align: right;
  font-size: 30px;
  margin-right: 20px;
  color: black;`

export default ListingItem