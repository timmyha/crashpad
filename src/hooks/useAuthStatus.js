import { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

export const useAuthStatus = () => {

  const [loggedIn, setLoggedIn] = useState(false)
  const [loggedAuth, setLoggedAuth] = useState(true)

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
      }
      setLoggedAuth(false);
    });
  });

  return { loggedIn, loggedAuth }
}
