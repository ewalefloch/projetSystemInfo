<template>
    <div class="create-message">
        <h1>Create a New Message</h1>

        <form @submit.prevent="createMessage">
            <div class="form-group">
                <label for="text">Text Message</label>
                <textarea v-model="message.text" id="text" required></textarea>
            </div>
            <div class="form-group">
                <label for="student">Student</label>
                <input v-model="message.student" id="student" required>
            </div>

            <button type="submit">Create Message</button>

            <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
            <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        </form>
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
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.message)
                });

                if (!response.ok) {
                    this.errorMessage = 'Une erreur est survenue, veuillez réessayer.';
                    throw new Error('Erreur lors de la création du message');
                }

                this.message = { _id: '', text: '', student: '', readed: false };
                this.successMessage = 'Message sauvegardé avec succès !';

                setTimeout(() => { this.successMessage = ''; }, 3000);
            } catch (error) {
                this.errorMessage = 'Une erreur est survenue, veuillez réessayer.';
                setTimeout(() => { this.errorMessage = ''; }, 3000);
                console.error('Erreur lors de la création du message:', error);
            }
        }
    }
};
</script>


<style scoped>
.create-message {
    max-width: 1000px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    font-family: Arial, Helvetica, sans-serif;
}

.create-message h1 {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
}

.form-group {
    margin-bottom: 20px;
    padding: 5px;
    margin: 5px;
}

.create-message label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: #555;
}

.create-message textarea,
.create-message input {
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 16px;
    transition: border-color 0.3s ease-in-out;
}

.create-message textarea:focus,
.create-message input:focus {
    border-color: #007bff;
    outline: none;
}

.create-message button {
    display: block;
    width: 100%;
    padding: 12px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
}

.create-message button:hover {
    background-color: #0056b3;
}

.success-message {
    text-align: center;
    margin-top: 15px;
    padding: 10px;
    background-color: #28a745;
    color: white;
    border-radius: 8px;
    font-weight: bold;
}
.error-message {
    text-align: center;
    margin-top: 15px;
    padding: 10px;
    background-color: #dc3545;
    color: white;
    border-radius: 8px;
    font-weight: bold;
}
</style>
