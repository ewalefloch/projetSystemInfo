<script setup>
import { ref } from 'vue';

defineProps({
	name: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		required: true,
	},
	label: {
		type: String,
		required: true,
	},
	placeholder: {
		type: String,
		required: true,
	}
})

const value = ref("");
const emit = defineEmits(["value-changed"]);

function onValueChanged(e) {
	emit("value-changed", e.currentTarget.value);
}
</script>

<template>
	<div>
		<label :for="name">{{ label }}</label>
		<input :type="type" :name="name" :id="name" :placeholder="placeholder" required :value="value" @input="onValueChanged" />
	</div>
</template>

<style scoped>
div {
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
}
</style>
