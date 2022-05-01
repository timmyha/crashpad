import { useState, useEffect } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.config'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Textarea from 'rc-textarea';
import toast from 'react-hot-toast';
import { nanoid } from 'nanoid';

const CreateListing = () => {

  const [formData, setFormData] = useState({
    type: 'couch',
    name: '',
    blurb: '',
    bathroom: true,
    furnished: false,
    price: 0,
    location: '',
    images: {},
    geolocation: { lat: '', lon: '' }
  });

  let { type, name, blurb,bathroom, 
        furnished, price, location,
        images, geolocation } = formData;

  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setFormData({ ...formData, userRef: user.uid })
      } else { navigate('/signin') }
    });
  }, []);


  const onSubmit = async (e) => {
    e.preventDefault();

    if (images.length < 1) {
      toast.error("no");
    };

    const res = await fetch(`https://geocode.maps.co/search?q=${location}`);
    const data = await res.json();

    data[0] === undefined
      ? toast.error("Couldn't find location.")
      : geolocation.lat = data[0].lat,
      geolocation.lon = data[0].lon;

    const storeImage = async (image) => {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const fileName = `${auth.currentUser.uid}-${image.name}-${nanoid()}`;
        const storageRef = ref(storage, 'images/' + fileName);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on('state_changed',
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            toast('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
            };
          },
          (error) => {
            reject(error)
            toast.error('something went wrong')
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    };

    const imgUrls = await Promise
      .all([...images].map((image) => storeImage(image)))
      .catch(() => {
        toast.error('Error uploading images.')
      });

    const formDataCopy = {
      ...formData,
      imgUrls,
      timestamp: serverTimestamp()
    };
    delete formDataCopy.images;

    const docRef = await addDoc(collection(db, 'listings'), formDataCopy);
    toast.success('Listing added!');
    navigate(`/category/${formDataCopy.type}/${docRef.id}`);
  };

  const onMutate = (e) => {
    let boolean = null;
    let { value, files, id } = e.target;

    if (value === 'true') {
      boolean = true;
    }
    if (value === 'false') {
      boolean = false;
    }
    if (files) {
      setFormData(prev => ({
        ...prev,
        images: files
      }));
    };

    if (!files) {
      setFormData(prev => ({
        ...prev,
        [id]: boolean ?? value,
      }));
    };
  };

  return (
    <Container>
      <Header>create listing</Header>
      <FormItem>
        <form onSubmit={onSubmit}>
          <Label>type?<br /></Label>
          <Buttons>
            <Button
              type="button"
              id='type'
              style={type === 'couch' 
                    ? { "backgroundColor": "#85FFE5" } 
                    : { "backgroundColor": "lightgray" }}
              value='couch'
              onClick={onMutate}>couch</Button>
            <Button
              type="button"
              id='type'
              style={type === 'basement' 
                    ? { "backgroundColor": "#85FFE5" } 
                    : { "backgroundColor": "lightgray" }}
              value='basement'
              onClick={onMutate}>basement</Button>
            <Button
              type="button"
              id='type'
              style={type === 'crawlspace' 
                    ? { "backgroundColor": "#85FFE5" } 
                    : { "backgroundColor": "lightgray" }}
              value='crawlspace'
              onClick={onMutate}>crawlspace</Button>
            <Button
              type="button"
              id='type'
              style={type === 'closet' 
                    ? { "backgroundColor": "#85FFE5" } 
                    : { "backgroundColor": "lightgray" }}
              value='closet'
              onClick={onMutate}>closet</Button>
          </Buttons>

          <Label>name:<br /></Label>
          <Input
            type='text'
            id='name'
            value={name}
            onChange={onMutate}
            maxLength='32'
            minLength='10'
            placeholder='short description'
            required />

          <Label>blurb:<br /></Label>
          <Textarea
            cols="29"
            autoSize="true"
            className="text-area"
            id='blurb'
            value={blurb}
            maxLength='300'
            onChange={onMutate}
            placeholder='longer description'
          />

          <Label>bath?<br /></Label>
          <Buttons>
            <Button
              type="button"
              id='bathroom'
              style={bathroom === true ? { "backgroundColor": "#85FFE5" } : { "backgroundColor": "lightgray" }}
              value={true}
              onClick={onMutate}>yes</Button>
            <Button
              type="button"
              id='bathroom'
              style={!bathroom && bathroom !== null ? { "backgroundColor": "#85FFE5" } : { "backgroundColor": "lightgray" }}
              value={false}
              onClick={onMutate}>no</Button>
          </Buttons>

          <Label>bed?<br /></Label>
          <Buttons>
            <Button
              type="button"
              id='furnished'
              style={furnished === true ? { "backgroundColor": "#85FFE5" } : { "backgroundColor": "lightgray" }}
              value={true}
              onClick={onMutate}>yes</Button>
            <Button
              type="button"
              id='furnished'
              style={!furnished && furnished !== null ? { "backgroundColor": "#85FFE5" } : { "backgroundColor": "lightgray" }}
              value={false}
              onClick={onMutate}>no</Button>
          </Buttons>

          <Label>price:<br /></Label>
          <Input
            type='number'
            id='price'
            value={price}
            onChange={onMutate}
            min='0'
            max='10000000000000'
            placeholder='short description'
            required />

          <Label>where?<br /></Label>
          <Textarea
            cols="29"
            autoSize="true"
            className="text-area"
            id='location'
            value={location}
            maxLength='300'
            onChange={onMutate}
            placeholder='city, state?, country'
          />

          <PicsLabel>
            pics? (required)<br />
          </PicsLabel>

          <Input
            type='file'
            id='images'
            onChange={onMutate}
            accept='.jpg,.png,.jpeg'
            style={{ "fontSize": "20px" }}
            multiple
            required
          /><br />

          <SubmitButton type="submit">
            create listing
          </SubmitButton>

        </form>
      </FormItem>
    </Container>

  )
}

