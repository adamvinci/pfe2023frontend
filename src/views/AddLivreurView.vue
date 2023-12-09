<template>
  <div class="addLivreur">
    <h1> Ajouter un Livreur </h1>
    Nom<input type="text" v-model="nom" placeholder="Michel" />
    Mot de passe<input type="password" v-model="password" placeholder="*****" />
    <button @click="ajouterLivreur"> Ajouter </button>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
  </div>
</template>

<script setup>
import Bouton from '@/components/Bouton.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const nom = ref('');
const password = ref('');
const errorMessage = ref('');
const successMessage = ref('');
const $router = useRouter();
const accessToken = localStorage.getItem('accessToken');

const ajouterLivreur = async () => {
  try {
    const response = await fetch(`${process.env.VUE_APP_BASEURL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        nom: nom.value,
        password: password.value,
      }),
    });

    if (response.ok) {
      successMessage.value = 'Livreur ajouté avec succès!';
      errorMessage.value = '';
    } else {
      const errors = await response.json();
      errorMessage.value = errors;
      // errorMessage.value = 'Erreur lors de l\'ajout du livreur. Veuillez réessayer.';
      successMessage.value = '';
    }
  } catch (error) {
    errorMessage.value = 'Erreur lors de l\'ajout du livreur. Veuillez réessayer.';
    successMessage.value = '';
    console.error('Erreur lors de l\'ajout du livreur:', error);
  }
};
</script>

<style scoped>
/* AddLivreurView styles */
.addLivreur {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  /* Ajustement de la largeur pour les smartphones */
  margin: auto;
  text-align: center;
  padding: 20px;
  /* Ajustement de l'espace intérieur pour les smartphones */
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background: #E1DAFB;
  margin-top: 2rem;
  /* Ajuste la marge en haut pour rapprocher du navbar */
}

.addLivreur input {
  width: 100%;
  /* Remplir la largeur pour les smartphones */
  height: 40px;
  padding: 10px;
  /* Ajustement de la taille du padding pour les smartphones */
  margin-bottom: 10px;
  /* Espace entre les champs pour les smartphones */
  border: 1px solid #ddd;
  border-radius: 15px;
  box-sizing: border-box;
  background-color: #D3CAF6;
  text-align: center;
}

.addLivreur h1 {
  font-size: 20px;
  /* Ajustement de la taille de la police pour les smartphones */
  margin: auto;
  text-align: center;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 10px;
  /* Réduction de la marge en bas pour les smartphones */
  text-shadow: 4px 3px 0px #fff, 9px 8px 0px rgba(0, 0, 0, 0.15);
}

.error-message,
.success-message {
  font-size: 12px;
  /* Ajustement de la taille de la police pour les smartphones */
  margin-top: 10px;
}
</style>
