<template>
  <div class="page-container">
    <button v-if="isAdmin" @click="toggleEditMode" class="btn-modifier">
      {{ editMode ? "Annuler" : "Modifier" }}
    </button>
    <router-link to="/home">
      <button class="btn-back">Retour</button>
    </router-link>
    <p v-if="isAdmin" class="clientName" contenteditable @input="updateNom">
      {{ crecheDetails.nom }}
    </p>
    <p v-else class="clientName">
      {{ crecheDetails.nom }}
    </p>
    <p v-if="isAdmin" class="clientOther" contenteditable @input="updateAdresse">
      {{ crecheDetails.adresse }}
    </p>
    <p v-else class="clientOther">
      {{ crecheDetails.adresse }}
    </p>
    <p v-if="isAdmin" class="clientOther" contenteditable @input="updateVille">
      {{ crecheDetails.ville }}
    </p>
    <p v-else class="clientOther">
      {{ crecheDetails.ville }}
    </p>
    <p v-if="isAdmin" class="clientOther" contenteditable @input="updateGsm">
      {{ crecheDetails.gsm > 0 ? crecheDetails.gsm :
        'gsm' }}
    </p>
    <p v-else class="clientOther">
      {{ crecheDetails.gsm > 0 ? crecheDetails.gsm :
        'gsm' }}
    </p>



    <div class="table-container" id="homeView">
      <div class="table-wrapper" id="homeViewDiv">
        <table id="tableHomeView">
          <thead>
            <tr>
              <th>Article</th>
              <th>Quantité Commande</th>
              <th v-if="!isAdmin">Quantité Livrée </th>

            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Nombre caisse lange S</td>
              <td>
                <input v-if="editMode" v-model="crecheDetails.nombre_caisse_linge_s" type="number" min="0" />
                <span v-else>{{ crecheDetails.nombre_caisse_linge_s }}</span>
              </td>
              <td>
                <input v-if="!isAdmin" v-model="nombreCaisseLingeS" type="number" min="0" />

              </td>
            </tr>

            <tr>
              <td>Nombre caisse lange M</td>
              <td>
                <input v-if="editMode" v-model="crecheDetails.nombre_caisse_linge_m" type="number" min="0" />
                <span v-else>{{ crecheDetails.nombre_caisse_linge_m }}</span>
              </td>
              <td>
                <input v-if="!isAdmin" v-model="nombreCaisseLingeM" type="number" min="0" />

              </td>
            </tr>

            <tr>
              <td>Nombre caisse lange L</td>
              <td>
                <input v-if="editMode" v-model="crecheDetails.nombre_caisse_linge_l" type="number" min="0" />
                <span v-else>{{ crecheDetails.nombre_caisse_linge_l }}</span>
              </td>
              <td>
                <input v-if="!isAdmin" v-model="nombreCaisseLingeL" type="number" min="0" />

              </td>
            </tr>

            <tr>
              <td>Nombre caisse gants</td>
              <td>
                <input v-if="editMode" v-model="crecheDetails.nombre_caisse_gant" type="number" min="0" />
                <span v-else>{{ crecheDetails.nombre_caisse_gant }}</span>
              </td>
              <td>
                <input v-if="!isAdmin" v-model="nombreCaisseGant" type="number" min="0" />

              </td>
            </tr>

            <tr>
              <td>Nombre sac poubelle</td>
              <td>
                <input v-if="editMode" v-model="crecheDetails.nombre_caisse_sac_poubelle" type="number" min="0" />
                <span v-else>{{ crecheDetails.nombre_caisse_sac_poubelle }}</span>
              </td>
              <td>
                <input v-if="!isAdmin" v-model="nombreCaisseSacPoubelle" type="number" min="0" />

              </td>

            </tr>

            <tr>
              <td>Nombre caisses insert</td>
              <td>
                <input v-if="editMode" v-model="crecheDetails.nombre_caisse_insert" type="number" min="0" />
                <span v-else>{{ crecheDetails.nombre_caisse_insert }}</span>
              </td>
              <td>
                <input v-if="!isAdmin" v-model="nombreCaisseInsert" type="number" min="0" />

              </td>
            </tr>
          </tbody>

        </table>
        <button @click="enregistrer2" class="btn-enregistrer" v-if="!isAdmin">
          Enregistrer
        </button>
        <button @click="enregistrer" class="btn-enregistrer" v-if="isAdmin && editMode">
          Enregistrer
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import swal from 'sweetalert2';
const Swal = ref(swal);

const route = useRoute();
const accessToken = localStorage.getItem('accessToken');
const isAdmin = ref(false);
const storedUser = localStorage.getItem('user');

if (storedUser) {
  const parsedUser = JSON.parse(storedUser);
  isAdmin.value = parsedUser.is_admin || false;
}

const editMode = ref(false);

const crecheDetails = ref({});


const nombreCaisseLingeS = ref(0);
const nombreCaisseLingeM = ref(0);
const nombreCaisseLingeL = ref(0);
const nombreCaisseInsert = ref(0);
const nombreCaisseSacPoubelle = ref(0);
const nombreCaisseGant = ref(0);

