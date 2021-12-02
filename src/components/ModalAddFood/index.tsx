import { createRef} from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';
import {FormHandles} from '@unform/core'

type food = {
  id: string;
  image: string;
  name: string;
  price: string;
  description: string;
  available: boolean
}

interface ModalAddFoodProps {
  isOpen: boolean;
  setIsOpen: () => void
  handleAddFood: (food: food) => Promise<void>
}

export default function ModalAddFood({isOpen, setIsOpen, handleAddFood}: ModalAddFoodProps) {

  const formRef = createRef<FormHandles>()

  async function handleSubmit(food: food){
  
    handleAddFood(food);
    setIsOpen();
  };

    return (
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Form ref={formRef} onSubmit={(e) => handleSubmit(e)}>

          <h1>Novo Prato</h1>

          <Input name="image" placeholder="imagem do prato" />
          <Input name="name" placeholder="nome do prato" />
          <Input name="price" placeholder="priço do prato"  />
          <Input name="description" placeholder="descrição do prato" />

          <button type="submit" data-testid="add-food-button">
            <p className="text">Adicionar Prato</p>
            <div className="icon">
              <FiCheckSquare size={24} />
            </div>
          </button>

        </Form>
      </Modal>
    );
};

