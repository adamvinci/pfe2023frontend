<template>
  <div class="addCommand">
    <form @submit.prevent="submitCommand">
      <h1>Ajouter Commande</h1>
      <div class="form-group">
        <label for="langes">Langes - Petit -</label>
        <input type="number" v-model="nombreCaisseLingeS" id="langesS" />
      </div>
      <div class="form-group">
        <label for="langes">Langes - Moyen -</label>
        <input type="number" v-model="nombreCaisseLingeM" id="langesM" />
      </div>
      <div class="form-group">
        <label for="langes">Langes - Grand -</label>
        <input type="number" v-model="nombreCaisseLingeL" id="langesL" />
      </div>
      <div class="form-group">
        <label for="inserts">Inserts</label>
        <input type="number" v-model="nombreCaisseInsert" id="inserts" />
      </div>
      <div class="form-group">
        <label for="sacs">Sacs</label>
        <input type="number" v-model="nombreCaisseSacPoubelle" id="sacs" />
      </div>
      <div class="form-group">
        <label for="gants">Gants</label>
        <input type="number" v-model="nombreCaisseGant" id="gants" />
      </div>
      <Bouton @click="submitCommand">Ajouter</Bouton>
    </form>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Bouton from '@/components/Bouton.vue';
import swal from 'sweetalert2';
const Swal = ref(swal);
const $router = useRouter();
const { params } = useRoute(); // Utilisez useRoute pour accéder aux paramètres de l'URL
const clientId = ref(params.clientId); // Accédez aux paramètres de l'URL

const nombreCaisseLingeS = ref(0);
const nombreCaisseLingeM = ref(0);
const nombreCaisseLingeL = ref(0);

const nombreCaisseInsert = ref(0);
const nombreCaisseSacPoubelle = ref(0);
const nombreCaisseGant = ref(0);

const accessToken = localStorage.getItem('accessToken');

const submitCommand = async () => {
  try {
    if (clientId.value === null) {
      console.error('Erreur : clientId est null');
      return;
    }

    const commandData = {
      clientId: clientId.value,
      nombreCaisseLingeS: nombreCaisseLingeS.value,
      nombreCaisseLingeM: nombreCaisseLingeM.value,
      nombreCaisseLingeL: nombreCaisseLingeL.value,

      nombreCaisseInsert: nombreCaisseInsert.value,
      nombreCaisseSacPoubelle: nombreCaisseSacPoubelle.value,
      nombreCaisseGant: nombreCaisseGant.value,
    };

    const response = await fetch(`${process.env.VUE_APP_BASEURL}/creches/${clientId.value}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(commandData),
    });

    if (response.ok) {
      Swal.value.fire({
        icon: "success",
        title: "Success",
        html: "Nursery Command Added successfully",
        timer: 1500,
        didClose: () => {
          $router.push('/home');
        }
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
    console.error('Erreur lors de l\'ajout de la commande:', error);
  }
};
</script>
  
  
  
<style scoped>
.addCommand {
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
  color: white;
}

.addCommand h1 {
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

form {
  width: 100%;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input,
select {
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
</style>
  