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
        <th>Details</th>
        <th>Groupes</th>
        <th>UE</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="year in academicYears" :key="year.id">
        <td>{{ year.id }}</td>
        <td>{{ year.name }}</td>
        <td>
          <router-link :to="`/academicyears/${year.id}`">Voir</router-link>
        </td>
        <td>
          <router-link :to="`/academicyears/${year.id}/groups`">Voir</router-link>
        </td>
        <td>
          <router-link :to="`/academicyears/${year.id}/teachingunits`">Voir</router-link>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
  <div>
    <button @click="scrap">scrap</button>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import {API_FORMATIONS} from "@/config.js";
import axios from "axios";
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
    const scrap = async () => {
      try {
        const response = axios.post(`${API_FORMATIONS}/academicyears/scraper`);
        console.log(response);
      } catch (error) {
        console.error('Erreur lors de la récupération des formations', error);
      }
    }
    onMounted(() => {
      fetchAcademicYears();
    });

    return { academicYears, scrap };
  }
}
</script>
