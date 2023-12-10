<template>
  <div class="page-container">
    <button v-if="isAdmin" @click="toggleEditMode" class="btn-modifier">
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
              <th v-if="!isAdmin">Quantité Livrée</th>
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
              <td v-if="!isAdmin && !editMode">
                <input v-model="livraisons[index]" type="number" min="0" value=10 />
              </td>
            </tr>
          </tbody>
        </table>
        <button @click="enregistrer" class="btn-enregistrer" v-if="!isAdmin">Enregistrer </button>
        <button @click="enregistrer" class="btn-enregistrer" v-if="editMode"> Enregistrer </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isAdmin = ref(false); // Définissez-le à false par défaut
const storedUser = localStorage.getItem('user');

if (storedUser) {
  const parsedUser = JSON.parse(storedUser);
  isAdmin.value = parsedUser.is_admin || false;
}
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