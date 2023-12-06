<template>
    <div class="page-container">
      <!-- Bouton en haut à gauche -->
      
        <h2 class="clientName">Client1</h2>
    
  
      <div class="table-container" id="homeView">
        <div class="table-wrapper" id="homeViewDiv">
          <table id="tableHomeView">
            <thead>
              <tr>
                <th>Article</th>
                <th>Quantité supplémentaire</th>
                <th>Quantité Livrée</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(article, index) in articles" :key="index">
                <td>{{ article.name }}</td>
                <td>10</td>
                <td>
                  <!-- Utilisation de v-model pour lier la valeur à une variable -->
                  <input v-model="livraisons[index]" type="number" min="0" value=10 />
                </td>
              </tr>
            </tbody>
          </table>
  
          <!-- Bouton Enregistrer avec la classe btn-enregistrer -->
          <button @click="enregistrer" class="btn-enregistrer">Enregistrer</button>
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
  
  // Initialisation de la liste des livraisons avec la quantité par défaut
  const livraisons = ref(Array(articles.value.length).fill(0));
  
  const enregistrer = () => {
    // Ajoute la logique pour enregistrer les modifications
    console.log('Modifications enregistrées :', livraisons.value);
  };
  </script>
  
  <style scoped>
  /* Styles pour masquer la colonne ID */
  .hidden-id {
    display: none;
  }
  
  /* Styles pour la page-container */
  .page-container {
    position: relative;
  }
  
  /* Styles pour le bouton Enregistrer */
  .btn-enregistrer {
    width: 20%;
    height: 40px;
    border: 1px solid #C4B4FD;
    background: #B09CFB;
    color: #fff;
    cursor: pointer;
    border-radius: 3px;
    border-radius: 15px;
    margin-top: 30px;
    margin-left: 50%;
  }
  
  .btn-enregistrer:hover {
    background: #735DC6;
  }
  </style>
  