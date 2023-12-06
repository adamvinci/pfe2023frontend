<template>
  <div class="table-container" id="homeView">
    <div class="table-wrapper" id="homeViewDiv">
      <table id="tableHomeView">
        <thead>
          <tr>
            <th>Client</th>
            <th>État de Livraison</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(client, index) in clients" :key="index">
            <td>
              <!-- Utilisation de router-link pour rendre la cellule cliquable -->
              <router-link :to="{ path: '/' }">{{ client }}</router-link>
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
</template>

<script setup>
import { ref } from 'vue';

const clients = ref(['Client1', 'Client2', 'Client3']);
const livraisons = ref(Array(clients.value.length).fill(false));

const toggleLivraison = (index) => {
  livraisons.value[index] = !livraisons.value[index];
};
</script>
