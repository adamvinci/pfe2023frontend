<template>
  <div class="page-container">
    <!-- Bouton en haut à gauche -->
    <router-link to="/stockcamion">
      <button class="btn-StockCamion">Stock camion</button>
    </router-link>

    <div class="table-container" id="homeView">
      <div class="table-wrapper" id="homeViewDiv">
        <table id="tableHomeView">
          <thead>
            <tr>
              <!-- Aucun libellé pour la colonne ID -->
              <th>Client</th>
              <th>État de Livraison</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(client, index) in clients" :key="index">
              <td class="hidden-id">{{ client.id }}</td>
              <td>
                <!-- Utilisation de router-link pour rendre la cellule cliquable -->
                <router-link :to="{ path: '/livraisonclient' }">{{ client.name }}</router-link>
              </td>
              <td>
                <button id="livraisonCheck"
                  @click="toggleLivraison(index)"
                  :style="{ color: livraisons[index] ? 'green' : 'red' }"
                >
                  {{ livraisons[index] ? 'Livrée' : 'Pas Livrée' }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const clients = ref([
  { id: 1, name: 'Client1' },
  { id: 2, name: 'Client2' },
  { id: 3, name: 'Client3' },
]);
const livraisons = ref(Array(clients.value.length).fill(false));

const toggleLivraison = (index) => {
  livraisons.value[index] = !livraisons.value[index];
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

</style>
