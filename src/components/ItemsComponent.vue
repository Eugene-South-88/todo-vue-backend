<template>
  <div class="container">
    <h1 class="title">Items</h1>
    <ul class="item-list">
      <li class="item" v-for="item in items" :key="item.id">
        {{ item.name }}
        <button  class="button" @click="deleteItemHandler(item.id)">Delete</button>
        <button  class="button" @click="editItem(item)">Edit</button>
      </li>
    </ul>
    <input class="input" v-model="newItemName" placeholder="New item name" />
    <button class="button" @click="addItem">Add Item</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getItems, createItem, updateItem, deleteItem } from '../api';

const items = ref([]);
const newItemName = ref('');

// Получение всех элементов
const fetchItems = async () => {
  try {
    const response = await getItems();
    items.value = response.data;
  } catch (err) {
    console.error('Error fetching items:', err);
  }
};

// Добавление нового элемента
const addItem = async () => {
  try {
    if (!newItemName.value.trim()) {
      alert('Item name cannot be empty');
      return;
    }
    const newItem = { name: newItemName.value };
    await createItem(newItem);
    newItemName.value = '';
    await fetchItems();
  } catch (err) {
    console.error('Error adding item:', err);
  }
};

// Удаление элемента
const deleteItemHandler = async (id) => {
  try {
    await deleteItem(id);
    await fetchItems();
  } catch (err) {
    console.error('Error deleting item:', err);
  }
};

// Редактирование элемента
const editItem = async (item) => {
  try {
    const updatedName = prompt('Edit item name', item.name);
    if (updatedName === null || updatedName.trim() === '') {
      alert('Item name cannot be empty');
      return;
    }
    const updatedData = { name: updatedName };
    await updateItem(item.id, updatedData);
    await fetchItems();
  } catch (err) {
    console.error('Error editing item:', err);
  }
};

onMounted(fetchItems);
</script>
