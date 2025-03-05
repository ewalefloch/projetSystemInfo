<!-- src/components/AcademicYearForm.vue -->
<template>
  <div>
    <h1>Créer une nouvelle UE</h1>
    <form @submit.prevent="createteachingunits">
      <div>
        <label for="name">Nom :</label>
        <input id="name" v-model="form.name" required>
      </div>
      <div>
        <label for="praticalWorkSize">Obligatoire :</label>
        <input id="praticalWorkSize" type="checkbox" v-model.number="form.isRequired" required>
      </div>
      <div>
        <label for="directedWorkSize">Taille :</label>
        <input id="directedWorkSize" type="number" v-model.number="form.capacity" required>
      </div>
      <div>
        <label for="numberOptionalTeachingUnit">academicYearId :</label>
        <input id="numberOptionalTeachingUnit" type="number" v-model.number="form.academicYearId" required>
      </div>
      <div>
        <label for="numberOptionalTeachingUnit">responsibleId :</label>
        <input id="numberOptionalTeachingUnit" type="number" v-model.number="form.responsibleId" required>
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
  name: 'AcademicYearForm',
  setup() {
    const router = useRouter();
    const form = reactive({
      name: '',
      isRequired: true,
      capacity: null,
      academicYearId: null,
      responsibleId: null
    });

    const createteachingunits = async () => {
      try {
        const response = await fetch(`${API_FORMATIONS}/teachingunits`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(form)
        });
        if (response.ok) {
          router.push('/teachingunits');
        } else {
          console.error('Erreur lors de la création');
        }
      } catch (error) {
        console.error('Erreur lors de la création', error);
      }
    };

    return { form, createteachingunits };
  }
}
</script>
