<!-- src/components/AcademicYearsList.vue -->
<template>
  <div>
    <h1>Liste des formations</h1>
    <router-link to="/academicyears/new">Créer une formation</router-link>
    <table>
      <thead>
      <tr>
        <th>ID</th>
        <th>Nom</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="year in academicYears" :key="year.id">
        <td>{{ year.id }}</td>
        <td>{{ year.name }}</td>
        <td>
          <router-link :to="`/academicyears/${year.id}`">Voir</router-link>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import {API_FORMATIONS} from "@/config.js";
export default {
  name: 'AcademicYearsList',
  setup() {
    const academicYears = ref([]);

    const fetchAcademicYears = async () => {
      try {
        const response = await fetch(`${API_FORMATIONS}/academicyears`);
        academicYears.value = await response.json();
      } catch (error) {
        console.error('Erreur lors de la récupération des formations', error);
      }
    };

    onMounted(() => {
      fetchAcademicYears();
    });

    return { academicYears };
  }
}
</script>
