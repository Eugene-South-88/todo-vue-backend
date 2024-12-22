<template>
  <div class="container">
    <h1 class="title">Items</h1>
    <ul class="item-list">
      <li v-for="item in items" :key="item.id" class="item">
        {{ item.name }}
        <button @click="deleteItem(item.id)" class="button">Delete</button>
      </li>
    </ul>
    <input v-model="newItemName" class="input" placeholder="New item name" />
    <button @click="addItem" class="button">Add Item</button>
  </div>
</template>

<script>
import { getItems, createItem, deleteItem } from '../api';

export default {
  data() {
    return {
      items: [],
      newItemName: '',
    };
  },
  async created() {
    await this.fetchItems();
  },
  methods: {
    async fetchItems() {
      try {
        const response = await getItems();
        this.items = response.data;
      } catch (err) {
        console.error('Error fetching items:', err);
      }
    },
    async addItem() {
      try {
        const newItem = { name: this.newItemName };
        await createItem(newItem);
        this.newItemName = '';
        await this.fetchItems();
      } catch (err) {
        console.error('Error adding item:', err);
      }
    },
    async deleteItem(id) {
      try {
        await deleteItem(id);
        await this.fetchItems();
      } catch (err) {
        console.error('Error deleting item:', err);
      }
    },
  },
};
</script>

<style scoped>
</style>
