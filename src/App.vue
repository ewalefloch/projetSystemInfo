<script setup>
import Message from './components/Messagerie/Message.vue';
</script>

<template>

  <main>
    <Message/>
  </main>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style scoped>

</style>

<style>
.container {
  max-width: 800px;
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
nav a:hover {
  text-decoration: underline;
}
</style>