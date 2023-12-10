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
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const accessToken = localStorage.getItem('accessToken');

const crecheDetails = ref({});
console.log('blblblbllblb :', crecheDetails);

const fetchData = async () => {
  try {
    const response = await fetch(`${process.env.VUE_APP_BASEURL}/creches/${route.params.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      crecheDetails.value = data;
      console.log('blblblbllblb :', crecheDetails);
    } else {
      console.error('Erreur lors du chargement des détails de la crèche:', response.status);
    }
  } catch (error) {
    console.error('Erreur fetch:', error);
  }
};

const enregistrer = () => {
  // Ajoute la logique pour enregistrer les modifications
  console.log('Modifications enregistrées :', livraisons.value);
  editMode.value = false; // Désactive le mode édition après l'enregistrement
};
onMounted(() => {
  fetchData();
});
</script>
