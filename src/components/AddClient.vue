<template>
  <div class="addClient">
    <h1> Ajouter Client </h1>
    Nom <input type="text" v-model="nom" />
    Ville <input type="text" v-model="ville" />
    Adresse <input type="text" v-model="adresse" />
    Téléphone <input type="text" placeholder="optional" v-model="gsm" />
    <button @click="ajouterClient">Ajouter</button>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import swal from 'sweetalert2';
const Swal = ref(swal);
const $router = useRouter();


const nom = ref('');
const ville = ref('');
const adresse = ref('');
const gsm = ref('');
const accessToken = localStorage.getItem('accessToken');

const crecheId = ref(null);


const ajouterClient = async () => {
  try {
    const clientData = {
      nom: nom.value,
      ville: ville.value,
      adresse: adresse.value,
      gsm: gsm.value,
    };

    const response = await fetch(`${process.env.VUE_APP_BASEURL}/creches`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(clientData),
    });

    if (response.ok) {
      const responseData = await response.json();
      Swal.value.fire({
        icon: "success",
        title: "Success",
        html: "Nursery Added successfully",
        timer: 1500,
      });
      crecheId.value = responseData.id; // Stockez l'ID de la crèche associée au client
      $router.push(`/addCommand/${crecheId.value}`); // Utilisez l'ID dans l'URL
    } else {
      const responseData = await response.json();
      const errorMessages = (responseData.errors || []).map(element => element.message).join('<br>');

      Swal.value.fire({
        icon: "error",
        title: "Oops...",
        html: errorMessages || responseData.message || responseData.error || 'An unknown  error occurred',
      });
    }
  } catch (error) {
    console.error('Erreur lors de l\'ajout du client:', error);
  }
};
</script>

<style scoped>
/* Styles pour le composant AddClient */
.addClient {
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
  margin-top: 2rem;
  color: white;
}

.addClient input {
  width: 100%;
  height: 40px;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 15px;
  box-sizing: border-box;
  background-color: white;
  text-align: center;
}

.addClient h1 {
  font-size: 20px;
  margin: auto;
  text-align: center;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 10px;
  background-color: #F6BA4E;
  /* Nouvelle couleur de fond */
  padding: 10px;
  border-radius: 10px;
}

button {
  width: 50%;
  height: 40px;
  border: 1px solid black;
  background: #F6BA4E;
  color: #fff;
  cursor: pointer;
  border-radius: 3px;
  border-radius: 15px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: auto;
  margin-right: auto;
}

@media only screen and (max-width: 600px) {
  .addClient input {
    padding: 8px;
  }

  .addClient h1 {
    font-size: 18px;
    margin-bottom: 8px;
  }
}
</style>