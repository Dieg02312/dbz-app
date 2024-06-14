import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function CardItem({ character }) {
   const [showOpen, setShowOpen] = useState(false);
   const [showOpenPerson, setShowOpenPerson] = useState(false);

   return (
      <Card style={{ width: '18rem' }}>
         <Card.Img variant="top" src={character?.image} alt={character?.name} className="img-fluid" style={{ height: '300px', objectFit: 'contain' }} />
         <Card.Body>
            <Card.Title>{character?.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{character?.race}</Card.Subtitle>
            {character?.ki ? <Card.Text>Ki: {character?.ki}</Card.Text> : ""}
            {(character?.maxKi || character?.character?.maxKi) ? <Card.Text>Max Ki: {character?.maxKi || character?.character?.maxKi}</Card.Text> : ""}
            {(character?.gender || character?.character?.gender) ? <Card.Text>Gender: {character?.gender || character?.character?.gender}</Card.Text> : ""}
            {(character?.affiliation || character?.character?.affiliation) ? <Card.Text>Affiliation: {character?.affiliation || character?.character?.affiliation}</Card.Text> : ""}
            {character?.description || character?.character?.description ?
               <>
                  <Button onClick={() => setShowOpen(true)} className='mt-3'>
                     Información
                  </Button>
                  <Modal show={showOpen} onHide={() => setShowOpen(false)}>
                     <Modal.Header closeButton>
                        <Modal.Title>Información</Modal.Title>
                     </Modal.Header>
                     <Modal.Body>
                        {character?.description || character?.character?.description}
                     </Modal.Body>
                     <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowOpen(false)}>
                           Cerrar
                        </Button>
                     </Modal.Footer>
                  </Modal>
               </> : ""}
            {character?.characters && character?.characters.length > 0 ? <>
               <Button onClick={() => setShowOpenPerson(true)} className='mt-3 ms-3'>
                  Personajes
               </Button>
               <Modal show={showOpenPerson} onHide={() => setShowOpenPerson(false)}>
                  <Modal.Header closeButton>
                     <Modal.Title>Personajes</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                     <ul>
                        {Array.isArray(character?.characters) && character?.characters.map(person => (
                           <li key={person.id}>{person.name}</li>
                        ))}
                     </ul>
                  </Modal.Body>
                  <Modal.Footer>
                     <Button variant="secondary" onClick={() => setShowOpenPerson(false)}>
                        Cerrar
                     </Button>
                  </Modal.Footer>
               </Modal>
            </>
               : ""}
         </Card.Body>
      </Card>
   );
}

export default CardItem;
