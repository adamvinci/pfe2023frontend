<template>
  <div class="login">
    <h1> Login Page </h1>
    <input type="text" v-model="email" placeholder="nom@hotmail.com"/>
    <input type="password" v-model="password" placeholder="*****"/>
    <Bouton @click="login"> Login </Bouton>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Bouton from '@/components/Bouton.vue';

const email = ref('');
const password = ref('');
const errorMessage = ref('');
const $router = useRouter();

const login = async () => {
  try {
    const response = await fetch('http://localhost:3333/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });

    if (response.ok) {
      // Utilisation de la navigation avec la référence à $router
      $router.push('/home');
    } else {
      // Affichage du message d'erreur
      errorMessage.value = 'La connexion a échoué. Vérifiez vos identifiants.';
      console.error('Erreur lors de la connexion:', response.status);
    }
  } catch (error) {
    // Affichage du message d'erreur
    errorMessage.value = 'Erreur lors de la connexion. Veuillez réessayer.';
    console.error('Erreur lors de la connexion:', error);
  }
};
</script>
