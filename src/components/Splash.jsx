import styled from 'styled-components';
import { MdKingBed } from 'react-icons/md';
import { FaGlobeAmericas } from 'react-icons/fa'
import { CgList } from 'react-icons/cg'
import { useEffect, useState } from 'react'


const Splash = () => {

  const [textFade, setTextFade] = useState({
    discovery: false,
    list: false
  });


  const controlDiscText = () => {
    window.scrollY > 500
      ? setTextFade((prev) => ({
        ...prev,
        discovery: true
      }))
      : '';
  };

  const controlListText = () => {
    window.scrollY > 1300
      ? setTextFade((prev) => ({
        ...prev,
        list: true
      })) : '';
  };

  useEffect(() => {
    window.addEventListener('scroll', controlDiscText);
    window.addEventListener('scroll', controlListText);

    return () => {
      window.removeEventListener('scroll', controlListText);
    };
  }, []);

  return (

    <Container>
      <MainSplash>
        <SplashText>
          <MdKingBed size="50" />
          <Subtitle style={{ "textDecoration": "underline 5px #9491EC" }}>
            crashpad
          </Subtitle>
          <TextSpan>helps people around the world find user-hosted,
            affordable temporary housing.</TextSpan>
        </SplashText>
      </MainSplash>
      <DiscoverSplash>
        <SplashText>
          <FaGlobeAmericas size="50" style={{ "marginBottom": "10px" }} />
          <Subtitle style={{ "textDecoration": "underline 5px #91D6ED" }}>
            discover
          </Subtitle>
          <TextSpan id={textFade.discovery
                    ? `splash--discover_show`
                    : `splash--discover`}>
            vacant rooms, couches, closets, crawlspaces and basements&mdash;
            so you can spend more time roaming the streets and less time finding a place
            to crash.
          </TextSpan>
        </SplashText>
      </DiscoverSplash>
      <ListSplash>
        <SplashText>
          <CgList size="50" style={{ "marginBottom": "10px" }} />
          <Subtitle style={{ "textDecoration": "underline 5px #e882b2" }}>
            list
          </Subtitle>
          <TextSpan id={textFade.list
                    ? `splash--list_show`
                    : `list--discover`}>
            your empty space, meet fellow vagrants, and tap into our network
            of wayward travelers.
          </TextSpan>
        </SplashText>
      </ListSplash>
      <CarouselDiv>
        <SplashText>
          <Subtitle style={{ "textDecoration": "underline 5px #FCF894" }}>
            what they're saying:
          </Subtitle>
          <em>"Straight from the freight train to my crashpad. Wow!" </em>
          &nbsp;&nbsp;&nbsp;&nbsp;The New York Slimes
        </SplashText>
        <SplashText>
          <em>"I remember when AirBnB was dirt cheap!" </em>
          &nbsp;&nbsp;&nbsp;&nbsp;The Washington Boast
        </SplashText>
        <SplashText>
          <em>"I'm actually hyperventilating right this very second!" </em>
          &nbsp;&nbsp;&nbsp;&nbsp;ScuzzFeed
        </SplashText>
      </CarouselDiv>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
`;

const MainSplash = styled.div`
  display: flex;
  width: 100%;
  height: 90vh;
  margin-top: 10px;
  background-color: white;
`;

const DiscoverSplash = styled.div`
  display: flex;
  width: 100%;
  height: 90vh;
  background-color: #FCF894;
`;

const ListSplash = styled.div`
  display: flex;
  width: 100%;
  height: 90vh;
  background-color: #85FFE5;
`;

const CarouselDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding-top: 100px;
  padding-bottom: 100px;
  background-color: #91D6ED;
`;

const SplashText = styled.h4`
  display: flex;
  margin: auto;
  padding-bottom: 100px;
  width: 80%;
  padding-left: 10px;
  flex-direction: column;
  text-align: left;
  justify-content: space-around;
  font-size: 2rem;
  font-family: karla;
  @media (min-width: 700px) {
    width: 600px;
  }
`;

const Subtitle = styled.span`
  display: flex;
  padding-left: 10px;
  font-family: Rubik;
`;

const TextSpan = styled.span`
  display: flex;
`;

export default Splash