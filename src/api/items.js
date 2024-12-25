import { getItems, createItem, updateItem, deleteItem } from './api.js';

// Получение всех элементов
export const fetchItems = async (items) => {
  try {
    const response = await getItems();
    items.value = response.data;
  } catch (err) {
    console.error('Error fetching items:', err);
  }
};

// Добавление нового элемента
export const addItem = async (newItemName, items) => {
  try {
    if (!newItemName.value.trim()) {
      alert('Item name cannot be empty');
      return;
    }
    const newItem = { name: newItemName.value };
    const response = await createItem(newItem);
    newItemName.value = '';

    // Локально добавляем элемент
    items.value.push(response.data);
  } catch (err) {
    console.error('Error adding item:', err);
  }
};

// Удаление элемента
export const deleteItemHandler = async (id, items) => {
  try {
    await deleteItem(id);

    // Локально удаляем элемент
    items.value = items.value.filter((item) => item.id !== id);
  } catch (err) {
    console.error('Error deleting item:', err);
  }
};

// Редактирование элемента
export const editItem = async (item, items) => {
  try {
    const updatedName = prompt('Edit item name', item.name);
    if (updatedName === null || updatedName.trim() === '') {
      alert('Item name cannot be empty');
      return;
    }
    const updatedData = { name: updatedName };
    const response = await updateItem(item.id, updatedData);

    // Локально обновляем элемент в списке
    const index = items.value.findIndex((i) => i.id === item.id);
    if (index !== -1) {
      items.value[index] = response.data;
    }
  } catch (err) {
    console.error('Error editing item:', err);
  }
};

