<script setup>
import LoginForm from './LoginForm.vue';
import RegisterForm from './RegisterForm.vue';
</script>

<template>
	<section>
		<div>
			<LoginForm />
			<hr />
			<RegisterForm />
		</div>
	</section>
</template>

<style scoped>
section {
	width: 100vw;
	height: 100vh;

	display: flex;
	justify-content: center;
	align-items: center;
}

div {
	padding: 2rem;
	border-radius: 4px;
	box-shadow: 0 0 16px #00000030;

	display: flex;
	flex-direction: row;
	gap: 2rem;
}
</style>
