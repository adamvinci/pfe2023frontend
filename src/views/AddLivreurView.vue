<template>
  <div class="addLivreur">
    <h1> Ajouter Livreur </h1>
    Nom<input type="text" v-model="nom" placeholder="Michel" />
    Mot de passe<input type="password" v-model="password" placeholder="*****" />
    <button @click="ajouterLivreur"> Ajouter </button>
  </div>
</template>

<script setup>
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
.addLivreur {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  margin: auto;
  text-align: center;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background: #213979;
  margin-top: 4rem;
  color:white;
}

.addLivreur input {
  width: 70%;
  height: 40px;
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 15px;
  box-sizing: border-box;
  background-color: white;
  text-align: center;
}

.addLivreur h1 {
  font-size: 20px;
  margin: auto;
  text-align: center;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 10px;
  background-color: #F6BA4E; /* Nouvelle couleur de fond */
  padding: 10px;
  border-radius: 10px;
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

button {
  width: 50%;
  height: 40px;
  border: 1px solid black;
  background: #F6BA4E ;
  color: #fff;
  cursor: pointer;
  border-radius: 3px;
  border-radius: 15px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: auto;
  margin-right: auto;
}
</style>
