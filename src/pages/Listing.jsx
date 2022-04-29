import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase.config';
import styled from 'styled-components'
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa'
import { MapContainer, TileLayer, useMap, Marker } from 'react-leaflet'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { connectStorageEmulator } from 'firebase/storage';
import 'swiper/css/pagination'

const Listing = () => {
  const [listing, setListing] = useState(null);
  const [shareLink, setShareLink] = useState(null);

  const navigate = useNavigate();
  const params = useParams();
  const auth = getAuth();

  useEffect(() => {

    const color = "brown";

    const getListing = async () => {
      const docRef = doc(db, 'listings', params.listingId);
      const docSnap = await getDoc(docRef);

      docSnap.exists()
        ? setListing(docSnap.data())
        : console.log('no')
    }

    getListing();
  }, [navigate, params.listingId])


  const images = listing && listing.imgUrls.map(img => {
    return <SwiperSlide key={img}><Image src={img} /></SwiperSlide>
  })


  return (
    listing &&
    <>
      <MapDiv>
        <MapContainer style={{ "width": "100%", "height": "400px", "position": "fixed" }} center={[listing.geolocation.lat, listing.geolocation.lon]} zoom={13} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[listing.geolocation.lat, listing.geolocation.lon]}></Marker>
        </MapContainer>
      </MapDiv>
      <ContentDiv>
        <Container>
          <PageTitle>{listing.name}</PageTitle>
          <Subtitle>${listing.price} per night</Subtitle>
          <Amenities>
            <Amenity>
              {listing.parking === true ? 'parking' : 'no parking'}
            </Amenity>
            <Amenity>
              {listing.bathroom === true ? 'indoor bathroom' : 'outdoor bathroom'}
            </Amenity>
          </Amenities>
          <ImageDiv>

            
          <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >
      {images}
    </Swiper>


          </ImageDiv>
          <Renter>
            owner says:
          </Renter>
          <BlurbDiv>
            <LeftQuote><FaQuoteLeft /></LeftQuote>
            <Blurb>{listing.blurb}</Blurb>
            <RightQuote><FaQuoteRight /></RightQuote>
          </BlurbDiv>
          <ContactDiv>
            {auth.currentUser?.uid !== listing.userRef && (
              <Link
                to={`/contact/${listing.userRef}?listingName=${listing.name}`}
              >
                <Contact>contact owner</Contact>
              </Link>
            )}
          </ContactDiv>
        </Container>
      </ContentDiv>
    </>

  )
}
const ContentDiv = styled.div`
display: flex;`

const Container = styled.div`
  display: flex;
  margin-top: 350px;
  width: 100vw;
  height: 100%;
  z-index: 100;
  background-color: white;
  flex-direction: column;
  box-shadow: 0 -5px 5px rgba(0, 0, 0, .1);`

const MapDiv = styled.div`
  width: 100vw;
  height: 300px;
  background-color: transparent;
  margin-top: -30px;
  `

const PageTitle = styled.h1`
  display: flex;
  margin: auto;
  margin-top: 0px;
  margin-bottom: 0px;
  font-size: 40px;
  text-decoration: underline 5px #9491ec;
  `

const Subtitle = styled.h2`
  display: flex;
  margin: auto;
  margin-top: 10px;
  margin-bottom: 0px;
  font-size: 35px;
  background-color: #85ffe5;
  padding: 5px;
  `
const Amenities = styled.div`
  display: flex;
  flex-direction: row;
  margin: auto;
  margin-top: 10px;
  margin-bottom: 0px;
  width: 300px;
  `

const Amenity = styled.h4`
  display: flex;
  margin: auto;
  margin-top: 10px;
  margin-bottom: 0px;
  font-size: 20px;
  background-color: black;
  color: white;
  padding: 5px;
  margin-right: 10px;
  `

const Image = styled.img`
  width: 400px;
  @media ( max-width: 400px ) {
    width: 375px;
  }`

const ImageDiv = styled.div`
  display: flex;
  margin: auto;
  margin-top: 30px;
  margin-bottom: 0px;
  max-width: 400px;
  max-height: 400px;
  padding: 10px 10px 10px 10px;
  background-color: #fcf894;`

const BlurbDiv = styled.div`
  display: flex;
  margin: auto;
  margin-top: 20px;
  padding: 50px;
  padding-right: 100px;
  padding-left: 100px;
  background-color: pink;
  margin-bottom: 20px;
  font-size: 23px;
  height: 130px;
  width: 375px;`

const Renter = styled.h3`
  display: flex;
  margin: auto;
  margin-top: 10px;
  margin-bottom: 0px;
  font-size: 20px;
  text-decoration: underline 5px #9491ec;
  `
const LeftQuote = styled.span`
  position: absolute;
  margin-left: -90px;
  margin-top: -40px;
  font-size: 40px;`

const RightQuote = styled.span`
  position: absolute;
  margin-left: 420px;
  margin-top: 130px;
  font-size: 40px;`

const Blurb = styled.div`
  display: flex;
  margin: auto;`

const ContactDiv = styled.div`
  display: flex;
  margin: auto;
  margin-bottom: 100px;
  margin-top: 0px;`

const Contact = styled.div`
  text-align: center;
  border: none;
  padding: 10px;
  width: 500px;
  border-radius: 50px;
  cursor: pointer;
  background-color: #91d6ed;
    &:hover {
    opacity: .7;
    }
  margin-bottom: 200px;
    @media (max-width: 400px) {
      width: 300px;
    }`

export default Listing