<!-- src/components/AcademicYearDetail.vue -->
<template>
  <div v-if="teachingUnit">
    <h1>Détails de l'UE</h1>
    <div>
      <label>ID :</label> {{ teachingUnit.id }}
    </div>
    <div>
      <label>Nom :</label>
      <input v-model="teachingUnit.name">
    </div>
    <div>
      <label>ID du responsable :</label>
      <input type="number" v-model.number="teachingUnit.isRequired">
    </div>
    <div>
      <label>Taille max des TD :</label>
      <input type="number" v-model.number="teachingUnit.academicYearId">
    </div>
    <div>
      <label>ID du responsable :</label>
      <input type="number" v-model.number="teachingUnit.responsibleId">
    </div>
    <button @click="updateteachingUnit">Mettre à jour</button>
    <button @click="deleteteachingUnit">Supprimer</button>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {API_FORMATIONS} from "@/config.js";
export default {
  name: 'AcademicYearDetail',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const teachingUnit = ref(null);

    const fetchteachingUnit = async () => {
      try {
        const response = await fetch(`${API_FORMATIONS}/teachingunits/${route.params.id}`);
        teachingUnit.value = await response.json();
      } catch (error) {
        console.error('Erreur lors de la récupération', error);
      }
    };

    const updateteachingUnit = async () => {
      try {
        const response = await fetch(`${API_FORMATIONS}/teachingunits/${route.params.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(teachingUnit.value)
        });
        if (response.ok) {
          router.push('/teachingunits');
        }
      } catch (error) {
        console.error('Erreur lors de la mise à jour', error);
      }
    };

    const deleteteachingUnit = async () => {
      try {
        const response = await fetch(`${API_FORMATIONS}/teachingunits/${route.params.id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          router.push('/teachingunits');
        }
      } catch (error) {
        console.error('Erreur lors de la suppression', error);
      }
    };

    onMounted(() => {
      fetchteachingUnit();
    });

    return { teachingUnit, updateteachingUnit, deleteteachingUnit };
  }
}
</script>
