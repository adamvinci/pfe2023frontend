<template>
  <div class="page-container">
    <button v-if="isAdmin" @click="toggleEditMode" class="btn-modifier">
      {{ editMode ? "Annuler" : "Modifier" }}
    </button>
    <router-link to="/home">
        <button class="btn-back">Retour</button>
      </router-link>
    <h2 class="clientName">{{ crecheDetails.nom }}</h2>

    <div class="table-container" id="homeView">
      <div class="table-wrapper" id="homeViewDiv">
        <table id="tableHomeView">
          <thead>
            <tr>
              <th>Article</th>
              <th>Quantité Commande</th>
              <th v-if="!isAdmin">Quantité Livrée</th>
             
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Nombre caisse lange S</td>
              <td>
                <input
                  v-if="editMode"
                  v-model="crecheDetails.nombre_caisse_linge_s"
                  type="number"
                  min="0"
                />
                <span v-else>{{ crecheDetails.nombre_caisse_linge_s }}</span>
              </td>
              <td>
                <input
                  v-if="!isAdmin"
                  v-model="crecheDetails.nombre_caisse_linge_s"
                  type="number"
                  min="0"
                />
                <span v-else>{{ crecheDetails.nombre_caisse_linge_s }}</span>
              </td>
            </tr>

            <tr>
              <td>Nombre caisse lange M</td>
              <td>
                <input
                  v-if="editMode"
                  v-model="crecheDetails.nombre_caisse_linge_m"
                  type="number"
                  min="0"
                />
                <span v-else>{{ crecheDetails.nombre_caisse_linge_m }}</span>
              </td>
              <td>
                <input
                  v-if="!isAdmin"
                  v-model="crecheDetails.nombre_caisse_linge_m"
                  type="number"
                  min="0"
                />
                <span v-else>{{ crecheDetails.nombre_caisse_linge_m }}</span>
              </td>
            </tr>

            <tr>
              <td>Nombre caisse lange L</td>
              <td>
                <input
                  v-if="editMode"
                  v-model="crecheDetails.nombre_caisse_linge_l"
                  type="number"
                  min="0"
                />
                <span v-else>{{ crecheDetails.nombre_caisse_linge_l }}</span>
              </td>
              <td>
                <input
                  v-if="!isAdmin"
                  v-model="crecheDetails.nombre_caisse_linge_l"
                  type="number"
                  min="0"
                />
                <span v-else>{{ crecheDetails.nombre_caisse_linge_l }}</span>
              </td>
            </tr>

            <tr>
              <td>Nombre caisse gants</td>
              <td>
                <input
                  v-if="editMode"
                  v-model="crecheDetails.nombre_caisse_gant"
                  type="number"
                  min="0"
                />
                <span v-else>{{ crecheDetails.nombre_caisse_gant }}</span>
              </td>
              <td>
                <input
                  v-if="!isAdmin"
                  v-model="crecheDetails.nombre_caisse_gant"
                  type="number"
                  min="0"
                />
                <span v-else>{{ crecheDetails.nombre_caisse_gant }}</span>
              </td>
            </tr>

            <tr>
              <td>Nombre sac poubelle</td>
              <td>
                <input
                  v-if="editMode"
                  v-model="crecheDetails.nombre_caisse_sac_poubelle"
                  type="number"
                  min="0"
                />
                <span v-else>{{ crecheDetails.nombre_caisse_sac_poubelle }}</span>
              </td>
              <td>
                <input
                  v-if="!isAdmin"
                  v-model="crecheDetails.nombre_caisse_sac_poubelle"
                  type="number"
                  min="0"
                />
                <span v-else>{{ crecheDetails.nombre_caisse_sac_poubelle }}</span>
              </td>
              
            </tr>

            <tr>
              <td>Nombre caisses insert</td>
              <td>
                <input
                  v-if="editMode"
                  v-model="crecheDetails.nombre_caisse_insert"
                  type="number"
                  min="0"
                />
                <span v-else>{{ crecheDetails.nombre_caisse_insert }}</span>
              </td>
              <td>
                <input
                  v-if="!isAdmin"
                  v-model="crecheDetails.nombre_caisse_insert"
                  type="number"
                  min="0"
                />
                <span v-else>{{ crecheDetails.nombre_caisse_insert }}</span>
              </td>
            </tr>
          </tbody>
          <button @click="enregistrer" class="btn-enregistrer" v-if="!isAdmin">
          Enregistrer
        </button>
        </table>
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
const livraisons = ref({})

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

        // Assuming crecheDetails.value has the necessary properties
        crecheDetails.value.selected = false;
        crecheDetails.value.quantiteLivre = 0;
        console.log(crecheDetails.value);

      } else {
        console.error('Invalid data structure:', data);
      }
    } else {
      console.error('Error loading creche details:', response.status);
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
  try {
    const response = await fetch(`${process.env.VUE_APP_BASEURL}/creches/${route.params.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        // Add the properties you want to update on the backend
        nombre_caisse_linge_s: crecheDetails.value.nombre_caisse_linge_s,
        nombre_caisse_linge_m: crecheDetails.value.nombre_caisse_linge_m,
        nombre_caisse_linge_l: crecheDetails.value.nombre_caisse_linge_l,
        nombre_caisse_gant: crecheDetails.value.nombre_caisse_gant,
        nombre_caisse_sac_poubelle: crecheDetails.value.nombre_caisse_sac_poubelle,
        nombre_caisse_insert: crecheDetails.value.nombre_caisse_insert,
      }),
    });

    if (response.ok) {
      console.log('Modifications enregistrées avec succès');
    } else {
      console.error('Erreur lors de l\'enregistrement des modifications:', response.status);
    }
  } catch (error) {
  console.error('Erreur lors de la requête POST:', error);
  console.log('Response Text:', await error.text());
}

  editMode.value = false; // Disable edit mode after saving
};
</script>