const updateNom = (event) => {
  crecheDetails.value.nom = event.target.textContent;
};
const updateAdresse = (event) => {
  crecheDetails.value.adresse = event.target.textContent;
};
const updateGsm = (event) => {
  crecheDetails.value.gsm = event.target.textContent;
};
const updateVille = (event) => {
  crecheDetails.value.ville = event.target.textContent;
};
const fetchData = async () => {
  try {
    const response = await fetch(`${process.env.VUE_APP_BASEURL}/creches/${route.params.id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      const data = await response.json();

      if (data && data.creche) {
        crecheDetails.value = data.creche;

        crecheDetails.value.selected = false;
        crecheDetails.value.quantiteLivre = 0;
        nombreCaisseLingeS.value = crecheDetails.value.nombre_caisse_linge_s;
        nombreCaisseLingeM.value = crecheDetails.value.nombre_caisse_linge_m;
        nombreCaisseLingeL.value = crecheDetails.value.nombre_caisse_linge_l;
        nombreCaisseInsert.value = crecheDetails.value.nombre_caisse_insert;
        nombreCaisseSacPoubelle.value = crecheDetails.value.nombre_caisse_sac_poubelle;
        nombreCaisseGant.value = crecheDetails.value.nombre_caisse_gant;

      } else {
        console.error('Invalid data structure:', data);
      }
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
    console.error('Erreur lors de la requête POST:', error);
    console.log('Response Text:', await error.text());
  }
};



const toggleEditMode = () => {
  editMode.value = !editMode.value;
};
onMounted(() => {
  fetchData();
});
const enregistrer = async () => {

  const requestBody = {
    nombreCaisseLingeS: crecheDetails.value.nombre_caisse_linge_s,
    nombreCaisseLingeM: crecheDetails.value.nombre_caisse_linge_m,
    nombreCaisseLingeL: crecheDetails.value.nombre_caisse_linge_l,
    nombreCaisseInsert: crecheDetails.value.nombre_caisse_insert,
    nombreCaisseSacPoubelle: crecheDetails.value.nombre_caisse_sac_poubelle,
    nombreCaisseGant: crecheDetails.value.nombre_caisse_gant,
    nom: crecheDetails.value.nom,
    adresse: crecheDetails.value.adresse,
    ville: crecheDetails.value.ville
  };

  if (crecheDetails.value.gsm !== " ") {
    requestBody.gsm = crecheDetails.value.gsm;
  }
  try {
    const response = await fetch(`${process.env.VUE_APP_BASEURL}/creches/${route.params.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (response.ok) {
      Swal.value.fire({
        icon: "success",
        title: "Success",
        html: "Nursery updated successfully",
        timer: 1500,
        didClose: () => {
          window.location.reload();
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
    console.error('Erreur lors de la requête POST:', error);
    console.log('Response Text:', await error.text());
  }

  editMode.value = false; 
};


const enregistrer2 = async () => {

  const response = await fetch(`${process.env.VUE_APP_BASEURL}/tournees/updateState`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      nurseryId: crecheDetails.value.id,
      deliveryId: crecheDetails.value.tournee_id,
      nombreCaisseGantLivre: nombreCaisseGant.value,
      nombreCaisseSacPoubelleLivre: nombreCaisseSacPoubelle.value,
      nombreCaisseInsertLivre: nombreCaisseInsert.value,
      nombreCaisseLingeLLivre: nombreCaisseLingeL.value,
      nombreCaisseLingeMLivre: nombreCaisseLingeM.value,
      nombreCaisseLingeSLivre: nombreCaisseLingeS.value,
    }),
  });

  if (response.ok) {
    Swal.value.fire({
      icon: "success",
      title: "Success",
      html: "Nursery Added successfully",
      timer: 1500,
    });

  } else {
    const errorData = await response.json();
    const errorMessages2 = (errorData.errors || []).map(element => element.message).join('<br>');

    Swal.value.fire({
      icon: "error",
      title: "Oops...",
      html: errorMessages2 || errorData.message || errorData.error || 'An unknown error occurred',
    });
  }
}
</script>
  
<style scoped>
/* Styles pour masquer la colonne Hidden ID */
.hidden-id {
  display: none;
}

/* Le tableau de base */
.table-container {
  overflow: auto;
  margin-bottom: 20px;
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


/* Styles pour le bouton Modifier et Enregistrer */
button {
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
}

.btn-modifier,
.btn-enregistrer,
.btn-back {
  background-color: #4CAF50;
  color: white;
  font-size: 16px;
}

button:hover {
  opacity: 0.8;
}

#tableHomeView thead {
  background-color: #00549a;
  color: white;
}

.clientName {
  font-size: 20px;
  margin: auto;
  text-align: center;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 10px;
  background-color: #F6BA4E;
  padding: 10px;
  border-radius: 10px;
}

.clientOther {
  font-size: 15px;
  margin: auto;
  text-align: center;
  letter-spacing: 2px;
  margin-bottom: 10px;
  background-color: #F6BA4E;
  padding: 10px;
  border-radius: 10px;
}

input {
  width: 80px;
}
</style>