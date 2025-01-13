<template>
    <div class="header">
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
        <router-link to="/signup">Signup</router-link>
        <router-link to="/login">Login</router-link>
    </div>
</template>

<style scoped>
.header {
    text-align: center;

    a {
        display: inline-block;
        margin: var(--spacing) 20px;
        font-weight: 300;
        color: #333;
    }
}
</style>