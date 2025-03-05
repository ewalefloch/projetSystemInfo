<!-- src/App.vue -->
<template>
  <div id="app">
    <nav>
      <router-link to="/academicyears">Formations</router-link> |
      <router-link to="/groups">Groupes</router-link> |
      <router-link to="/teachingunits">UE</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
