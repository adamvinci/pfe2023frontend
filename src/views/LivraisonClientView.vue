<template>
  <div class="page-container">
    <button v-if="isadmin" @click="toggleEditMode" class="btn-modifier">
      {{ editMode ? "Annuler" : "Modifier" }}
    </button>
    <h2 class="clientName">Client1</h2>

    <div class="table-container" id="homeView">
      <div class="table-wrapper" id="homeViewDiv">
        <table id="tableHomeView">
          <thead>
            <tr>
              <th>Article</th>
              <th>Quantité Commande</th>
              <th v-if="!isadmin">Quantité Livrée</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(article, index) in articles" :key="index">
              <td>{{ article.name }}</td>
              <td>
                <span v-if="!editMode">{{ article.quantity }}</span>
                <input
                  v-else
                  v-model="livraisons[index]"
                  type="number"
                  min="0"
                  :disabled="!editMode"
                />
              </td>
              <td v-if="!isadmin && !editMode">
                <input v-model="livraisons[index]" type="number" min="0" value=10 />

              </td>
            </tr>
          </tbody>
        </table>
        <button @click="enregistrer" class="btn-enregistrer" v-if="!isadmin">Enregistrer </button>
        <button @click="enregistrer" class="btn-enregistrer" v-if="editMode">
          Enregistrer
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isadmin = ref(true); // Set this value based on your logic
const editMode = ref(false);

const articles = ref([
  { name: 'langes_s', quantity: 10 },
  { name: 'langes_m', quantity: 15 },
  { name: 'langes_l', quantity: 20 },
  { name: 'inserts', quantity: 5 },
  { name: 'sacs_poubelles', quantity: 8 },
  { name: 'gants_de_toilette', quantity: 12 },
]);

const livraisons = ref(articles.value.map((article) => article.quantity));

const toggleEditMode = () => {
  editMode.value = !editMode.value;
};

const enregistrer = () => {
  // Ajoute la logique pour enregistrer les modifications
  console.log('Modifications enregistrées :', livraisons.value);
  editMode.value = false; // Désactive le mode édition après l'enregistrement
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
