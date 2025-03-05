<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="messages-container">
    <h1>List message</h1>
    <div class="message-list">
      <ul>
        <li v-for="message in messages" :key="message._id" @click="selectMessage(message)">
          {{ message.text }}
        </li>
      </ul>
    </div>
    <div class="message-detail" v-if="selectedMessage">
      <h3>Détails du message</h3>
      <p><strong>ID :</strong> {{ selectedMessage._id }}</p>
      <p><strong>Texte :</strong> {{ selectedMessage.text }}</p>
      <p><strong>Lu :</strong> {{ selectedMessage.readed ? 'Oui' : 'Non' }}</p>
      <p><strong>Étudiant :</strong> {{ selectedMessage.student }}</p>
    </div>
  </div>
</template>

<script>
import { API_MESSAGE_URL } from "@/config";

export default {
  data() {
    return {
      messages: [],
      selectedMessage: null
    };
  },
  methods: {
    async fetchMessages(studentId) {
      try {
        const response = await fetch(`${API_MESSAGE_URL}/messages/student/${studentId}`);
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des messages');
        }
        const data = await response.json();
        this.messages = data;
      } catch (error) {
        console.error("Erreur lors de la récupération des messages:", error);
      }
    },
    selectMessage(message) {
      this.selectedMessage = message;
    }
  },
  mounted() {
    this.fetchMessages(26);
  }
};
</script>

<style scoped>
.messages-container {
  display: flex;
}

.message-list {
  width: 40%;
  margin-right: 20px;
  list-style-type: none;
  padding: 0;
}

.message-list li {
  cursor: pointer;
  padding: 10px;
  background-color: #f9f9f9;
  margin-bottom: 5px;
  border: 1px solid #ddd;
}

.message-list li:hover {
  background-color: #e0e0e0;
}

.message-detail {
  width: 60%;
  padding: 10px;
  background-color: #f4f4f4;
  border: 1px solid #ddd;
}
</style>