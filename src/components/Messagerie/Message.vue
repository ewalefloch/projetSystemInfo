<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="message-management">
        <h1>Gestion des Messages</h1>
        <div class="composant-container">
            <div class="composant-left">
                <!-- Écouter l'événement 'messageCreated' -->
                <CreateMessage @messageCreated="fetchMessages" />
            </div>
            <div class="composant-right">
                <ListMessage ref="listMessage" />
            </div>
        </div>
    </div>
</template>

<script>
import CreateMessage from './CreateMessage.vue';
import ListMessage from './ListMessage.vue';

export default {
    components: {
        CreateMessage,
        ListMessage
    },
    methods: {
        fetchMessages() {
            this.$refs.listMessage.fetchMessages(26);
        }
    }
}
</script>

<style scoped>
.message-management {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: #f4f6f9;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.message-management h1 {
    text-align: center;
    color: #2c3e50;
    padding: 20px;
    margin: 0;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.composant-container {
    display: flex;
    flex: 1;
    overflow: hidden;
}

.composant-left,
.composant-right {
    width: 50%;
    padding: 20px;
    overflow-y: auto;
    background-color: #f4f6f9;
}

.composant-left {
    border-right: 1px solid #e0e6ed;
}

/* Responsive Design */
@media screen and (max-width: 1024px) {
    .composant-container {
        flex-direction: column;
    }

    .composant-left,
    .composant-right {
        width: 100%;
        border-right: none;
    }

    .composant-left {
        border-bottom: 1px solid #e0e6ed;
    }
}

/* Scrollbar Styling */
.composant-left::-webkit-scrollbar,
.composant-right::-webkit-scrollbar {
    width: 8px;
}

.composant-left::-webkit-scrollbar-track,
.composant-right::-webkit-scrollbar-track {
    background: #f1f1f1;
}

.composant-left::-webkit-scrollbar-thumb,
.composant-right::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
}

.composant-left::-webkit-scrollbar-thumb:hover,
.composant-right::-webkit-scrollbar-thumb:hover {
    background: #555;
}
</style>