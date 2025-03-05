<script setup>
import { computed, ref } from 'vue';
import Logout from './Logout.vue';
import Unregister from './Unregister.vue';

const loading = ref(true);
const error = ref("");
const profile = ref(undefined);
const emit = defineEmits(['login-success']);

async function getProfile() {
	const response = await fetch("http://localhost:8080/auth/me", {
		method: "GET",
		headers: new Headers({"Authorization": token})
	});

	const jsonResult = await response.json();

	if (jsonResult["error"]) {
		error.value = jsonResult["error"];
		loading.value = false;
	} else {
		profile.value = jsonResult;
		loading.value = false;
		console.log(jsonResult);
	}
}

let token = undefined;

const cookieIndex = document.cookie.indexOf("token");
if (cookieIndex != -1) {
	const tokenStartIndex = document.cookie.indexOf("=", cookieIndex) + 1;
	if (tokenStartIndex != -1) {
		const tokenEndIndex = document.cookie.indexOf(";", tokenStartIndex);
		const realEndIndex = tokenEndIndex != -1 ? tokenEndIndex : document.cookie.length;
		token = document.cookie.substring(tokenStartIndex, realEndIndex);
		console.log(token);
	} else {
		console.log("pas de = après token")
	}
} else {
	console.log("pas de token dans cookie")
}

if (token) {
	getProfile();
} else {
	error.value = "Vous n'êtes pas connecté.";
	loading.value = false;
}
function handleLogoutSuccess() {
    emit('logout-success');
}
</script>

<template>
	<section class="layout">
		<div v-if="loading || error.length > 0" class="content-container">
			<p v-if="loading">Chargement des informations...</p>
			<p v-else>{{ error }}</p>
		</div>
		<div v-else class="content-container">
			<p>Votre numéro étudiant : {{ profile["student"] }}</p>
			<Logout :token="token" @logout-success="handleLogoutSuccess"/>
			<Unregister :token="token" />
		</div>
	</section>
</template>

<style scoped>
.layout {
	width: 100vw;
	height: 100vh;

	display: flex;
	justify-content: center;
	align-items: center;
}

.content-container {
	padding: 2rem;
	border-radius: 4px;
	box-shadow: 0 0 16px #00000030;

	display: flex;
	flex-direction: column;
	gap: 1rem;
}
</style>
