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
</style>
