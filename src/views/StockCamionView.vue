<template>
    <div class="page-container">
      <!-- Bouton en haut à gauche -->
      <router-link to="/home">
        <button class="btn-back">Retour</button>
      </router-link>
      <div class="table-container" id="homeView">
        <h1> Stock Total Camion</h1>
        <div class="table-wrapper" id="homeViewDiv">
          <table id="tableHomeView">
            <thead>
              <tr>
                <th>Article</th>
                <th>Quantité supplémentaire</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(article, index) in articles" :key="index">
                <td>{{ article.name }}</td>
                <td>10</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const articles = ref([
    { name: 'langes_s' },
    { name: 'langes_m' },
    { name: 'langes_l' },
    { name: 'inserts' },
    { name: 'sacs_poubelles' },
    { name: 'gants_de_toilette' },
  ]);
  </script>
  
  <style scoped>
  /* Styles pour masquer la colonne ID */
  .hidden-id {
    display: none;
  }
  
  /* Styles pour le bouton de retour */
  .btn-back {
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
  
  .btn-back:hover {
    background: #735DC6;
  }
  
  /* Styles pour la page-container */
  .page-container {
    position: relative;
  }
  </style>
  