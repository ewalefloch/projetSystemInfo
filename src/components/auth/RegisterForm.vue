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

const confirmPassword = ref("");
const confirmPasswordValidator = /^.+$/;
const confirmPasswordValid = ref(false);

function onConfirmPasswordChanged(newConfirmPassword) {
	confirmPassword.value = newConfirmPassword;
	confirmPasswordValid.value = confirmPasswordValidator.test(newConfirmPassword);
}

const student = ref("");
const studentValidator = /^.+$/;
const studentValid = ref(false);

function onStudentChanged(newStudent) {
	student.value = newStudent;
	studentValid.value = studentValidator.test(newStudent);
}

const formIncomplete = computed(() => {
	return !usernameValid.value || !passwordValid.value || !confirmPasswordValid.value || !studentValid.value || (password.value != confirmPassword.value);
});

const registerError = ref("");

async function sendRegister() {
	const registerBody = {
		username: username.value,
		password: password.value,
		student: student.value,
	};

	const response = await fetch("http://localhost:8080/auth/register", {
		method: "POST",
		headers: new Headers({ "Content-Type": "application/json" }),
		body: JSON.stringify(registerBody),
	});

	const jsonResult = await response.json();
	if (jsonResult["error"]) {
		registerError.value = jsonResult["error"];
	} else {
		registerError.value = "";
		document.cookie = `token=${jsonResult["token"]};max-age=${24 * 60 * 60}`;
	}
}
</script>

<template>
	<form>
		<h2>Créer un nouveau compte</h2>
		<FormInput type="text" name="username" placeholder="Votre nom d'utilisateur..." label="Nom d'utilisateur" @value-changed="onUsernameChanged" />
		<FormInput type="password" name="password" placeholder="Votre mot de passe..." label="Mot de passe" @value-changed="onPasswordChanged" />
		<FormInput type="password" name="password-confirm" placeholder="Confirmez votre mot de passe..." label="Confirmation du mot de passe" @value-changed="onConfirmPasswordChanged" />
		<FormInput type="text" name="student" placeholder="Votre numéro étudiant..." label="Numéro étudiant" @value-changed="onStudentChanged" />
		<div class="submit">
			<p v-if="registerError.length > 0" class="error">{{ registerError }}</p>
			<button type="button" :disabled="formIncomplete" @click="sendRegister">Se connecter</button>
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
