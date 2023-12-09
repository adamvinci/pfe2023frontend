<template>
  <div class="login">
    <h1>Login Page</h1>
    <input type="text" v-model="nom" placeholder="nom" />
    <input type="password" v-model="password" placeholder="*****" />
    <Bouton @click="login">Login</Bouton>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Bouton from '@/components/Bouton.vue';

const nom = ref('');
const password = ref('');
const errorMessage = ref('');
const $router = useRouter();
const accessToken = ref('');
const accessUser = ref('');

const login = async () => {
  try {
    console.log('nom:', nom.value);
    console.log('Password:', password.value);

    const response = await fetch(`${process.env.VUE_APP_BASEURL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nom: nom.value,
        password: password.value,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Réponse du serveur:', data);

      accessToken.value = data.token.token;
      console.log('Token d\'accès:', accessToken.value);

      accessUser.value = data.user;
      console.log('user d\'accès:', accessUser.value);
      console.log('user d\'accès:', accessUser.value.is_admin);
      

      // Stocke le token dans le localStorage
      localStorage.setItem('accessToken', accessToken.value);
      localStorage.setItem('user', JSON.stringify(accessUser.value));
      
      // Utilisation de la navigation avec la référence à $router
      $router.push('/home');
    } else {
      // Affichage du message d'erreur
      errorMessage.value = 'La connexion a échoué. Vérifiez vos identifiants.';
      console.error('Erreur lors de la connexion:', response.status);
      const responseData = await response.json();
      console.error('Détails de l\'erreur:', responseData);
    }
  } catch (error) {
    // Affichage du message d'erreur
    errorMessage.value = 'Erreur lors de la connexion. Veuillez réessayer.';
    console.error('Erreur lors de la connexion:', error);
  }
};
</script>
<style scoped>
/* Style pour LoginView*/
/* Réinitialisation des styles de base pour une meilleure compatibilité mobile */

body {
  font-family: 'Arial', sans-serif;
  background-color: #E1DAFB;
}

.error-message {
  color: red;
  font-size: 14px;
  margin-top: 10px;
}

.login {
  width: 80%;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background: #E1DAFB;
  margin-top: 4rem;
  /* Ajuste la marge en haut pour rapprocher du navbar */
}

.login h1 {
  font-size: 20px;
  margin-bottom: 20px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-shadow: 2px 1px 0px #fff, 4px 3px 0px rgba(0, 0, 0, 0.15);
}

.login input {
  width: 100%;
  height: 40px;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-sizing: border-box;
  background-color: #D3CAF6;
}

.login input[type="checkbox"] {
  width: 16px;
  height: 16px;
}

.login label {
  font-size: 14px;
  margin-left: 5px;
}
</style>
