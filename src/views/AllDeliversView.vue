<template>
    <div class="page-container">
      <div class="table-container" id="homeView">
        <div class="table-wrapper" id="homeViewDiv">
          <table id="tableHomeView">
            <thead>
              <tr>
                <!-- Ajoute la colonne Hidden ID -->
                <th class="hidden-id">Hidden ID</th>
                <th>Livreur</th>
                
              </tr>
            </thead>
            <tbody>
              <tr v-for="(livraison, index) in livraisons" :key="index">
                <!-- Utilise la classe hidden-id pour masquer l'ID -->
                <td class="hidden-id">{{ livraison.hiddenId }}</td>
                <td>{{ livraison.livreur }}</td>
              </tr>
            </tbody>
          </table>
  
          <!-- Bouton Enregistrer avec la classe btn-enregistrer -->
         
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const livraisons = ref([
    { hiddenId: 1, livreur: 'Livreur1'  },
    { hiddenId: 2, livreur: 'Livreur2' },
    { hiddenId: 3, livreur: 'Livreur3' },
  ]);
  
 
  </script>
  
  <style scoped>
  /* Styles pour masquer la colonne Hidden ID */
  .hidden-id {
    display: none;
  }
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
  
  /* Styles pour le bouton Enregistrer */
 
  </style>
  