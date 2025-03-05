<!-- src/components/TeachingUnitsList.vue -->
<template>
  <div>
    <h1>Liste des UE</h1>
    <table>
      <thead>
      <tr>
        <th>ID</th>
        <th>Nom</th>
        <th>Obligatoire</th>
        <th>Capacité</th>
        <th>ID Formation</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="unit in teachingUnits" :key="unit.id">
        <td>{{ unit.id }}</td>
        <td>{{ unit.name }}</td>
        <td>{{ unit.isRequired ? 'Oui' : 'Non' }}</td>
        <td>{{ unit.capacity }}</td>
        <td>{{ unit.academicYearId }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
export default {
  name: 'TeachingUnitsList',
  setup() {
    const teachingUnits = ref([]);

    const fetchTeachingUnits = async () => {
      try {
        const response = await fetch('http://localhost:8080/teachingunits');
        teachingUnits.value = await response.json();
      } catch (error) {
        console.error('Erreur lors de la récupération des UE', error);
      }
    };

    onMounted(() => {
      fetchTeachingUnits();
    });

    return { teachingUnits };
  }
}
</script>
