<template>
  <div class="login">
    <h1>Login Page</h1>
    <input type="text" v-model="nom" placeholder="nom" />
    <input type="password" v-model="password" placeholder="*****" />
    <div class="remember-me">
      <input type="checkbox" id="rememberMe" v-model="rememberMe" />
      <label for="rememberMe">Se souvenir de moi</label>
    </div>
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
const rememberMe = ref(false); // Nouvelle référence pour "Se souvenir de moi"
const errorMessage = ref('');
const $router = useRouter();
const accessToken = ref('');

const login = async () => {
  console.log("urlr", process.env.VUE_APP_BASEURL)
  try {
    console.log('nom:', nom.value);
    console.log('Password:', password.value);
    console.log('Remember Me:', rememberMe.value); // Ajout de la valeur de "Se souvenir de moi"

    const response = await fetch(`/api/auth/login`, {
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

      accessToken.value = data.token;
      console.log('Token d\'accès:', accessToken.value);

      // Stocke le token dans le localStorage
      localStorage.setItem('accessToken', accessToken.value);
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
.error-message {
  color: red;
  font-size: 14px;
  margin-top: 10px;
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
  margin-top: 4rem;
  /* Ajuste la marge en haut pour rapprocher du navbar */

}

.login h1 {
  font-size: 24px;
  /* Vous pouvez ajuster la taille selon vos préférences */
  margin: auto;
  text-align: center;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 20px;
  text-shadow: 4px 3px 0px #fff, 9px 8px 0px rgba(0, 0, 0, 0.15);
}

.login input {
  width: 70%;
  height: 40px;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 15px;
  box-sizing: border-box;
  background-color: #D3CAF6;
}

h1 {
  font-size: 24px;
  /* Vous pouvez ajuster la taille selon vos préférences */
  margin: auto;
  text-align: center;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 20px;
  text-shadow: 4px 3px 0px #fff, 9px 8px 0px rgba(0, 0, 0, 0.15);
}

.remember-me {
  display: flex;
  align-items: center;
  margin-top: 10px;
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