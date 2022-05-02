import {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import { collection, getDocs, 
  query, where, 
  orderBy, limit, 
  startAfter } from 'firebase/firestore'
import { db } from '../firebase.config'
import styled from 'styled-components'
import ListingItem from './ListingItem';

function Category() {
  const [ listings, setListings ] = useState(null);
  const [ loading, setLoading ] = useState(true);

  const params = useParams();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listingsRef = collection(db, 'listings')
        const q = query(listingsRef,
                  orderBy('timestamp', 'desc'), limit(20)
              )
        
        const querySnap = await getDocs(q);

        const listings = []
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data()
          })
        })

        setListings(listings)
        setLoading(false)
        
      } catch (error) {
        console.log(error)
      }
    }
    fetchListings()

  }, [])

  return (
    <Container>
      <CategoryTitle>all listings</CategoryTitle>
     {loading 
      ? <List>
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
        </List>
      : listings && listings.length > 0 
      ? <>
        

        <main>
            <List>
              { listings.map(listing => {
                return <ListingItem 
                        key={listing.id}
                        id={listing.id}
                        listing={listing.data} />
              })}
            </List>
        </main>


        
        </> 
      :  <p>none</p>
       }
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  width: 1000px;
  height: 100%;
  margin: auto;
  margin-top: 200px;
  margin-bottom: 200px;
  flex-direction: column;
`;

const CategoryTitle = styled.h1`
  display: flex;
  margin: auto;
  font-size: 40px;
  margin-bottom: 20px;
`;

const LoadingCard = styled.div`
  display: flex;
  margin: auto;
  height: 200px;
  width: 360px;
  background-color: lightgray;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const List = styled.ul`
`;

export default Category