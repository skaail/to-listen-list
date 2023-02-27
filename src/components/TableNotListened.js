import React from 'react'
import Table from 'react-bootstrap/Table';
import { collection, getDocs } from "firebase/firestore";
import {db} from '../firebase';
import { useState, useEffect} from 'react'


function TableNotListened() {
  const [todos, setTodos] = useState([]);

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


  return (
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
          todos?.map((todo,i)=>(
              <tr key={i} >
                <td className='flex items-center'><img src={todo.logo} width='60px'></img></td>
                <td><a href={todo.link}>{todo.name}</a></td>
                <td>{todo.band}</td>
                <td>{todo.data}</td>
                <td>Review</td>
              </tr>
          ))
        }
      </tbody>
    </Table>
  )
}

export default TableNotListened