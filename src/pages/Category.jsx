import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import {
  collection, getDocs,
  query, where,
  orderBy, limit
} from 'firebase/firestore'
import { db } from '../firebase.config'
import styled from 'styled-components'
import ListingItem from './ListingItem';

function Category() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);

  const params = useParams();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listingsRef = collection(db, 'listings');
        const q = query(listingsRef,
          where('type', '==', params.categoryName),
          orderBy('timestamp', 'desc'), limit(10)
        );

        const querySnap = await getDocs(q);

        const listings = []
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data()
          });
        });

        setListings(listings);
        setLoading(false);

      } catch (error) {
        console.log(error)
      };
    };
    fetchListings();
  }, []);

  return (
    <Container>
      <CategoryTitle>{params.categoryName}
        {params.categoryName[params.categoryName.length - 1] === "h"
        ? 'es'
        : 's'}
      </CategoryTitle>
      {loading ? 'loading'
        : listings && listings.length > 0
        ? <>
            <main>
              <ul>
                {listings.map(listing => {
                  return <ListingItem
                    key={listing.id}
                    id={listing.id}
                    listing={listing.data} />
                })}
              </ul>
            </main>
          </>
          : <p>none</p>
      }
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
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

export default Category