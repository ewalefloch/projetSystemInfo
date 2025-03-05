<!-- src/components/GroupsList.vue -->
<template>
  <div>
    <h1>Liste des groupes</h1>
    <table>
      <thead>
      <tr>
        <th>ID</th>
        <th>Nom</th>
        <th>Requis</th>
        <th>Capacité</th>
        <th>ID Responsable</th>
        <th>ID Formation</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="ue in ues" :key="ue.id">
        <td>{{ ue.id }}</td>
        <td>{{ ue.name }}</td>
        <td>{{ ue.isRequired}}</td>
        <td>{{ ue.capacity}}</td>
        <td>{{ ue.responsibleId}}</td>
        <td>{{ ue.academicYearId }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import {API_FORMATIONS} from "@/config.js";
import {useRoute} from "vue-router";
export default {
  name: 'UeFormation',
  setup() {
    const route = useRoute();
    const ues = ref([]);

    const fetchGroups = async () => {
      try {
        const response = await fetch(`${API_FORMATIONS}/academicyears/${route.params.id}/teachingunits`);
        ues.value = await response.json();
      } catch (error) {
        console.error('Erreur lors de la récupération des groupes', error);
      }
    };

    onMounted(() => {
      fetchGroups();
    });

    return { ues };
  }
}
</script>
