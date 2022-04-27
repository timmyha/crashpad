import { useState } from 'react';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'


const Signin = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const { email, password } = formData;

  const navigate = useNavigate();

  const handleFormChange = (e) => {
    let { value, id }= e.target
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        if(user) {
          navigate('/')
        }
      })
      .catch((error) => {
        console.log(error.code, error.message)
  });
  }

  const showPass = () => {
    setShowPassword(!showPassword)
  }

  return (
    <Container>
      <h1>hi</h1>

      <form onSubmit={onSubmit}>
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
        <Link to="/forgotpassword">forgot?</Link>
        <button>sign in</button>
      </form>

      {/* Google OAuth */}

      <Link to='/signup'>need to signup?</Link>
    </Container>
  )
}

const Container = styled.div`
  margin-top: 300px;`

export default Signin