import { useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import styled from 'styled-components'

const ForgotPassword = () => {

  const [email, setEmail] = useState('')

  const onChange = (e) => {
    setEmail(e.target.value)
  }

  const onSubmit = async(e) => {
    e.preventDefault()
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email)
      // TOAST EMAIL SENT //
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Main>
      <Forgot>forgot password?</Forgot>
      <form onSubmit={onSubmit}>
        <EmailField>
        <Email
          type="email"
          placeholder="e-mail address"
          id="email"
          value={email}
          onChange={onChange}
           />
        </EmailField>
        <Buttons>
        <Reset type="submit">send password</Reset>
        </Buttons>
        </form>
        <Buttons>
        <Link to="/signin">
          sign in
        </Link>
        </Buttons>
    </Main>
  )
}

const Main = styled.div`
display: flex;
width: 100%;
height: 100%;
margin: auto;
margin-top: 200px;
flex-direction: column;`

const Forgot = styled.h1`
  display: flex;
  margin: auto;
  font-size: 40px;
  margin-bottom: 30px;
  background-color: #FCF894;
  padding: 10px 20px 10px 20px;`

const EmailField = styled.div`
  display: flex;
  margin: auto;
  width: 80%;
  flex-direction: column;`

const Email = styled.input`
  display: flex;
  height: 30px;
  width: 300px;
  margin: auto;
  background-color: transparent;
  border: none;
  font-family: Rubik;
  font-size: 25px;
  text-align: center;
  border-bottom: 5px solid #91D6ED;
  margin-bottom: 15px;
  box-shadow: 0 0 0 40px white inset !important;
  &:focus {
    outline: none;
}`

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  margin: auto;
  `


const Reset = styled.button`
  margin: auto;
  border: none;
  width: 200px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 20px 20px 20px 20px;
  cursor: pointer;
  background-color: #9491EC;
  transition: .1s;
  margin-bottom: 30px;
    &:hover {
      opacity: .7;
    }`

export default ForgotPassword