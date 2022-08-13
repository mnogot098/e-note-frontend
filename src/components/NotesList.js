import React, { useEffect, useState } from 'react'
import {MdDeleteForever} from 'react-icons/md'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'


function NotesList() {

  const [notes,setNotes] = useState([]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getNotes = async () => {
    let result = await fetch('http://localhost:8000/api/notes');
    result = await result.json();
    setNotes(result.data);
  };

  const deleteNote = async (id) => {
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    };
    fetch(`http://localhost:8000/api/notes/${id}`, requestOptions)
      .then(response => response.json());
      setShow(false);
      getNotes();
  }

  useEffect(() => {
    getNotes();
  },[]);

  return (
    
    <div className='notes-list'>

      {
        notes.map((note) => {
          return (
             <div className='note'>
              <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
          Do you really want to delete this note ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Cnacel
          </Button>
          <Button variant="danger" onClick={() =>deleteNote(note.id)}>Confirm</Button>
        </Modal.Footer>
      </Modal>
             <span>
              {note.title}
             </span>
             <div class="note-footer">
               <p>{note.content.slice(0,100)}</p>
               <div className='note-details'> 
               <small>{note.created_at.split('T')[0]}</small>
               <MdDeleteForever 
               className="delete-icon" 
               size="1.3em"
               onClick={handleShow}
               />
               </div>
            </div>
           </div> 
          );
        })
      }

    </div>
  )
}

export default NotesList