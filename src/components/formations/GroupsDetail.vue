<!-- src/components/AcademicYearDetail.vue -->
<template>
  <div v-if="group">
    <h1>Détails du groupe</h1>
    <div>
      <label>ID :</label> {{ group.id }}
    </div>
    <div>
      <label>Nom :</label>
      <input v-model="group.name">
    </div>
    <div>
      <label>academicYearId :</label>
      <input type="number" v-model.number="group.academicYearId">
    </div>
    <button @click="updategroup">Mettre à jour</button>
    <button @click="deletegroup">Supprimer</button>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {API_FORMATIONS} from "@/config.js";
export default {
  name: 'GroupsDetail',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const group = ref(null);

    const fetchgroup = async () => {
      try {
        const response = await fetch(`${API_FORMATIONS}/groups/${route.params.id}`);
        group.value = await response.json();
      } catch (error) {
        console.error('Erreur lors de la récupération', error);
      }
    };

    const updategroup = async () => {
      try {
        const response = await fetch(`${API_FORMATIONS}/groups/${route.params.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(group.value)
        });
        if (response.ok) {
          router.push('/groups');
        }
      } catch (error) {
        console.error('Erreur lors de la mise à jour', error);
      }
    };

    const deletegroup = async () => {
      try {
        const response = await fetch(`${API_FORMATIONS}/groups/${route.params.id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          router.push('/groups');
        }
      } catch (error) {
        console.error('Erreur lors de la suppression', error);
      }
    };

    onMounted(() => {
      fetchgroup();
    });

    return { group, updategroup, deletegroup };
  }
}
</script>
