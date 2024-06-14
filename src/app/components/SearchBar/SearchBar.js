'use client'
import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Swal from 'sweetalert2';


function SearchBar({onCharacterSelect, onPlanetSelect, onTransforSelect,  onClear}) {
   const [searchTerm, setSearchTerm] = useState('');
   const [selectedPlanet, setSelectedPlanet] = useState('');
   const [selectedTransformation, setSelectedTransformation] = useState('');
   const [planets, setPlanets] = useState([]);
   const [transformations, setTransformations] = useState([]);
   const [characters, setCharacters] = useState([]);

   useEffect(() => {
      // Obtener datos de la API de planetas
      axios.get('https://dragonball-api.com/api/planets/')
         .then(response => {
            setPlanets(response.data.items); // Aquí se actualiza con response.data.items
         })
         .catch(error => {
            console.error('Error fetching planets:', error);
         });

      // Obtener datos de la API de transformaciones
      axios.get('https://dragonball-api.com/api/transformations/')
         .then(response => {
            setTransformations(response.data);
         })
         .catch(error => {
            console.error('Error fetching transformations:', error);
         });

   }, []);

   const handleSubmit = async (e) => {
      e.preventDefault();

      // Construir la URL de la API basada en las selecciones del usuario
      let url = 'https://dragonball-api.com/api/characters/';

      if (searchTerm) {
         url += `?name=${encodeURIComponent(searchTerm)}`;
      }

      if (selectedPlanet) {
         url = 'https://dragonball-api.com/api/planets/' + selectedPlanet;
      }

      if (selectedTransformation) {
         url = 'https://dragonball-api.com/api/transformations/' + selectedTransformation;
      }

      // Realizar la solicitud a la API
      try {
         const response = await axios.get(url);

         if (selectedPlanet) {
            // Si se seleccionó un planeta, llamar a onPlanetSelect con los datos del planeta
            onPlanetSelect(response.data);
         } else if (selectedTransformation) {
            // Si se seleccionó una transformación, llamar a onTransforSelect con los datos de la transformación
            onTransforSelect(response.data);
         } else {
            // Si no se seleccionó ni un planeta ni una transformación, se asume que son datos de personajes
            const character = response.data;
            if (character.length === 0) {
               // Mostrar mensaje de SweetAlert si no se encontraron coincidencias
               Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'No se encontraron personajes que coincidan con tu búsqueda',
               });
            } else {
               // Si se encontraron personajes, llamar a onCharacterSelect con los datos del personaje
               onCharacterSelect(character);
            }
         }

         // Verificar si el valor de searchTerm se ha limpiado
         if (!searchTerm) {
            onCharacterSelect(null); // Mostrar todos los personajes nuevamente
         }
      } catch (error) {
         console.error('Error fetching data from API:', error);
      }
   };

   const handleClear = () => {
      setSearchTerm('');
      setSelectedPlanet('');
      setSelectedTransformation('');
      onClear();
   };

   const handleSelectChange = (endpoint, setSelectedState) => (value) => {
      setSelectedState(value);
      setSearchTerm('');
  
      // Hacer la solicitud a la API
      axios.get(`https://dragonball-api.com/api/${endpoint}/${value}`)
        .then(response => {
          setCharacters(response.data.items);
        })
        .catch(error => {
          console.error(`Error fetching ${endpoint} details:`, error);
        });
    };

   return (
      <div className='text-center p-3 mb-4' style={{ backgroundColor: 'orange', height: '15rem' }}>
         <h2 className='mt-5' style={{ color: 'white' }}>Dragon Ball Z</h2>
         <Form className='d-flex justify-content-center' onSubmit={handleSubmit}>
            <Row>
               <Col xs="auto">
                  <Form.Control
                     type="text"
                     placeholder="Buscar por nombre"
                     className="mr-sm-2"
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                  />
               </Col>
               <Col>
                  <Form.Select
                     className="w-auto"
                     aria-label="Default select Planet"
                     value={selectedPlanet}
                     onChange={(e) => handleSelectChange('planets', setSelectedPlanet)(e.target.value)}
                  >
                     <option value="">Planetas</option>
                     {planets.map(planet => (
                        <option key={planet.id} value={planet.id}>{planet.name}</option>
                     ))}
                  </Form.Select>
               </Col>
               <Col>
                  <Form.Select
                     className="w-auto"
                     aria-label="Default select transformation"
                     value={selectedTransformation}
                     onChange={(e) => handleSelectChange('transformations', setSelectedTransformation)(e.target.value)}
                  >
                     <option value="">Transformaciones</option>
                     {transformations.map(transformation => (
                        <option key={transformation.id} value={transformation.id}>{transformation.name}</option>
                     ))}
                  </Form.Select>
               </Col>
               <Col xs="auto">
                  <Button type="submit">Buscar</Button>
               </Col>
               <Col xs="auto">
                  <Button variant="secondary" onClick={handleClear}>Limpiar</Button>
               </Col>
            </Row>
         </Form>
      </div>
   );
}

export default SearchBar;