const Container = styled.div`
  display: flex;
  margin: auto;
  margin-top: 200px;
  flex-direction: column;
`;

const Header = styled.h1`
  display: flex;
  margin: auto;
  font-size: 40px;
  margin-bottom: 40px;
  text-decoration: underline 5px #91D6ED;
`;

const Label = styled.label`
  display: flex;
  margin-top: 20px;
  color: white;
  background: black;
  width: 60px;
`;

const PicsLabel = styled.label`
  display: flex;
  margin-top: 20px;
  margin-bottom: 10px;
  color: white;
  background: black;
  width: 140px;
`;

const Input = styled.input`
  background-color: transparent;
  border: none;
  font-size: 30px;
  text-align: center;
  width: 500px;
  border-bottom: 5px #9491EC solid;
  &:focus {
    outline: none;
  }
  @media (max-width: 500px) {
      width: 350px;
  }
`;

const FormItem = styled.div`
  display: flex;
  height: 100vh;
  @media (max-width: 500px) {
    margin-left: 10px;
    margin-right: 10px;
  }
`;

const Buttons = styled.div`
  display: flex;
  margin-top: 5px;
  flex-direction: row;
    @media (max-width: 500px) {
      flex-direction: column; ;
    }
`;

const Button = styled.button`
  width: 120px;
  text-align: center;
  border: none;
  padding: 10px;
  margin-right: 5px;
  border-radius: 50px;
  cursor: pointer;
    &:hover {
      opacity: .7;
    }
  @media (max-width: 500px) {
    margin-top: 5px;
    margin-left: 10px;
    width: 300px;
  }
`;

const SubmitButton = styled.button`
text-align: center;
border: none;
padding: 10px;
width: 500px;
border-radius: 50px;
cursor: pointer;
margin-top: 20px;
background-color: #E882B2;
  &:hover {
  opacity: .7;
  }
margin-bottom: 200px;
  @media (max-width: 500px) {
    width: 300px;
  }
`;

export default CreateListing