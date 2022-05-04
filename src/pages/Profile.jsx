import { getAuth, updateProfile } from 'firebase/auth';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, Link, useParams } from 'react-router-dom';
import {
  updateDoc, doc, collection, getDocs,
  query, where, orderBy, deleteDoc
} from 'firebase/firestore';
import { db } from '../firebase.config';
import Listing from './Listing';
import toast from 'react-hot-toast';
import { FaPencilAlt } from 'react-icons/fa';

function Profile() {

  const auth = getAuth();
  const user = auth.currentUser;

  const [updateUser, setUpdateUser] = useState(false)
  const [listings, setListings] = useState(null)
  const [formData, setFormData] = useState({
    name: user.displayName,
    email: user.email
  })

  const { name, email } = formData
  const navigate = useNavigate()

  useEffect(() => {
    const getUserListings = async () => {
      const listingsRef = collection(db, 'listings');
      const q = query(listingsRef,
        where('userRef', '==', auth.currentUser.uid),
        orderBy('timestamp', 'desc'))

      const querySnap = await getDocs(q);
      const listings = [];

      querySnap.forEach(doc => {
        return listings.push({
          id: doc.id,
          data: doc.data()
        })
      })

      setListings(listings)
    }


    getUserListings();
  }, [auth.currentUser.uid])

  const handleLogout = () => {
    auth.signOut()
    toast.success('successfully logged out.')
    navigate('/')
  }

  const handleEdit = async () => {
    const userRef = doc(db, 'users', auth.currentUser.uid);

    try {
      if (auth.currentUser.displayName !== name) {
        await updateProfile(auth.currentUser, {
          displayName: name
        })

        await updateDoc(userRef, {
          name
        })
      }
    } catch (e) {
      console.log(e.message)
      toast.error('could not edit display name.')
    }
    toast.success('successfully edited display name.')
  }

  const handleEditChange = (e) => {
    setFormData((prev => (
      {
        ...prev,
        [e.target.id]: e.target.value
      }
    )))
  }

  const handleEditListing = (id) => {
    navigate(`/edit/${id}`)
  }



  const listingDisplay = listings && listings.map(listing => {
    return (
      <>
          <Link key={listing.id} to={`/category/${listing.data.type}/${listing.id}`}>
        <ListingDisplay>
          <ListingPhoto src={listing.data.imgUrls[0]}></ListingPhoto>
          <ListingTitle>{listing.data.name}</ListingTitle>
        </ListingDisplay>
        </Link>
          <EditIcon onClick={() => handleEditListing(listing.id)}><FaPencilAlt /></EditIcon>
      </>
    )
  })

  return (
    <Container>
      {updateUser
        ? <EditNameDisplay
          value={name}
          id='name'
          type='text'
          onChange={handleEditChange}
        />
        : <NameDisplay>{name}</NameDisplay>
      }
      <SplashText>{email}</SplashText>
      <Buttons>
        <Edit onClick={() => {
          updateUser && handleEdit();
          setUpdateUser(!updateUser)
        }}
          style={updateUser ? { "backgroundColor": "#85FFE5" } : { "backgroundColor": "#e882b2" }}>
          {updateUser ? 'done?' : 'edit'}
        </Edit>
        <Logout
          className="logOut"
          onClick={handleLogout}
        >logout</Logout>
      </Buttons>
      {listings &&
        <ListingCard>
          <NameDisplay>
            your listings:
          </NameDisplay>
          <ListingDiv>
            {listingDisplay}
          </ListingDiv>
        </ListingCard>

      }
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

const NameDisplay = styled.span`
  display: flex;
  padding-left: 10px;
  font-family: Rubik;
  font-size: 2rem;
  margin: auto;
  margin-top: 20px;
  text-decoration: underline 5px #91D6ED;`

const EditNameDisplay = styled.input`
  display: flex;
  padding-left: 10px;
  font-family: Rubik;
  font-size: 2rem;
  text-align: center;
  border: none;
  background-color: lightgray;
  margin: auto;
  margin-top: 20px;
  text-decoration: underline 5px #91D6ED;
    &:focus {
      outline: none;
    }`

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  `

const Logout = styled.button`
  margin: auto;
  border: none;
  width: 100px;
  margin-top: 10px;
  margin-left: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 20px 20px 20px 20px;
  cursor: pointer;
  background-color: #9491EC;
  transition: .1s;
    &:hover {
      background-color: #FCF894;
    }`

const Edit = styled.button`
  border: none;
  margin: auto;
  width: 100px;
  margin-top: 10px;
  margin-right: 20px;
  padding: 10px 0px 10px 0px;
  border-radius: 20px 20px 20px 20px;
  cursor: pointer;
  &:hover {
    background-color: #91D6ED;
    opacity: .7;
  }`

const ListingDiv = styled.div`
display: flex;
flex-direction: column;
margin: auto;`

const ListingDisplay = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 375px;
  height: 100px;
  text-align: center;
  border: none;
  padding: 10px;
  margin-right: 5px;
  margin-top: 20px;
  border-radius: 5px;
  background-color: lightgray;
  cursor: pointer;
    &:hover {
      background-color: darkgray;
    }
  @media (max-width: 500px) {
    margin-top: 5px;
    margin-left: 10px;
    width: 300px;
  }`

const ListingPhoto = styled.img`
  display: flex;
  width: 100px;
  height: 100px;`

const EditIcon = styled.div`
  display: flex;
  position: absolute;
  margin-top: 20px;
  margin-left: -30px;
  height: 25px;
  width: 25px;
  padding: 5px 5px 5px 5px;
  z-index: 10000;
  cursor: pointer;
  border-radius: 100%;
    &:hover {
      color: #91D6ED;
    }`

const ListingTitle = styled.div`
  display; flex;
  margin: auto;`

const ListingCard = styled.div`
  display: flex;
  flex-direction: column;
  `

export default Profile