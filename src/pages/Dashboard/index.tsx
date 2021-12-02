import { Component, useEffect, useState } from "react";

import Header from "../../components/Header/header";
import api from "../../services/api";
import Food from "../../components/Food/food";
import ModalAddFood from "../../components/ModalAddFood";
import ModalEditFood from "../../components/ModalEditFood";
import { FoodsContainer } from "./styles";

type food = {
  id: string;
  image: string;
  name: string;
  price: string;
  description: string;
  available: boolean;
};

export default function Dashboard() {
  const [foods, setFoods] = useState<food[]>([]);
  const [food, setEditingFood] = useState<food>({} as food);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);


  useEffect( () => {
    async function getFoods() {
      const response = await api.get("/foods")
      setFoods(response.data)
    }

    getFoods()
  },[])

  async function handleAddFood(food: food) {
    try {
      const response = await api.post("/foods", {
        ...food,
        available: true,
      });

      setFoods([...foods, response.data]);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleUpdateFood(editFood: food) {

    try {
      const foodUpdated = await api.put(`/foods/${editFood.id}`, {
        ...editFood,
      });
      const foodsUpdated = foods.map((f) =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data
      );
      setFoods([...foodsUpdated])
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDeleteFood(id: string) {

    await api.delete(`/foods/${id}`);

    const foodsFiltered = foods.filter((food) => food.id !== id);

    setFoods(foodsFiltered)
  };

  function toggleModal() {
    setModalOpen((modalOpen) => !modalOpen)
    
  };

  function toggleEditModal() {
    setEditModalOpen((editModalOpen) => !editModalOpen);
  }

  function handleEditFood(food: food){
    setEditingFood(food)
    setEditModalOpen((editModalOpen) => !editModalOpen);
  };


  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        food={food}
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods?.map((food) => (
            <Food
              key={food.id}
              food={food}
              handleDeleteFood={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  );
}
