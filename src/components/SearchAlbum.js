import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';


const CLIENT_ID = "47d629387eff4cc2a731e7f2c290302e"
const CLIENT_SECRET = "5bcf17b2ac36460480687f83171004ae"

function SearchAlbum() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [searchInput, setSearchInput] = useState("")
    const [accessToken, setAccessToekn] = useState("")
    const [albums, setAlbums] = useState([])
  
    useEffect(() => {
      //API Access Token
      var auth = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
  
        body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
      }
      fetch('https://accounts.spotify.com/api/token', auth)
        .then(result => result.json())
        .then(data => setAccessToekn(data.access_token))
    }, [])
  
  
    async function search() {
      var artistParameters = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json', 
          'Authorization' : 'Bearer ' + accessToken
        }
      }
  
      var artistID = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist', artistParameters)
        .then(response => response.json())
        .then(data => { return data.artists.items[0].id })
      
  
  
      var returnAlbums = await fetch('https://api.spotify.com/v1/artists/' + artistID + '/albums?include_groups=album&market=US&limit=50', artistParameters)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setAlbums(data.items)
      })
    }


  return (
    <>
    <Button variant="primary" onClick={handleShow}>
      Pesquisar Album
    </Button>

    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Buscar Albums</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Container>
        <InputGroup className='mb-3' size='lg'>
          <FormControl 
            placeholder='Busque por artista'
            type='input'
            onKeyPress={e => {
              if(e.key === 'Enter'){
                search()
              }
            }}
            onChange={e => {
              setSearchInput(e.target.value)
              search()
            }}
          />

          <Button onClick={e => search()}>
            Procurar
          </Button>
        </InputGroup>
      </Container>

      <Container>
        <Row className='mx-2 row row-cols-4'>
          {albums.map((album, i) =>{
            return (
              <Card>
                <Card.Img src={album.images[0].url} />
                <Card.Body>
                  <Card.Title>{album.name}</Card.Title>
                </Card.Body>
              </Card>
            )
          })}
        </Row>
      </Container>
      </Modal.Body>
    </Modal>
  </>

  )
}

export default SearchAlbum