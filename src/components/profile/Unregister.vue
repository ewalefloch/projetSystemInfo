<script setup>
import { ref, computed } from 'vue';
import FormInput from '../auth/FormInput.vue';

const { token } = defineProps(["token"]);

const formOpen = ref(false);

function openForm() {
	formOpen.value = true;
}

function closeForm() {
	formOpen.value = false;
}

const username = ref("");
const usernameValidator = /^.+$/;
const usernameValid = ref(false);

function onUsernameChanged(newUsername) {
	username.value = newUsername;
	usernameValid.value = usernameValidator.test(newUsername);
}

const password = ref("");
const passwordValidator = /^.+$/;
const passwordValid = ref(false);

function onPasswordChanged(newPassword) {
	password.value = newPassword;
	passwordValid.value = passwordValidator.test(newPassword);
}

const formIncomplete = computed(() => {
	return !usernameValid.value || !passwordValid.value;
});

const error = ref("");

async function sendUnregister() {
	const params = new URLSearchParams();
	params.set("username", username.value);
	params.set("password", password.value);

	const response = await fetch(`http://localhost:8080/auth/unregister?${params.toString()}`, {
		method: "DELETE",
	});

	const jsonResult = await response.json();

	if (jsonResult["error"]) {
		error.value = jsonResult["error"];
	} else {
		document.cookie = "token=;";
	}
}
</script>

<template>
	<button v-if="!formOpen" @click="openForm" class="super-bad-button">Supprimer le compte</button>
	<div v-else class="bad-container">
		<button @click="closeForm" class="neutral-button">Annuler</button>
		<form>
			<FormInput name="username" type="text" label="Nom d'utilisateur" placeholder="Votre nom d'utilisateur..." @value-changed="onUsernameChanged" />
			<FormInput name="password" type="password" label="Mot de passe" placeholder="Votre mot de passe..." @value-changed="onPasswordChanged" />
			<div class="submit-container">
				<p v-if="error.length > 0" class="error">{{ error }}</p>
				<button type="button" class="super-bad-button" :disabled="formIncomplete" @click="sendUnregister">Supprimer le compte</button>
			</div>
		</form>
	</div>
</template>

<style scoped>
.bad-container {
	border: 1px solid #c00000;
	border-radius: 4px;
	padding: 1rem;

	display: flex;
	flex-direction: column;
	gap: 1rem;
}

form {
	display: flex;
	flex-direction: column;
	gap: 1rem;
}

.neutral-button {
	background-color: #e0e0e0;
	border: none;
	border-radius: 4px;
	padding: 0.5rem;
	cursor: pointer;
}

.super-bad-button {
	background-color: #c00000;
	border: none;
	border-radius: 4px;
	padding: 0.5rem;
	color: #fff;
	cursor: pointer;
}

button:disabled {
	opacity: 0.5;
	cursor: not-allowed;
}

.submit-container {
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
}

.error {
	margin: 0;
	color: #c00000;
}
</style>
