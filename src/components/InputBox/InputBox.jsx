import React from 'react';
import { useState } from 'react';

import './InputBox.styles.css';

const InputBox = () => {
  const [name, setName] = useState('');
  const [preparation, setPreparation] = useState('');
  const [numberField, setNumberField] = useState();
  const [diameter, setDiameter] = useState();

  const handleName = (e) => {
    setName(e.target.value);
  }

  const handlePreparation = (event) => {
    setPreparation(event.target.value);
  }

  const handleDishSelect = (event) => {
    const dish = dishes.find((dish) => dish.name === event.target.value);
    if (dish) {
      setSelectedDish(dish);
    }
  };

  const handleNumberField = (event) => {
    setNumberField(event.target.value);
  }

  const handleDiameter = (event) => {
    setDiameter(event.target.value);
  }

  
  const [dishes] = useState([
    { 
      name: 'pizza', 
      id: 1, 
      field: (
        <div className='hidden-options'>
          <label htmlFor="pizza">Number of slices</label>
          <input 
            type="number" 
            value={numberField}
            onChange={handleNumberField}
            id="pizza" 
            required 
          />
          <label htmlFor="pizza">Diameter</label>
          <input 
            type="number" 
            value={diameter}
            onChange={handleDiameter}
            id="pizza" 
            step="0.1" 
            required
          />
        </div>
      ) 
    },

    { 
      name: 'soup',
      id: 2,
      field: (
        <div className='hidden-options'>
          <label htmlFor="soup">Spiceness scale</label>
          <input 
          type="number" 
          value={numberField}
          onChange={handleNumberField}
          min='0' 
          max='10' 
          id="soup"
          required
          />
        </div>
      ) 
    },

    { 
      name: 'sandwiches',
      id: 3,
      field: (
        <div className='hidden-options'>
          <label htmlFor="sandwich">Slices of bread</label>
          <input 
            value={numberField}
            onChange={handleNumberField}
            type="number" 
            id="sandwich" 
            required 
          />
        </div>
      )
    }
  ]);
  const [selectedDish, setSelectedDish] = useState(dishes[0]);


  console.log(name,preparation,numberField,diameter, selectedDish);

  const handleSubmit = () => {
    const myName = "name: " + name;
    const myPreparation = "preparation: " + preparation;
    const myNumberField = "number of slices: " + numberField;
    const myDiameter = "diameter: " + diameter;
    const myType = "type of dish: " + selectedDish;
  }
  
    return (
      <div className="app-container">
        <h2>Add new dish</h2>
        <form onSubmit={handleSubmit}>
          <label>Dish name</label>
          <input
            type="text"
            required
            value={name}
            onChange={handleName}
          />
          <label>Preparation time</label>
          <input type="time" step="2" onChange={handlePreparation} required/>

          <label>Dish type</label>
          <select onChange={handleDishSelect}>
            {dishes.map((option) => (
              <option key={option.id} value={option.name}>{option.name}</option>
            ))}
          </select>
          {selectedDish && selectedDish.field}

          <button>Add dish</button>
        </form>
      </div>
    );
}

export default InputBox;
