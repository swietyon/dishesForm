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
      setType(dish);
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
      name: 'sandwich',
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
  const [type, setType] = useState(dishes[0]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const no_of_slices = numberField * 1;
    const diameterValue = diameter * 1.0;
    console.log(diameter);
    var post;
    const cos = {"name": "HexOcean pizza", "preparation_time": "01:30:22", "type": "pizza", "no_of_slices": 4, "diameter": 33.4};

    switch (type.name) {
      case "pizza":
        post = {"name": name, "preparation_time": preparation, "type": type.name, "no_of_slices": no_of_slices, "diameter": diameterValue};
        break;
      case "soup":
        post = {"name": name, "preparation_time": preparation, "type": type.name, "spiciness_scale": no_of_slices};
        break;
      case "sandwich":
        post = {"name": name, "preparation_time": preparation, "type": type.name, "slices_of_bread": no_of_slices};
        break;
      default:
        post = {"name": name, "preparation_time": preparation, "type": type.name, "no_of_slices": no_of_slices, "diameter": diameterValue};
        break;
    }
    console.log(post);

    fetch('https://frosty-wood-6558.getsandbox.com/dishes', {
      method: 'POST',
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(post)
    }).then(() => {
      console.log("New dish has been added! :)");
    }).catch(error => {
        console.error('Error while adding new dish :(', error);
    });
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
          {type && type.field}

          <button>Add dish</button>
        </form>
      </div>
    );
}

export default InputBox;
