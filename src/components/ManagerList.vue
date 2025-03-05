// src/components/ManagerList.vue
<template>
  <div class="manager-list">
    <h2>Liste des responsables</h2>
    <ul>
      <li v-for="manager in managers" :key="manager.id">
        <router-link :to="`/managers/${manager.id}`">
          {{ manager.nom }} {{ manager.prenom }}
        </router-link>
      </li>
    </ul>
    <router-link to="/managers/new" class="btn">Ajouter un responsable</router-link>
  </div>
</template>

<script>
import axios from 'axios';
import {API_MANAGER} from "@/config.js";
export default {
  data() {
    return {
      managers: []
    };
  },
  created() {
    axios.get(`${API_MANAGER}/managers`)
        .then(response => {
          this.managers = response.data;
        })
        .catch(error => {
          console.error('Erreur lors du chargement des responsables', error);
        });
  }
};
</script>

<style scoped>
.manager-list {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
ul {
  list-style: none;
  padding: 0;
}
ul li {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}
.btn {
  display: inline-block;
  margin-top: 10px;
  background-color: #28a745;
  color: white;
  padding: 10px;
  border-radius: 5px;
  text-decoration: none;
}
.btn:hover {
  background-color: #218838;
}
</style>