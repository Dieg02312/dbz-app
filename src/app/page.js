'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from "./components/SearchBar/SearchBar";
import DynamicTabs from './components/Tabs/Tabs'


export default function Home() {

  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [selectedTransfor, setSelectedTransfor] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [transformations, setTransformations] = useState([]);

  // Función para manejar la selección de un personaje
  const handleSelect = (character) => {
    setSelectedCharacter(character);
  };
  const handlePlanet = (planet) => {
    setSelectedPlanet(planet);
  };
  const handleTransfor = (transformation) => {
    setSelectedTransfor(transformation);
  };

  useEffect(() => {
    axios.get('https://dragonball-api.com/api/characters/')
      .then(response => {
        setCharacters(response.data.items);
      })
      .catch(error => {
        console.error('Error fetching characters:', error);
      });

    axios.get('https://dragonball-api.com/api/planets/')
      .then(response => {
        setPlanets(response.data.items);
      })
      .catch(error => {
        console.error('Error fetching planets:', error);
      });

      axios.get('https://dragonball-api.com/api/transformations/')
      .then(response => {
         setTransformations(response.data);
      })
      .catch(error => {
         console.error('Error fetching transformations:', error);
      });

  }, []);

  const handleClear = () => {
    setSelectedCharacter(null);
    setSelectedPlanet(null);
    setSelectedTransfor(null); // Establecer selectedCharacter en null
  };

  return (
    <div>
      <SearchBar
        onCharacterSelect={handleSelect}
        onPlanetSelect={handlePlanet}
        onTransforSelect={handleTransfor}
        onClear={handleClear} />

      <section className='container mb-5'>
        <DynamicTabs
          characters={selectedCharacter ? [selectedCharacter[0]] : characters}
          planets={selectedPlanet ? selectedPlanet : planets}
          transformations={selectedTransfor ? selectedTransfor : transformations} />
      </section>

    </div>
  );
}
