<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="container">
        <!-- Affichage de l'authentification si l'utilisateur n'est pas connecté -->
        <Auth v-if="!isAuthenticated" @login-success="handleLogin" />
        <div v-else>
            <nav>
                <ul>
                    <li 
                        v-for="(item, index) in menuItems" 
                        :key="index" 
                        @click="currentComponent = item.component"
                        :class="{ active: currentComponent === item.component }"
                    >
                        {{ item.label }}
                    </li>
                </ul>
            </nav>

            <component :is="currentComponent"></component>
        </div>

        <button v-if="!isAuthenticated" @click="continueWithoutLogin">Continuer sans se connecter</button>
    </div>
</template>

<script>
import Auth from '../auth/Auth.vue';
import Message from '../Messagerie/Message.vue';
import Profile from '../profile/Profile.vue';

export default {
    data() {
        return {
            isAuthenticated: false, 
            currentComponent: Profile,
            menuItems: [
                { label: "Profil", component: Profile },
                { label: "Messagerie", component: Message }
            ]
        };
    },
    methods: {
        handleLogin() {
            this.isAuthenticated = true; 
        },
        continueWithoutLogin() {
            this.isAuthenticated = true;
        }
    },
    components: {
        Message,
        Profile,
        Auth
    }
};
</script>

<style scoped>
.container {
    text-align: center;
}

nav ul {
    list-style-type: none;
    padding: 0;
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-bottom: 20px;
    background-color: #333;
    padding: 10px;
    border-radius: 8px;
}

nav li {
    cursor: pointer;
    padding: 10px 15px;
    color: white;
    font-weight: bold;
    border-radius: 5px;
    transition: background-color 0.3s;
}

nav li:hover {
    background-color: #555;
}

nav li.active {
    background-color: #007bff;
}

button {
    margin-top: 20px;
    background-color: #ff9800;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
}

button:hover {
    background-color: #e68900;
}
</style>
