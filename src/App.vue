<script setup>
</script>

<template>
  <div>
    <nav>
      <router-link to="/managers">Liste des responsables</router-link>
      <router-link to="/managers/new">Ajouter un responsable</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
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