import { FiEdit3, FiTrash } from 'react-icons/fi';

import { Container } from './styles';
import api from '../../services/api';
import { useState } from 'react';

type Food = {
  available: boolean;
  id: number;
  description: string;
  image: string;
  name: string;
  price: string;
}

interface FoodProps {
  food: Food;
  handleDeleteFood: (id: number) => Promise<void>;
  handleEditFood: (food: Food) => Promise<void>;
}

export default function FoodCard({food, handleDeleteFood, handleEditFood}: FoodProps ) {
  const [available, setAvailable] = useState(food.available)
  async function toggleAvailable(){
    const response = await api.put(`/foods/${food.id}`, {
      ...food,
      available: !available,
    });
    setAvailable(!available)
  }

  function setEditingFood(){

    handleEditFood(food);
  }
    return (
      <Container available={available}>
        <header>
          <img src={food.image} alt={food.name} />
        </header>
        <section className="body">
          <h2>{food.name}</h2>
          <p>{food.description}</p>
          <p className="price">
            R$ <b>{food.price}</b>
          </p>
        </section>
        <section className="footer">
          <div className="icon-container">
            <button
              type="button"
              className="icon"
              onClick={setEditingFood}
              data-testid={`edit-food-${food.id}`}
            >
              <FiEdit3 size={20} />
            </button>

            <button
              type="button"
              className="icon"
              onClick={() => handleDeleteFood(food.id)}
              data-testid={`remove-food-${food.id}`}
            >
              <FiTrash size={20} />
            </button>
          </div>

          <div className="availability-container">
            <p>{available ? 'Disponível' : 'Indisponível'}</p>

            <label htmlFor={`available-switch-${food.id}`} className="switch">
              <input
                id={`available-switch-${food.id}`}
                type="checkbox"
                checked={available}
                onChange={toggleAvailable}
                data-testid={`change-status-food-${food.id}`}
              />
              <span className="slider" />
            </label>
          </div>
        </section>
      </Container>
    );
};