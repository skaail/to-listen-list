import React from 'react'
import SearchAlbum from '../components/SearchAlbum';
import TableNotListened from '../components/TableNotListened';



function List() {


  return (
    <div className='flex flex-col w-screen gap-9 p-10'>
      <SearchAlbum />
      <TableNotListened />
    </div>
  )
}

export default List