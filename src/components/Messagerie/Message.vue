<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="message">
        <h1>Gestion messages</h1>
    <div class="composant">
        <CreateMessage />
        <ListMessage />
    </div>
       
    </div>
</template>

<script>
import CreateMessage from './CreateMessage.vue';
import ListMessage from './ListMessage.vue';

export default {
    components: {
        CreateMessage,
        ListMessage
    }

}
</script>

<style scoped>
.message {
    display: flex;
    flex-direction: column;
}
.composant {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
}
</style>