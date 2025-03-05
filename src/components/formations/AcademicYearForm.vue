<!-- src/components/AcademicYearForm.vue -->
<template>
  <div>
    <h1>Créer une nouvelle formation</h1>
    <form @submit.prevent="createAcademicYear">
      <div>
        <label for="name">Nom :</label>
        <input id="name" v-model="form.name" required>
      </div>
      <div>
        <label for="praticalWorkSize">Taille max des TP :</label>
        <input id="praticalWorkSize" type="number" v-model.number="form.praticalWorkSize" required>
      </div>
      <div>
        <label for="directedWorkSize">Taille max des TD :</label>
        <input id="directedWorkSize" type="number" v-model.number="form.directedWorkSize" required>
      </div>
      <div>
        <label for="numberOptionalTeachingUnit">Nombre d'UE optionnelles :</label>
        <input id="numberOptionalTeachingUnit" type="number" v-model.number="form.numberOptionalTeachingUnit" required>
      </div>
      <div>
        <label for="responsibleId">ID du responsable :</label>
        <input id="responsibleId" type="number" v-model.number="form.responsibleId">
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
      praticalWorkSize: 0,
      directedWorkSize: 0,
      numberOptionalTeachingUnit: 0,
      responsibleId: null
    });

    const createAcademicYear = async () => {
      try {
        const response = await fetch(`${API_FORMATIONS}/academicyears`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(form)
        });
        if (response.ok) {
          router.push('/academicyears');
        } else {
          console.error('Erreur lors de la création');
        }
      } catch (error) {
        console.error('Erreur lors de la création', error);
      }
    };

    return { form, createAcademicYear };
  }
}
</script>
