<script setup>
import { computed, ref } from 'vue';
import FormInput from './FormInput.vue';

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
})
</script>

<template>
	<form>
		<h2>Se connecter à votre compte</h2>
		<FormInput type="text" name="username" placeholder="Votre nom d'utilisateur..." label="Nom d'utilisateur" @value-changed="onUsernameChanged" />
		<FormInput type="password" name="password" placeholder="Votre mot de passe..." label="Mot de passe" @value-changed="onPasswordChanged" />
		<button type="submit" :disabled="formIncomplete">Se connecter</button>
	</form>
</template>

<style scoped>
form {
	display: flex;
	flex-direction: column;
	gap: 1rem;

	min-width: 20rem;
}

h2 {
	text-align: center;
}

button {
	background-color: #0bdd82;
	border: none;
	border-radius: 4px;
	padding: 0.5rem;

	cursor: pointer;
}

button:disabled {
	opacity: 0.5;

	cursor: not-allowed;
}
</style>
