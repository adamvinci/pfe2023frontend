<template>
  <div class="page-container">
    <!-- Bouton en haut à gauche -->
    <router-link to="/stockcamion">
    <button v-if="!isadmin" class="btn-StockCamion">Stock camion</button>
    </router-link>

    <div class="date-title">
      <h1>{{ formattedDate }}</h1>
      <h2>Aujourd'hui</h2>
    </div>
 
    <div class="table-container" id="homeView">
       <!-- Moteur de recherche -->
        <div v-if="isadmin" class="container">
          <input type="text" maxlength="12" placeholder="Rechercher" class="searchbar" />
          <img src="https://images-na.ssl-images-amazon.com/images/I/41gYkruZM2L.png" alt="search icon" class="button" />
        </div>
      <div class="table-wrapper" id="homeViewDiv">
        
        <table id="tableHomeView">
          <thead>
            <tr>
              <!-- Aucun libellé pour la colonne ID -->
              <th>Client</th>
              <th>État de Livraison</th>
              <th v-if="isadmin">Livreur</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(client, index) in clients" :key="index">
              <td class="hidden-id">{{ client.id }}</td>
              <td>
                  <!-- Utilisation de router-link pour rendre la cellule cliquable -->
                  <router-link :to="{ path: '/livraisonclient' }">
                    <button>{{ client.name }}</button>
                  </router-link>
                </td>
              <td>
                <button id="livraisonCheck"
                  @click="toggleLivraison(index)"
                  :style="{ color: livraisons[index] ? 'green' : 'red' }"
                >
                  {{ livraisons[index] ? 'Livrée' : 'Pas Livrée' }}
                </button>
              </td>
                <!-- Ajout de la colonne Livreur conditionnellement -->
                <td v-if="isadmin">{{ client.livreur }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const clients = ref([
{ id: 1, name: 'Client1', livreur: 'Livreur1' },
  { id: 2, name: 'Client2', livreur: 'Livreur2' },
  { id: 3, name: 'Client3', livreur: 'Livreur3' },
]);
const livraisons = ref(Array(clients.value.length).fill(false));
const isadmin = ref(false); // Set this value based on your logic

const toggleLivraison = (index) => {
  livraisons.value[index] = !livraisons.value[index];
};

const formattedDate = ref('');

onMounted(() => {
  updateFormattedDate();
  setInterval(updateFormattedDate, 1000); // Mettez à jour la date chaque seconde
});

const updateFormattedDate = () => {
  const now = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  formattedDate.value = now.toLocaleDateString('fr-FR', options);
};

</script>

<style scoped>
/* Styles pour masquer la colonne ID */
.hidden-id {
  display: none;
}

/* Styles pour le bouton de retour */
.btn-StockCamion {
  width: 20%;
    height: 40px;
    border: 1px solid #C4B4FD;
    background: #B09CFB;
    color: #fff;
    cursor: pointer;
    border-radius: 3px;
    border-radius: 15px;
    margin-top: 30px;
    margin-left: 15px;
}

.btn-StockCamion:hover {
  background: #735DC6;
}

/* Styles pour la page-container */
.page-container {
  position: relative;
}
/* Style pour HomeView*/
#homeView {
  overflow: auto;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column; /* Correction ici */
    align-items: center;
    width: 40%;
    margin: auto;
    text-align: center;
    padding: 50px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background: #E1DAFB;
    margin-top: 4rem; /* Ajuste la marge en haut pour rapprocher du navbar */
}

/* Styles pour le wrapper du tableau */
#homeViewDiv {
  border: 2px solid #ddd; /* Bordure du carré */
  padding: 20px; /* Espace intérieur du carré */
  border-radius: 10px; /* Coins arrondis du carré */
}

/* Styles pour le tableau */
#tableHomeView {
  width: 100%;
  border-collapse: collapse;
}

#tableHomeView th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

#tableHomeView th {
  background-color: #f2f2f2;
}

/* Styles pour les boutons */
#livraisonCheck {
  padding: 6px 10px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
}

#livraisonCheck:hover {
  opacity: 0.8;
}

/* Styles pour le titre de la date */
.date-title {
  text-align: center;
  margin-bottom: 20px;
}

.date-title h2 {
  font-size: 20px;
  margin: 0;
}

.date-title p {
  margin: 0;
}

/* Styles pour la barre de recherche */   .container {
  width: 10rem; /* Adjust the width */
  height: 3rem; /* Adjust the height */
  margin: 0 1rem;
  position: relative;
}

.searchbar {
  font-size: 1.4rem; /* Adjust the font size */
  width: 10rem;
  height: 2.5rem; /* Adjust the height */
  border: none;
  outline: none;
  border-radius: 4rem; /* Adjust the border-radius */
  padding: 1rem; /* Adjust the padding */
  transition: all 0.1s;
  transition-delay: 0.1s;
}


.button {
  height: 1.2rem; /* Adjust the height of the icon */
  position: absolute;
  top: 0.7rem; /* Adjust the top position */
  right: 0.3rem; /* Adjust the right position */
  transition: all 0.1s;
  transition-delay: 0.1s;
}

.searchbar::placeholder {
  opacity: 0.3;
}

</style>
