<template>
  <div class="login">
    <h1> Login Page </h1>
    <input type="text" v-model="email" placeholder="nom@hotmail.com"/>
    <input type="password" v-model="password" placeholder="*****"/>
    <button @click="login"> Login </button>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

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

<style>
.error-message {
  color: red;
  font-size: 14px;
  margin-top: 10px;
}

body {
  background-image: url("../assets/pexels.jpg");
}

.login {
  display: flex; 
  flex-direction: column;
  align-items: center;
  width: 60%;
  margin: auto;
  text-align: center;
  padding: 50px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background: #E1DAFB;
}

.login input {
  width: 100%;
  height: 40px;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 15px;
  box-sizing: border-box;
  background-color: #D3CAF6;
}

.login button {
  width: 50%;
  height: 40px;
  border: 1px solid #C4B4FD;
  background: #B09CFB;
  color: #fff;
  cursor: pointer;
  border-radius: 3px;
  border-radius: 15px;
}

.login button:hover {
  background: #735DC6;
}

h1 {
  width: 320px;
  margin: auto;
  text-align: center;
  font-size: 36px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 20px;
  text-shadow: 4px 3px 0px #fff, 9px 8px 0px rgba(0, 0, 0, 0.15);
}
</style>
