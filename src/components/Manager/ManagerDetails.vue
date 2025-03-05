<!-- src/components/ManagerDetails.vue -->
<template>
  <div v-if="manager">
    <h2>{{ manager.nom }} {{ manager.prenom }}</h2>
    <p>Email: {{ manager.email }}</p>
    <button @click="deleteManager">Supprimer</button>
    <router-link class="custom-link" :to="`/managers/edit/${manager.id}`">Modifier</router-link>
  </div>
</template>

<script>
import axios from 'axios';
import {API_MANAGER} from "@/config.js";
export default {
  data() {
    return {
      manager: null
    };
  },
  created() {
    axios.get(`${API_MANAGER}/managers/${this.$route.params.id}`)
        .then(response => {
          this.manager = response.data;
        })
        .catch(error => {
          console.error('Erreur lors du chargement du responsable', error);
        });
  },
  methods: {
    deleteManager() {
      axios.delete(`${API_MANAGER}/managers/${this.$route.params.id}`)
          .then(() => {
            this.$router.push('/managers');
          })
          .catch(error => {
            console.error('Erreur lors de la suppression', error);
          });
    }
  }
};
</script>
<style scoped>
.custom-link {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
}

.custom-link:hover {
  background-color: #0056b3;
}
</style>