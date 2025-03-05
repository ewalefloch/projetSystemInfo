<!-- src/components/ManagerForm.vue -->
<template>
  <div>
    <h2>{{ isEdit ? 'Modifier' : 'Ajouter' }} un responsable</h2>
    <form @submit.prevent="submitForm">
      <input v-model="manager.nom" placeholder="Nom" required />
      <input v-model="manager.prenom" placeholder="Prénom" required />
      <input v-model="manager.email" placeholder="Email" required type="email" />
      <button type="submit">{{ isEdit ? 'Modifier' : 'Ajouter' }}</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import {API_MANAGER} from "@/config.js";
export default {
  data() {
    return {
      manager: { nom: "", prenom: "", email: "" },
      isEdit: false
    };
  },
  created() {
    if (this.$route.params.id) {
      this.isEdit = true;
      axios.get(`${API_MANAGER}/managers/${this.routes.params.id}`)
          .then(response => {
            this.manager = response.data;
          })
          .catch(error => {
            console.error('Erreur lors du chargement du responsable', error);
          });
    }
  },
  methods: {
    submitForm() {
      const request = this.isEdit
          ? axios.put(`${API_MANAGER}/managers/${this.routes.params.id}`, this.manager)
          : axios.post(`${API_MANAGER}/managers`, this.manager,{ headers: { 'Content-Type': 'application/json' }});

      request.then(() => {
        this.routes.push('/managers');
      }).catch(error => {
        console.error('Erreur lors de l\'enregistrement', error);
      });
    }
  }
};
</script>
