<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="message-container">
    <div class="message-header">
      <h1>Messages</h1>
      <div class="filter-buttons">
        <button @click="filterMessages('all')" :class="{ active: currentFilter === 'all' }">
          Tous les messages
        </button>
        <button @click="filterMessages('unread')" :class="{ active: currentFilter === 'unread' }">
          Non lus
          <span class="unread-count" v-if="unreadCount > 0">
            {{ unreadCount }}
          </span>
        </button>
      </div>
    </div>

    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>Chargement des messages...</p>
    </div>

    <div v-else-if="error" class="error-state">
      <p>{{ error }}</p>
    </div>

    <div v-else-if="filteredMessages.length === 0" class="empty-state">
      <p>Aucun message trouvé</p>
    </div>

    <div v-else class="message-list">
      <div v-for="message in filteredMessages" :key="message._id" class="message-item" :class="{
        'expanded': expandedMessageId === message._id,
        'unread': (!message.readed || expandedMessageId === message._id),
      }">
        <div class="message-preview" @click="toggleMessageExpansion(message)">
          <p class="message-excerpt">
            {{ getMessageExcerpt(message.text) }}
          </p>
        </div>

        <div v-if="expandedMessageId === message._id" class="message-full-content">
          <p>{{ message.text }}</p>
          <div class="message-actions">
            <button @click="deleteMessage(message._id)" class="delete-btn">
              Supprimer
            </button>
          </div>
        </div>
      </div>

      <div v-if="totalPages > 1" class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">
          Précédent
        </button>
        <span>{{ currentPage }} / {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">
          Suivant
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { API_MESSAGE_URL } from "@/config";

export default {
  data() {
    return {
      messages: [],
      loading: true,
      error: null,
      currentPage: 1,
      totalPages: 1,
      pageSize: 10,
      expandedMessageId: null,
      currentFilter: 'all'
    };
  },
  computed: {
    unreadCount() {
      return this.messages.filter(m => !m.readed).length;
    },
    filteredMessages() {
      if (this.currentFilter === 'unread') {
        return this.messages.filter(m => !m.readed || this.expandedMessageId === m._id);
      }
      return this.messages;
    }
  },
  methods: {
    async fetchMessages(studentId) {
      try {
        this.loading = true;
        const response = await fetch(
          `${API_MESSAGE_URL}/messages/student/${studentId}?page=${this.currentPage}&pageSize=${this.pageSize}`
        );

        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des messages');
        }

        const result = await response.json();
        this.messages = result.data;
        this.totalPages = result.totalPages || 1;
        this.loading = false;
      } catch (error) {
        this.error = error.message;
        this.loading = false;
        console.error("Erreur lors de la récupération des messages:", error);
      }
    },
    toggleMessageExpansion(message) {
      // Marquer comme lu si non lu
      if (!message.readed) {
        this.markMessageAsRead(message);
      }

      // Agrandir/réduire le message
      this.expandedMessageId = this.expandedMessageId === message._id ? null : message._id;
      console.log(this.expandedMessageId);
    },
    async markMessageAsRead(message) {
      try {
        const response = await fetch(`${API_MESSAGE_URL}/messages/${message._id}`, {
          method: "PUT",
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
            "Allow-Control-Allow-Origin": "*"
          },
          body: JSON.stringify({
            _id: message._id,
            text: message.text,
            readed: true,
            student: message.student
          })
        });

        if (!response.ok) {
          throw new Error("Erreur lors de la mise à jour du message");
        }

        message.readed = true;
        console.log(this.expandedMessageId);
      } catch (error) {
        console.error("Erreur lors de la mise à jour du message:", error);
      }
    },
    async deleteMessage(messageId) {
      try {
        const response = await fetch(`${API_MESSAGE_URL}/messages/${messageId}`, {
          method: "DELETE",
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error("Erreur lors de la suppression du message");
        }

        this.messages = this.messages.filter(m => m._id !== messageId);
        this.expandedMessageId = null;
      } catch (error) {
        console.error("Erreur lors de la suppression du message:", error);
      }
    },
    filterMessages(filter) {
      this.currentFilter = filter;
    },
    getMessageExcerpt(text, maxLength = 100) {
      return text.length > maxLength
        ? text.substring(0, maxLength) + '...'
        : text;
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.fetchMessages(26);
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.fetchMessages(26);
      }
    }
  },
  mounted() {
    this.fetchMessages(26);
}

};
</script>

<style scoped>
.message-container {
  max-width: 600px;
  margin: 0 auto;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background-color: #f4f6f9;
  padding: 20px;
  border-radius: 12px;
}

.message-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.message-header h1 {
  margin: 0;
  color: #2c3e50;
  font-weight: 600;
}

.filter-buttons {
  display: flex;
  gap: 10px;
}

.filter-buttons button {
  background-color: transparent;
  border: 2px solid #3498db;
  color: #3498db;
  padding: 8px 15px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.filter-buttons button.active {
  background-color: #3498db;
  color: white;
}

.unread-count {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #e74c3c;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
}

.message-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.message-item {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  overflow: hidden;
}

.message-item.unread {
  border-left: 4px solid #3498db;
}

.message-preview {
  padding: 15px;
  cursor: pointer;
}

.message-header-preview {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.message-date {
  color: #7f8c8d;
  font-size: 0.8em;
}

.message-excerpt {
  color: #34495e;
  margin: 0;
}

.message-full-content {
  background-color: #f9f9f9;
  padding: 15px;
  border-top: 1px solid #ecf0f1;
}

.message-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;
}

.delete-btn {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.delete-btn:hover {
  background-color: #c0392b;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-top: 20px;
}

.pagination button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 20px;
  cursor: pointer;
}

.pagination button:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
}

.loading-state,
.error-state,
.empty-state {
  text-align: center;
  color: #7f8c8d;
  padding: 20px;
}

.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 0 auto 15px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>