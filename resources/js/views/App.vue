<template>
    <div>
        <div class="container">
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <router-link class="nav-item nav-link" :to="{ name: 'home' }">Home</router-link>
                <router-link class="nav-item nav-link" :to="{ name: 'employes' }">Employes</router-link>
            </nav>
        </div>
        <div class="container">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
    export default {}
</script>
