import React from 'react'
import Table from 'react-bootstrap/Table';
import { collection, getDocs } from "firebase/firestore";
import {db} from '../firebase';
import { Container, InputGroup, FormControl, Button } from 'react-bootstrap'
import { useState, useEffect} from 'react'
import Modal from 'react-bootstrap/Modal';


function TableNotListened() {
  const [todos, setTodos] = useState([]);
  const [album, setAlbum] = useState("")

  const [show, setShow] = useState(false);

  const fetchPost = async () => {
       
    await getDocs(collection(db, "todos"))
        .then((querySnapshot)=>{               
            const newData = querySnapshot.docs
                .map((doc) => ({...doc.data(), id:doc.id }));
            setTodos(newData);                
            console.log(todos, newData);
        })
   
}

useEffect(()=>{
    fetchPost();
}, [])

const handleClose = () => {
  setShow(false)
};

const handleSave = async (e) => {
  setShow(false)
};

const handleShow = () => {
  setShow(true)
};

function handleClick() {
  console.log(album)
}


  return (
    <>

<Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{album}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Container>
        <InputGroup className='mb-3' size='lg'>
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
    

    <Table striped bordered hover>
      <thead>
        <tr>
          <th width='80px'>#</th>
          <th>Nome</th>
          <th>Banda</th>
          <th>Data</th>
          <th>Fazer Review</th>
        </tr>
      </thead>
      <tbody>

        {
          todos?.map((todo,i)=>{
            if(todo.nota === ''){
              return(
                <tr key={i} >
                  <td className='flex items-center'><img src={todo.logo} width='60px'></img></td>
                  <td><a href={todo.link}>{todo.name}</a></td>
                  <td>{todo.band}</td>
                  <td>{todo.data}</td>
                  <td>
                    <Button onClick={() => {setAlbum(todo.name); handleClick(); handleShow()}}>Fazer Review</Button>
                    </td>
                </tr>
              )
            }else{}
          })
        }
      </tbody>
    </Table>


    </>
    
  )
}

export default TableNotListened