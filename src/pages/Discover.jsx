import styled from 'styled-components';
import { FaCouch } from 'react-icons/fa';
import { useEffect } from 'react'
import { GiHoleLadder, Gi3DStairs } from 'react-icons/gi'
import { BiCloset } from 'react-icons/bi'
import DiscoverCard from '../components/DiscoverCard';

function Discover() {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const colors = ["#E882B2", "#85FFE5", "#FCF894", 
                  "#91D6ED", "#9491EC"];


  return (

    <Container>
      <DiscoverCard 
        icon={<FaCouch />}
        text={`You'd think something as ubiquitous as the couch
            would have a longer Wikipedia article. Find pull-out 
            beds, ottomans, sectionals, chaise longues, and more.`}
        category={'couch'}
        color={colors[0]}
        lineColor={colors[3]}
      />
      <DiscoverCard 
        icon={<Gi3DStairs />}
        text={`Drift off into peaceful, subterranean sleep knowing
        wholeheartedly that it's impossible to be defenestrated
        within the confines of a basement.`}
        category={'basement'}
        color={colors[3]}
        lineColor={colors[4]}
      />
        <DiscoverCard 
          icon={<GiHoleLadder />}
          text={`No, you don't have to pay the troll toll to get
          into this hole— the crawlspace is generally the most affordable
          option for the backpacked traveller.`}
          category={'crawlspace'}
          color={colors[4]}
          lineColor={colors[2]}
        />
      <DiscoverCard 
        icon={<BiCloset />}
        text={`In the perfect closet, you can sleep as tall
          as the skyscrapers of whatever city you're laying your
          head. That is to say— vertically.`}
        category={'closet'}
        color={colors[1]}
        lineColor={colors[0]}
      />
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
  }
`;



export default Discover