<!-- src/components/AcademicYearDetail.vue -->
<template>
  <div v-if="academicYear">
    <h1>Détails de la formation</h1>
    <div>
      <label>ID :</label> {{ academicYear.id }}
    </div>
    <div>
      <label>Nom :</label>
      <input v-model="academicYear.name">
    </div>
    <div>
      <label>Taille max des TP :</label>
      <input type="number" v-model.number="academicYear.praticalWorkSize">
    </div>
    <div>
      <label>Taille max des TD :</label>
      <input type="number" v-model.number="academicYear.directedWorkSize">
    </div>
    <div>
      <label>Nombre d'UE optionnelles :</label>
      <input type="number" v-model.number="academicYear.numberOptionalTeachingUnit">
    </div>
    <div>
      <label>ID du responsable :</label>
      <input type="number" v-model.number="academicYear.responsibleId">
    </div>
    <button @click="updateAcademicYear">Mettre à jour</button>
    <button @click="deleteAcademicYear">Supprimer</button>
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
    const academicYear = ref(null);

    const fetchAcademicYear = async () => {
      try {
        const response = await fetch(`${API_FORMATIONS}/academicyears/${route.params.id}`);
        academicYear.value = await response.json();
      } catch (error) {
        console.error('Erreur lors de la récupération', error);
      }
    };

    const updateAcademicYear = async () => {
      try {
        const response = await fetch(`${API_FORMATIONS}/academicyears/${route.params.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(academicYear.value)
        });
        if (response.ok) {
          router.push('/academicyears');
        }
      } catch (error) {
        console.error('Erreur lors de la mise à jour', error);
      }
    };

    const deleteAcademicYear = async () => {
      try {
        const response = await fetch(`${API_FORMATIONS}/academicyears/${route.params.id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          router.push('/academicyears');
        }
      } catch (error) {
        console.error('Erreur lors de la suppression', error);
      }
    };

    onMounted(() => {
      fetchAcademicYear();
    });

    return { academicYear, updateAcademicYear, deleteAcademicYear };
  }
}
</script>
