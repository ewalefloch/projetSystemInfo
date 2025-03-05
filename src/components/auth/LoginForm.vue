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

const loginError = ref("");

async function sendLogin() {
	const loginBody = {
		username: username.value,
		password: password.value,
	};

	const response = await fetch("http://localhost:8080/auth/login", {
		method: "POST",
		headers: new Headers({ "Content-Type": "application/json" }),
		body: JSON.stringify(loginBody),
	});

	const jsonResult = await response.json();
	if (jsonResult["error"]) {
		loginError.value = jsonResult["error"];
	} else {
		loginError.value = "";
		document.cookie = `token=${jsonResult["token"]};max-age=${24 * 60 * 60}`;
		this.$emit("login-success");
	}
}
</script>

<template>
	<form>
		<h2>Se connecter à votre compte</h2>
		<FormInput type="text" name="username" placeholder="Votre nom d'utilisateur..." label="Nom d'utilisateur" @value-changed="onUsernameChanged" />
		<FormInput type="password" name="password" placeholder="Votre mot de passe..." label="Mot de passe" @value-changed="onPasswordChanged" />
		<div class="submit">
			<p v-if="loginError.length > 0" class="error">{{ loginError }}</p>
			<button type="button" :disabled="formIncomplete" @click="sendLogin">Se connecter</button>
		</div>
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

.submit {
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
}

.error {
	margin: 0;
	color: #c00000;
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
