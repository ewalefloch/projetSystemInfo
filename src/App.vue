
<script setup>
import Menu from './components/Menu/Menu.vue';
</script>

<template>

  <main>
    <Menu />
  </main>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style>
.container {
  margin: auto;
  font-family: Arial, sans-serif;
}
nav {
  display: flex;
  justify-content: space-around;
  background-color: #007bff;
  padding: 10px;
  border-radius: 5px;
}
nav a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}
</style>
