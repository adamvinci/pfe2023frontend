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
              <th>Quantité à prendre</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(article, index) in articles" :key="index">
              <td>{{ article.name }}</td>
              <td>{{ article.quantite }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

import swal from 'sweetalert2';
const Swal = ref(swal);


const userId = 1; 
const tournées = ref([]);
const langes_s = ref(0) || 0;
const langes_m = ref(0) || 0;
const langes_l = ref(0) || 0;
const inserts = ref(0) || 0;
const sacs_poubelles = ref(0) || 0;
const gants_de_toilette = ref(0) || 0;
const accessToken = localStorage.getItem('accessToken');

const articles = ref([
  { name: 'langes_s', quantite: langes_s },
  { name: 'langes_m', quantite: langes_m },
  { name: 'langes_l', quantite: langes_l },
  { name: 'inserts', quantite: inserts },
  { name: 'sacs_poubelles', quantite: sacs_poubelles },
  { name: 'gants_de_toilette', quantite: gants_de_toilette },
]);

const fetchData = async () => {
  try {
    const response = await fetch(`${process.env.VUE_APP_BASEURL}/users/delivery`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      tournées.value = data;
    } else {
      const errorData = await response.json();
      const errorMessages = (errorData.errors || []).map(element => element.message).join('<br>');

      Swal.value.fire({
        icon: "error",
        title: "Oops...",
        html: errorMessages || errorData.message || errorData.error || 'An unknown error occurred',
      });
    }
  } catch (error) {
    console.error('Fetch error:', error);
  }
};
watch(tournées, () => {
  // Reset quantities
  langes_s.value = 0;
  langes_m.value = 0;
  langes_l.value = 0;
  inserts.value = 0;
  sacs_poubelles.value = 0;
  gants_de_toilette.value = 0;

  tournées.value.forEach((tournee) => {
    langes_s.value += tournee.nombre_caisse_linge_s_aprendre || 0;
    langes_m.value += tournee.nombre_caisse_linge_m_aprendre || 0;
    langes_l.value += tournee.nombre_caisse_linge_l_aprendre || 0;
    inserts.value += tournee.nombre_caisse_insert_a_prendre || 0;
    sacs_poubelles.value += tournee.nombre_caisse_sac_poubelle_a_prendre || 0;
    gants_de_toilette.value += tournee.nombre_caisse_gant_a_prendre || 0;
  });
});

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
  border: 1px solid;
  background: #F6BA4E;
  color: #fff;
  cursor: pointer;
  border-radius: 3px;
  border-radius: 15px;
  margin-top: 30px;
  margin-left: 15px;
}

.page-container {
  position: relative;
  color: white;
}

#tableHomeView {
  width: 100%;
  border-collapse: collapse;
}

#tableHomeView thead {
  background-color: #00549a;
  color: white;
}

#tableHomeView th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}</style>
