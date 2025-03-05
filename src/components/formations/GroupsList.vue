<!-- src/components/GroupsList.vue -->
<template>
  <div>
    <h1>Liste des groupes</h1>
    <table>
      <thead>
      <tr>
        <th>ID</th>
        <th>Nom</th>
        <th>ID Formation</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="group in groups" :key="group.id">
        <td>{{ group.id }}</td>
        <td>{{ group.name }}</td>
        <td>{{ group.academicYearId }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
export default {
  name: 'GroupsList',
  setup() {
    const groups = ref([]);

    const fetchGroups = async () => {
      try {
        const response = await fetch('http://localhost:8080/groups');
        groups.value = await response.json();
      } catch (error) {
        console.error('Erreur lors de la récupération des groupes', error);
      }
    };

    onMounted(() => {
      fetchGroups();
    });

    return { groups };
  }
}
</script>
