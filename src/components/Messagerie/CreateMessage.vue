<template>
    <div class="message-creation-container">
        <div class="message-creation-card">
            <h1>Nouveau Message</h1>

            <form @submit.prevent="createMessage" class="message-form">
                <div class="form-group">
                    <label for="student">Destinataire</label>
                    <div class="input-wrapper">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="input-icon">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="8.5" cy="7" r="4"></circle>
                        </svg>
                        <input v-model="message.student" id="student" placeholder="Numero de l'étudiant" required>
                    </div>
                </div>

                <div class="form-group">
                    <label for="text">Message</label>
                    <div class="textarea-wrapper">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="input-icon">
                            <path d="M12 20h9"></path>
                            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                        </svg>
                        <textarea v-model="message.text" id="text" placeholder="Écrivez votre message ici..." required
                            rows="4"></textarea>
                    </div>
                </div>

                <div class="form-actions">
                    <button type="submit" class="submit-button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="button-icon">
                            <line x1="22" y1="2" x2="11" y2="13"></line>
                            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                        </svg>
                        Envoyer le message
                    </button>
                </div>
            </form>

            <div v-if="successMessage" class="notification success">
                {{ successMessage }}
            </div>

            <div v-if="errorMessage" class="notification error">
                {{ errorMessage }}
            </div>
        </div>
    </div>
</template>

<script>
import { API_MESSAGE_URL } from "@/config";

export default {
    name: 'CreateMessage',
    data() {
        return {
            message: {
                _id: '',
                text: '',
                student: '',
                readed: false
            },
            successMessage: '',
            errorMessage: ''
        };
    },
    methods: {
        async createMessage() {
            this.successMessage = '';
            this.errorMessage = '';

            try {
                const response = await fetch(`${API_MESSAGE_URL}/messages`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(this.message)
                });

                if (!response.ok) {
                    this.errorMessage = 'Une erreur est survenue, veuillez réessayer.';
                    throw new Error('Erreur lors de la création du message');
                }

                this.successMessage = 'Message sauvegardé avec succès !';
                this.getMesssage(this.message.student);
                this.message = { _id: '', text: '', student: '', readed: false };
                setTimeout(() => { this.successMessage = ''; }, 3000);

                // Émettre un événement pour rafraîchir la liste des messages
                this.$emit('messageCreated');
            } catch (error) {
                this.errorMessage = 'Une erreur est survenue, veuillez réessayer.';
                setTimeout(() => { this.errorMessage = ''; }, 3000);
                console.error('Erreur lors de la création du message:', error);
            }
        },
        async getMesssage(student) {
            console.log('student', student);
            this.$root.$emit('ListMessage', student);
        }
    }

};
</script>

<style scoped>
.message-creation-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f4f6f9;
    padding: 20px;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.message-creation-card {
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    padding: 40px;
    width: 100%;
    max-width: 500px;
}

.message-creation-card h1 {
    text-align: center;
    color: #2c3e50;
    margin-bottom: 30px;
    font-weight: 600;
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    color: #34495e;
    font-weight: 500;
}

.input-wrapper,
.textarea-wrapper {
    display: flex;
    align-items: center;
    position: relative;
}

.input-icon {
    position: absolute;
    left: 12px;
    color: #a0aec0;
}

.input-wrapper input,
.textarea-wrapper textarea {
    width: 100%;
    padding: 12px 12px 12px 40px;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    font-size: 16px;
    transition: all 0.3s ease;
}

.input-wrapper input:focus,
.textarea-wrapper textarea:focus {
    border-color: #3498db;
    outline: none;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

.form-actions {
    margin-top: 20px;
}

.submit-button {
    width: 100%;
    padding: 15px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    transition: all 0.3s ease;
}

.submit-button:hover {
    background-color: #2980b9;
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(52, 152, 219, 0.3);
}

.button-icon {
    width: 20px;
    height: 20px;
}

.notification {
    margin-top: 20px;
    padding: 12px;
    border-radius: 8px;
    text-align: center;
    font-weight: 500;
    animation: fadeInOut 3s;
}

.notification.success {
    background-color: #48bb78;
    color: white;
}

.notification.error {
    background-color: #e53e3e;
    color: white;
}

@keyframes fadeInOut {

    0%,
    100% {
        opacity: 0;
    }

    10%,
    90% {
        opacity: 1;
    }
}
</style>