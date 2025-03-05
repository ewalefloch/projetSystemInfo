<script setup>
const emit = defineEmits(['login-success']);
const { token } = defineProps(["token"]);

async function sendLogout() {
	const response = await fetch("http://localhost:8080/auth/logout", {
		method: "DELETE",
		headers: new Headers({ "Authorization": token }),
	});

	document.cookie = "token=;";
	emit('logout-success');
}
</script>

<template>
	<button type="button" @click="sendLogout">Se déconnecter</button>
</template>

<style scoped>
button {
	background-color: transparent;
	border: 1px solid #c00000;
	border-radius: 4px;
	padding: 0.5rem;
	color: #c00000;
	cursor: pointer;
}
</style>
