import { useState } from 'react';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { db } from '../firebase.config';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import OAuth from '../components/OAuth';
import toast from 'react-hot-toast';

const Signup = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });

  const { name, email, password } = formData;

  const navigate = useNavigate();

  const handleFormChange = (e) => {
    let { value, id }= e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const onSubmit = async (e) => {
      e.preventDefault();

      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
      const user = userCredential.user;
      updateProfile(auth.currentUser, {
        displayName: name
      })

      const formDataCopy = {...formData};
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();

      setDoc(doc(db, 'users', user.uid), formDataCopy)

      navigate('/')
      toast.success('registration complete.')
      })
      .catch((error) => {
        if (formData.password.length < 6) {
          toast.error('password must exceed six characters.')
        } else {
        toast.error('registration failed.')
        }
      });
      }

  return (
    <Container>
      <OAuth />
      <Or>
        <OrText>
          or
        </OrText>
      </Or>
      <form onSubmit={onSubmit}>
      <DisplayName 
          type="name"
          value={name} 
          onChange={handleFormChange} 
          id="name"
          placeholder="display name"
        />
        <Email 
          type="email"
          value={email} 
          onChange={handleFormChange} 
          id="email"
          placeholder="e-mail address"
        />
        <Password 
          type="password"
          value={password} 
          onChange={handleFormChange} 
          id="password"
          placeholder="password"
        />
        <SignInButton>
          <SignInButtonText>
            sign up with e-mail
          </SignInButtonText>
        </SignInButton>
      </form>

      <Links>
      <Link to='/signin'>already registered?</Link>
      </Links>
    </Container>
  )
}


const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  margin-top: 200px;
  flex-direction: column;
`;

const Or = styled.div`
  display: flex;
  margin: auto;
  font-size: 20px;
  text-align: center;
  height: 30px;
  width: 30px;
  padding: 5px;
  margin-bottom: 30px;
  border-radius: 5px;
  background-color: black;
`;

const OrText = styled.h1`
  font-size: 20px;
  color: white;
  display: flex;
  margin: auto;
`;

  const DisplayName = styled.input`
  display: flex;
  height: 30px;
  width: 300px;
  margin: auto;
  background-color: transparent;
  border: none;
  font-family: Rubik;
  font-size: 25px;
  text-align: center;
  border-bottom: 5px solid #E882B2;
  margin-bottom: 10px;
  box-shadow: 0 0 0 40px white inset !important;
  &:focus {
    outline: none;
  }
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
  width: 300px;
  margin-top: 20px;
  padding: 10px 10px 10px 25px;
  border-radius: 20px 20px 20px 20px;
  cursor: pointer;
  background-color: #FCF894;
  transition: .1s;
    &:hover {
      background-color: #9491EC;
    }
`;

const SignInButtonText = styled.div`
  display: flex;
  margin: auto;`

const OAuthButton = styled.button`
  display: flex;
  border: none;
  margin: auto;
  margin-top: 10px;
  width: 165px;
  padding: 10px 0px 10px 20px;
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
  margin-top: 30px;
`;

export default Signup