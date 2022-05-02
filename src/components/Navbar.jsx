import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsFillArrowUpCircleFill } from 'react-icons/bs';

const Navbar = () => {

  const [collapseNav, setCollapseNav] = useState(false);
  const [scrollUp, setScrollUp] = useState(false);

  const navigate = useNavigate();

  const controlNavbar = () => {
    window.scrollY > 130
      ? setCollapseNav(true)
      : setCollapseNav(false);
  };

  const controlScrollUp = () => {
    window.scrollY > 500
      ? setScrollUp(true)
      : setScrollUp(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar);
    window.addEventListener('scroll', controlScrollUp);
    return () => {
      window.removeEventListener('scroll', controlNavbar);
      window.removeEventListener('scroll', controlNavbar);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const onClick = () => {
    navigate('/');
    console.log("click")
  };

  return (
      <Container>
        { collapseNav
          ? <CollapseTitle onClick={onClick}>
            { scrollUp
              &&  <ScrollUpDiv>
                    <BsFillArrowUpCircleFill onClick={scrollToTop} />
                  </ScrollUpDiv>}
              <CollapseName>crashpad.</CollapseName>
            </CollapseTitle>
          : <TitleDiv onClick={onClick}>
              <SiteName>crashpad.</SiteName> 
            </TitleDiv> }
      </Container>
  );
};

const Container = styled.div`
  display: flex;
  z-index: 100000;
`;

const ScrollUpDiv = styled.div`
  display: flex;
  position: absolute;
  margin-left: 90%;
  margin-top: 10%;
  font-size: 50px;
  border-radius: 100%;
  box-shadow: 0 2px 0.5rem gray;
  background-color: transparent;
  color: #9491ec;
`;

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
  }
`;

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
  }
`;


const SiteName = styled.h1`
  font-size: 20vw;
  margin: auto;
   @media (min-width: 650px) {
     font-size: 8rem;
   }
`;

const CollapseName = styled.h1`
  font-size: 25px;
  margin-left: 20%;
  }
`;

export default Navbar