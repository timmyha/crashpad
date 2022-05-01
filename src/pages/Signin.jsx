import { useState } from 'react';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import OAuth from '../components/OAuth';
import toast from 'react-hot-toast';


const Signin = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const navigate = useNavigate();

  const handleFormChange = (e) => {
    let { value, id }= e.target
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        if(user) {
          navigate('/');
          toast.success('successfully logged in.');
        }
      })
      .catch((error) => {
        console.log(error.code, error.message);
        toast.error('password must exceed six characters');
  });
  }

  const showPass = () => {
    setShowPassword(!showPassword);
  }

  return (
    <Container>
      
      <SignIn>sign in.</SignIn>

      <form onSubmit={onSubmit}>
      <EmailField> 
        <Email 
          type="email"
          value={email} 
          onChange={handleFormChange} 
          id="email"
          placeholder='e-mail address'
        />
      
        <Password 
          type="password"
          value={password} 
          onChange={handleFormChange} 
          id="password"
          placeholder='password'
        />

      </EmailField>

        <SignInButton>sign in</SignInButton>
      </form>
      <OAuthButton><OAuth /></OAuthButton>

      
      <Links>
      
      <Link to="/forgotpassword">forgot password?&nbsp;</Link>
      <Link to='/signup'>not registered?</Link>
      </Links>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  margin: auto;
  margin-top: 200px;
  flex-direction: column;
`;

const SignIn = styled.h1`
  display: flex;
  margin: auto;
  font-size: 40px;
  margin-bottom: 30px;
  background-color: #FCF894;
  padding: 10px 20px 10px 20px;
`;

const EmailField = styled.div`
  display: flex;
  margin: auto;
  width: 80%;
  flex-direction: column;
`;

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
  margin-bottom: 10px;
  box-shadow: 0 0 0 40px white inset !important;
  &:focus {
    outline: none;
  }
`;
const Password = styled.input`
  display: flex;
  height: 30px;
  width: 300px;
  margin: auto;
  font-family: Rubik;
  font-size: 25px;
  text-align: center;
  background-color: transparent;
  border: none;
  border-bottom: 5px solid #9491EC;
  margin-bottom: 10px;
  box-shadow: 0 0 0 40px white inset !important;
    &:focus {
        outline: none;
    }
`;

  const SignInButton = styled.button`
  display: flex;
  margin: auto;
  border: none;
  width: 100px;
  margin-top: 10px;
  padding: 10px 10px 10px 25px;
  border-radius: 20px 20px 20px 20px;
  cursor: pointer;
  background-color: #FCF894;
  transition: .1s;
    &:hover {
      background-color: #9491EC;
    }
`;

  const OAuthButton = styled.button`
    display: flex;
    border: none;
    margin: auto;
    margin-top: 10px;
    width: 160px;
    padding: 12px 0px 10px 17px;
    border-radius: 20px 20px 20px 20px;
    cursor: pointer;
    &:hover {
      background-color: #91D6ED;
    }
`;

const Links = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  margin-top: 10px;
`;

export default Signin