<template>
  <div class="page-container">
    <router-link to="/home">
      <button class="btn-back">Retour</button>
    </router-link>
    <div class="table-container" id="homeView">
      <h1> Stock Camion Supplémentaire</h1>
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
import { useRoute } from 'vue-router';
import swal from 'sweetalert2';
const Swal = ref(swal);

const route = useRoute();

const tournées = ref([]);
const langes_s = ref(0) || 0;
const langes_m = ref(0) || 0;
const langes_l = ref(0) || 0;
const inserts = ref(0) || 0;
const sacs_poubelles = ref(0) || 0;
const gants_de_toilette = ref(0) || 0;
const accessToken = localStorage.getItem('accessToken');
const user = localStorage.getItem('user');
const parsedUser = JSON.parse(user)



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

      if (!parsedUser.is_admin) {
        tournées.value = data;
      } else {
        console.log('rouuuuuuute :', route.params.id);
        tournées.value = data.filter((tournee) => tournee.user_id == route.params.id);//filtre la ou user_id == route.params.id

      }

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
  langes_s.value = 0;
  langes_m.value = 0;
  langes_l.value = 0;
  inserts.value = 0;
  sacs_poubelles.value = 0;
  gants_de_toilette.value = 0;

  // Iterate through tournées and update quantities
  tournées.value.forEach((tournee) => {
    langes_s.value += tournee.nombre_caisse_linge_s_supplementaire || 0;
    langes_m.value += tournee.nombre_caisse_linge_m_supplementaire || 0;
    langes_l.value += tournee.nombre_caisse_linge_l_supplementaire || 0;
    inserts.value += tournee.nombre_caisse_insert_supplementaire || 0;
    sacs_poubelles.value += tournee.nombre_caisse_sac_poubelle_supplementaire || 0;
    gants_de_toilette.value += tournee.nombre_caisse_gant_supplementaire || 0;
  });
});

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.hidden-id {
  display: none;
}

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

/* Styles pour la page-container */
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
  /* Set your desired background color */
  color: white;
  /* Set the text color for the header */
}

#tableHomeView th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}</style>
