import styled from 'styled-components';
import { CgProfile } from 'react-icons/cg';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';


const Footer = () => {

  return (

    <Container>
      <NavItems>
        <ProfileIcon>
          <NavLink
          style={navData => (
            navData.isActive 
            ? {'color':'#E882B2'} 
            : {'color': 'black'})} 
          to="/profile"><CgProfile /></NavLink>
        </ProfileIcon>
        <Discover>
          <NavLink 
            style={navData => (
                  navData.isActive 
                  ? {'textDecoration':'underline 5px #9491EC'} 
                  : {'textDecoration': 'none'})} 
            to="/discover">discover</NavLink>
        </Discover>
        <Listings>
          <NavLink 
          style={navData => (
            navData.isActive 
            ? {'textDecoration':'underline 5px #91D6ED'} 
            : {'textDecoration': 'none'})} 
          to="/listings">
            listings</NavLink>
        </Listings>
      </NavItems>
    </Container>

  )
}

const Container = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  justify-content: right;
  background-color: white;
  height: 60px;
  box-shadow: 0 -5px 5px rgba(0, 0, 0, .1);
  bottom: 0px;`

const ProfileIcon = styled.div`
  position: fixed;
  margin-top: 3px;
  font-size: 2rem;
  left: 20px;
  cursor: pointer;`

const NavItems = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 1.5rem;
  margin-top: 10px;
`

const Discover = styled.p`
    display: flex;
    margin: 0px 40px 0px 40px;
    color: #181314;
    &:active {
      text-decoration: underline 5px #9491EC;
    }
`
const Listings = styled.p`
  display: flex;
  margin: 0px 40px 0px 40px;
  text-decoration: none;
  color: #181314
`
export default Footer