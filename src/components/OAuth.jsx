import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { db } from "../firebase.config";
import { FcGoogle } from 'react-icons/fc'
import styled from 'styled-components'


const OAuth = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const onGoogleClick = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp()
        });
      };
      navigate('/');
    } catch (e) {
      console.log(e)
    };
  };


  return (
    <GoogleButton onClick={onGoogleClick}>
       <ButtonText><FcGoogle />&nbsp;Sign {location.pathname === '/signup' ? 'up' : 'in'} with Google</ButtonText>
    </GoogleButton>
  );
};

const GoogleButton = styled.div`
  display: flex;
  width: 300px;
  height: 50px;
  margin: auto;
  border-radius: 30px;
  background-color: transparent;
  border: 1px black solid;
  margin-top: 60px;
  margin-bottom: 60px;
  cursor: pointer;
    &:hover {
      background-color: black;
      color: white;
      transition: .3s;
    }
`;

const ButtonText = styled.div`
  display: flex;
  margin: auto;`

export default OAuth