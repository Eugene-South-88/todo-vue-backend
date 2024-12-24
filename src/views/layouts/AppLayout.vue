<template>
  <the-header-component/>
  <div class="container">
    <h1 class="title">Items</h1>
    <ul class="item-list">
      <li class="item" v-for="item in items" :key="item.id">
        {{ item.name }}
        <button class="button" @click="deleteItem(item.id)">Delete</button>
        <button class="button" @click="edit(item)">Edit</button>
      </li>
    </ul>
    <input class="input" v-model="newItemName" placeholder="New item name"/>
    <button class="button" @click="add">Add Item</button>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import TheHeaderComponent from '/src/components/TheHeaderComponent.vue'
import {fetchItems, addItem, deleteItemHandler, editItem} from '../../api/items.js'

// Локальное состояние
const items = ref([]);
const newItemName = ref("");

// Получение списка элементов
const fetch = async () => {
  await fetchItems(items);
};

// Добавление нового элемента
const add = async () => {
  await addItem(newItemName, items); // Передаем `items` в функцию
};

// Удаление элемента
const deleteItem = async (id) => {
  await deleteItemHandler(id, items); // Передаем `items` в функцию
};

// Редактирование элемента
const edit = async (item) => {
  await editItem(item, items); // Передаем `items` в функцию
};


onMounted(fetch);
</script>