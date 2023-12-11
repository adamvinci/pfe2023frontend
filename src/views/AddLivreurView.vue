<template>
  <div class="addLivreur">
    <h1> Ajouter un Livreur </h1>
    Nom<input type="text" v-model="nom" placeholder="Michel" />
    Mot de passe<input type="password" v-model="password" placeholder="*****" />
    <Bouton @click="ajouterLivreur"> Ajouter </Bouton>
  </div>
</template>

<script setup>
import Bouton from '@/components/Bouton.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import swal from 'sweetalert2';
const Swal = ref(swal);
const nom = ref('');
const password = ref('');
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
      Swal.value.fire({
        icon: "success",
        title: "Success",
        html: "User Added successfully",
        timer: 1500,
      });

    } else {
      const errorData = await response.json();
      const errorMessages = (errorData.errors || []).map(element => element.message).join('<br>');

      Swal.value.fire({
        icon: "error",
        title: "Oops...",
        html: errorMessages || errorData.message || errorData.error || 'An unknown error occurred',
      });
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
  margin-top: 4rem;
  /* Ajuste la marge en haut pour rapprocher du navbar */
}

.addLivreur input {
  width: 70%;
  height: 40px;
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 15px;
  box-sizing: border-box;
  background-color: #D3CAF6;
  text-align: center;
}

.addLivreur h1 {
  font-size: 24px;
  margin: auto;
  text-align: center;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 20px;
  text-shadow: 4px 3px 0px #fff, 9px 8px 0px rgba(0, 0, 0, 0.15);
}

.error-message {
  color: red;
  font-size: 14px;
  margin-top: 10px;
}

.success-message {
  color: green;
  font-size: 14px;
  margin-top: 10px;
}
</style>
