import { getAuth, updateProfile } from 'firebase/auth'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useNavigate, Link } from 'react-router-dom'
import { updateDoc } from 'firebase/firestore'
import { db } from '../firebase.config'

function Profile() {

  const auth = getAuth();
  const user = auth.currentUser;

  const [updateUser, setUpdateUser] = useState(false)
  const [formData, setFormData] = useState({
    name: user.displayName,
    email: user.email
  })

  const { name, email } = formData

  const navigate = useNavigate()
  const handleLogout = () => {
    auth.signOut()
    navigate('/')
  }


  return (
    <Container>
      <Subtitle>{name}</Subtitle>
      <SplashText>{email}</SplashText>
      <Buttons>
      <Edit>
        edit
      </Edit>
      <Logout
        className="logOut"
        onClick={handleLogout}
      >logout</Logout>
      </Buttons>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  margin-top: 200px;
  flex-direction: column;
`

const SplashText = styled.h4`
  display: flex;
  margin: auto;
  margin-bottom: 20px;
  width: 80%;
  justify-content: space-around;
  font-size: 2rem;
  font-family: karla;
  @media (min-width: 700px) {
    width: 600px;
  }
`

const Subtitle = styled.span`
  display: flex;
  padding-left: 10px;
  font-family: Rubik;
  font-size: 2rem;
  margin: auto;
  text-decoration: underline 5px #91D6ED;`

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  `

const Logout = styled.button`
  display: flex;
  margin: auto;
  border: none;
  width: 100px;
  margin-top: 10px;
  margin-left: 20px;
  padding: 10px 10px 10px 25px;
  border-radius: 20px 20px 20px 20px;
  cursor: pointer;
  background-color: #9491EC;
  transition: .1s;
    &:hover {
      background-color: #FCF894;
    }`

const Edit = styled.button`
  display: flex;
  border: none;
  margin: auto;
  width: 100px;
  margin-top: 10px;
  margin-right: 20px;
  padding: 10px 10px 10px 35px;
  border-radius: 20px 20px 20px 20px;
  cursor: pointer;
  background-color: #e882b2;
  &:hover {
    background-color: #FCF894;
  }`

export default Profile