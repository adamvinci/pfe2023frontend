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
              <td>{{ getQuantitySupplementaire(article.name) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const articles = ref([
  { name: 'langes_s' },
  { name: 'langes_m' },
  { name: 'langes_l' },
  { name: 'inserts' },
  { name: 'sacs_poubelles' },
  { name: 'gants_de_toilette' },
]);

const userId = 1; // replace with your actual user ID
const tournées = ref([]);

const getQuantitySupplementaire = (articleName) => {
  const tournée = tournées.value.find(t => t.userId === userId);
  return tournée ? tournée[articleName] : 0;
};

const fetchData = async () => {
  try {
    const response = await fetch(`${process.env.VUE_APP_BASEURL}/tournees`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Add your authorization header if needed
      },
    });

    if (response.ok) {
      const data = await response.json();
      tournées.value = data;
    } else {
      console.error('Error fetching tournées data:', response.status);
    }
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

onMounted(() => {
  fetchData();
});
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
