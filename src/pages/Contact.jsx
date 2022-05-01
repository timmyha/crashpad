import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase.config'
import toast from 'react-hot-toast';
import styled from 'styled-components'
import Textarea from 'rc-textarea';

const Contact = () => {

  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [owner, setOwner] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useParams();

  useEffect(() => {
    const getOwner = async () => {
      const docRef = doc(db, 'users', params.ownerId)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setOwner(docSnap.data())
      } else { toast.error('account deleted') }
    };
    getOwner();
  }, [params.ownerId]);

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    toast.success('contact initiated.');
    navigate('/');
  };

  return (
    owner !== null &&
    <Container>
      <ContactDiv>
        <form onSubmit={onSubmit}>
          <Textarea
            cols="29"
            autoSize="true"
            className="text-area"
            name="message"
            id='message'
            value={message}
            onChange={onChange}
            maxLength='300'
            placeholder={`send ${owner && owner.name} a message`}
          />
          <Buttons>
            <Button href={`mailto:${owner && owner.email}
                          ?Subject=${searchParams.get('listingName')}
                          &body=${message}`}>send</Button>
          </Buttons>
        </form>
      </ContactDiv>
    </Container>
  );
};



const Container = styled.div`
  display: flex;
  width: 1000px;
  height: 100%;
  margin: auto;
  margin-top: 200px;
  margin-bottom: 200px;
  flex-direction: column;
`;

const ContactTitle = styled.h1`
  display: flex;
  margin: auto;
  font-size: 40px;
  margin-bottom: 20px;
`;

const ContactDiv = styled.div`
  display: flex;
  margin: auto;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: right;
  margin-top: 20px;
  flex-direction: row;
    @media (max-width: 500px) {
      flex-direction: column; ;
    }
`;

const Button = styled.a`
  width: 100px;
  text-align: center;
  border: none;
  padding: 10px;
  margin-right: 5px;
  border-radius: 50px;
  background-color: #fcf894;
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

export default Contact