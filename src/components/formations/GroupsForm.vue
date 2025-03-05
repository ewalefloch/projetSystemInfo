<!-- src/components/GroupsForm.vue -->
<template>
  <div>
    <h1>Créer une nouvelle formation</h1>
    <form @submit.prevent="createGroups">
      <div>
        <label for="name">Nom :</label>
        <input id="name" v-model="form.name" required>
      </div>
      <div>
        <label for="name">academicYearId :</label>
        <input id="name" v-model="form.academicYearId" required>
      </div>
      <button type="submit">Créer</button>
    </form>
  </div>
</template>

<script>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import {API_FORMATIONS} from "@/config.js";
export default {
  name: 'GroupsForm',
  setup() {
    const router = useRouter();
    const form = reactive({
      name: '',
      academicYearId: null
    });

    const createGroups = async () => {
      try {
        const response = await fetch(`${API_FORMATIONS}/groups`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(form)
        });
        if (response.ok) {
          router.push('/groups');
        } else {
          console.error('Erreur lors de la création');
        }
      } catch (error) {
        console.error('Erreur lors de la création', error);
      }
    };

    return { form, createGroups };
  }
}
</script>
