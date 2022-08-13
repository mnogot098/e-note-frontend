import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NotesList from './components/NotesList';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Modal from 'react-bootstrap/Modal';
import {useEffect, useState} from "react"
import FloatingLabel from 'react-bootstrap/FloatingLabel';


function App() {

  const [title,setTitle] = useState('');
  const [content,setContent] = useState('');
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [searchNote,setSearchNote] = useState('');

  const newNote = async (e) => {
    e.preventDefault();

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: title,content:content })
  };

      fetch('http://localhost:8000/api/notes', requestOptions)
      .then(response => response.json());
      setShow(false);
  };

  return (
    <div className="container">
      <div className='header'>
        <InputGroup className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search note..."
          aria-label="note-search"
          aria-describedby="basic-addon2"
          onChange = {(e) => {setSearchNote(e.target.value)}}
        />
        <Button variant="outline-warning" id="button-addon2">
          Search
        </Button>
      </InputGroup>
      </div>
      <Button className="add-note" variant="outline-success" onClick={handleShow}>+New</Button>
      <NotesList noteSearched = {searchNote}/>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <form onSubmit={newNote}>
        <Modal.Header closeButton>
          <Modal.Title>New note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Title</Form.Label>
          <Form.Control 
          type="text" 
          name="title" 
          value={title} 
          onChange={(e) => {setTitle(e.target.value)}}
          placeholder="Enter a title ..." />
        </Form.Group>
        <FloatingLabel controlId="floatingTextarea2" label="Content ...">
        <Form.Control
          as="textarea"
          name="content"
          value={content} 
          onChange={(e) => {setContent(e.target.value)}}
          placeholder="Content"
          style={{ height: '150px' }}
        />
      </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" type="submit">Add</Button>
        </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
}

export default App;
