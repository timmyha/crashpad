import styled from 'styled-components';
import { CgProfile } from 'react-icons/cg';
import { NavLink, Link } from 'react-router-dom';
import { useAuthStatus } from '../hooks/useAuthStatus';


const Footer = () => {

  const { loggedIn, loggedAuth } = useAuthStatus();

  return (

    <Container>
      <NavItems>
        <ProfileIcon>
          <NavLink
            style={navData => (
              navData.isActive
                ? { 'color': '#E882B2' }
                : { 'color': 'black' })}
            to="/profile"><CgProfile /></NavLink>
        </ProfileIcon>
        { loggedIn
          ? <NewListing><Link to='/create'>new listing</Link></NewListing>
          : <NewListing><Link to='/create'>sign in</Link></NewListing>}
        <Discover>
          <NavLink
            style={navData => (
              navData.isActive
                ? { 'textDecoration': 'underline 5px #9491EC' }
                : { 'textDecoration': 'none' })}
            to="/discover">discover</NavLink>
        </Discover>
        <Listings>
          <NavLink
            style={navData => (
              navData.isActive
                ? { 'textDecoration': 'underline 5px #91D6ED' }
                : { 'textDecoration': 'none' })}
            to="/listings">listings</NavLink>
        </Listings>
      </NavItems>
    </Container>

  );
};

const Container = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  justify-content: right;
  background-color: white;
  height: 60px;
  z-index: 100000;
  box-shadow: 0 -5px 5px rgba(0, 0, 0, .1);
  bottom: 0px;
`;

const ProfileIcon = styled.div`
  position: fixed;
  margin-top: 3px;
  font-size: 2rem;
  left: 20px;
  cursor: pointer;
`;

const NavItems = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 1.5rem;
  margin-top: 10px;
`;

const Discover = styled.p`
    display: flex;
    margin: 0px 40px 0px 40px;
    color: #181314;
    &:active {
      text-decoration: underline 5px #9491EC;
    }
`;

const Listings = styled.p`
  display: flex;
  margin: 0px 40px 0px 40px;
  text-decoration: none;
  color: #181314
`;

const NewListing = styled.button`
  border: none;
  positon: absolute;
  margin: auto;
  width: 170px;
  margin-top: -80px;
  margin-right: -330px;
  padding: 10px 0px 10px 0px;
  border-radius: 40px 40px 40px 40px;
  background-color: #85FFE5;
  cursor: pointer;
  box-shadow: 0 2px 0.5rem gray;
  &:hover {
    opacity: .7;
  }
`;

export default Footer