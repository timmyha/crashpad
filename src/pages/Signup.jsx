import { useState } from 'react';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { db } from '../firebase.config';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';

const Signup = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  })

  const { name, email, password } = formData;

  const navigate = useNavigate();

  const handleFormChange = (e) => {
    let { value, id }= e.target
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))

  }

  const showPass = () => {
    setShowPassword(!showPassword)
  }

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
      })
      .catch((error) => {
      console.log(error.code, error.message)
   
      });
      }

  return (
    <Container>
      <h1>hi</h1>

      <form onSubmit={onSubmit}>
      <input 
          type="name"
          value={name} 
          onChange={handleFormChange} 
          id="name"
        />
        <input 
          type="email"
          value={email} 
          onChange={handleFormChange} 
          id="email"
        />
        <input 
          type="password"
          value={password} 
          onChange={handleFormChange} 
          id="password"
        />
        <span onClick={showPass}>show password</span>
        <button>sign up</button>
      </form>

      {/* Google OAuth */}

      <Link to='/signin'>already registered?</Link>
    </Container>
  )
}

const Container = styled.div`
  margin-top: 300px;`

export default Signup