import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';

import { collection, addDoc } from "firebase/firestore";
import {db} from '../firebase';


const CLIENT_ID = "47d629387eff4cc2a731e7f2c290302e"
const CLIENT_SECRET = "5bcf17b2ac36460480687f83171004ae"

function SearchAlbum() {
    const [show, setShow] = useState(false);
    const [todo, setTodo] = useState("")

    const handleClose = () => {
      setShow(false)
    };

    const handleSave = async (e) => {
      setShow(false)
    };

    const handleShow = () => {
      setShow(true)
    };


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

      var returnAlbums = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=album', artistParameters)
      .then(response => response.json())
      .then(async data => {
        console.log(data.albums.items[0])
        try {
          const docRef = await addDoc(collection(db, "todos"), {
            name: data.albums.items[0].name,
            data: data.albums.items[0].release_date,
            band: data.albums.items[0].artists[0].name,
            link: data.albums.items[0].external_urls.spotify,
            logo: data.albums.items[0].images[0].url,
            aberto: true,
            nota: ''
          });
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
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
            }}
          />

          <Button onClick={e => search()}>
            Procurar
          </Button>
        </InputGroup>
      </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Fechar
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Adicionar a lista
        </Button>
      </Modal.Footer>
    </Modal>
  </>

  )
}

export default SearchAlbum