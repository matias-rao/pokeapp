<template>
    <div class="flex flex-col h-screen items-center">
        <div class="h-1/2 flex items-center mt-5">
            <img src="../assets/pikachu.png" alt="Pikachu" class="h-5/6 w-100">
        </div>

        <div class="h-1/2 flex flex-col items-center justify-around mb-20">
            <h1 class="text-center text-3xl font-medium">Welcome to Pokédex</h1>
            <div class="text-xl font-light w-9/12 text-center" style="color: #5e5e5e;">The digital encyclopedia created by Professor Oak is an invaluable tool to Trainers in the Pokémon world.</div>
    
            <Button msg="Get started" @click="goHome" active="true"/>
        </div>
    </div>
</template>

<script setup>
import Button from '../components/Button.vue';
import { useRouter } from 'vue-router'

const router = useRouter();

const goHome = () => {
    router.push({ name: 'Home'})
}

</script>
