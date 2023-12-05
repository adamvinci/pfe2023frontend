<template>
  <div class="table-container">
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Client</th>
            <th>État de Livraison</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(client, index) in clients" :key="index">
            <td>{{ client }}</td>
            <td>
              <button
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
</template>

<script setup>
import Home from '../components/Home.vue'

import { ref } from 'vue';

const clients = ref(['Client1', 'Client2', 'Client3']); // Ajoute tous tes clients ici
const livraisons = ref(Array(clients.value.length).fill(false)); // Initialisation avec "Pas Livrée" pour tous les clients

const toggleLivraison = (index) => {
  livraisons.value[index] = !livraisons.value[index];
};
</script>

<style scoped>
/* Styles pour le conteneur principal */
.table-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 4rem; /* Ajuste la marge en haut pour rapprocher du navbar */
}

/* Styles pour le wrapper du tableau */
.table-wrapper {
  border: 2px solid #ddd; /* Bordure du carré */
  padding: 20px; /* Espace intérieur du carré */
  border-radius: 10px; /* Coins arrondis du carré */
}

/* Styles pour le tableau */
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

/* Styles pour les boutons */
button {
  padding: 6px 10px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
}

button:hover {
  opacity: 0.8;
}
</style>
