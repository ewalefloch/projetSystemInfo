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
	return !usernameValid || !passwordValid || !confirmPasswordValid || !studentValid || (password.value !== confirmPassword.value);
});
</script>

<template>
	<form>
		<h2>Créer un nouveau compte</h2>
		<FormInput type="text" name="username" placeholder="Votre nom d'utilisateur..." label="Nom d'utilisateur" @value-changed="onUsernameChanged" />
		<FormInput type="password" name="password" placeholder="Votre mot de passe..." label="Mot de passe" @value-changed="onPasswordChanged" />
		<FormInput type="password" name="password-confirm" placeholder="Confirmez votre mot de passe..." label="Confirmation du mot de passe" @value-changed="onConfirmPasswordChanged" />
		<FormInput type="text" name="student" placeholder="Votre numéro étudiant..." label="Numéro étudiant" @value-changed="onStudentChanged" />
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
