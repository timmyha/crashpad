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
      window.removeEventListener('scroll', controlScrollUp);
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
  };

  return (
      <Container>
        <NavHeader collapse={collapseNav} onClick={onClick}>
          { scrollUp && collapseNav && (
            <ScrollUpDiv>
              <BsFillArrowUpCircleFill onClick={(e) => { e.stopPropagation(); scrollToTop(); }} />
            </ScrollUpDiv>
          )}
          <NavName collapse={collapseNav}>crashpad.</NavName>
        </NavHeader>
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
  right: 5%;
  margin-top: 120px;
  font-size: 50px;
  border-radius: 100%;
  box-shadow: 0 2px 0.1rem gray;
  background-color: transparent;
  color: #9491ec;
  z-index: 100001;
`;

const NavHeader = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  height: ${props => props.collapse ? '50px' : '100px'};
  background-color: #E882B2;
  color: #181314;
  width: 100%;
  cursor: pointer;
  z-index: 100000;
  transition: all 0.5s ease-in-out;
  align-items: center;
  &:hover {
    color: ${props => props.collapse ? '#FCF894' : '#F1E0AD'};
  }
`;

const NavName = styled.h1`
  margin: 0;
  position: relative;
  margin-top: 30px;
  left: ${props => props.collapse ? '20%' : '50%'};
  transform: ${props => props.collapse ? 'translateX(0)' : 'translateX(-50%)'};
  font-size: ${props => props.collapse ? '25px' : '20vw'};
  transition: all 0.5s ease-in-out;
   @media (min-width: 650px) {
     font-size: ${props => props.collapse ? '2rem' : '8rem'};
   }
`;

export default Navbar
