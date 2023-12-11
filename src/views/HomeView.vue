<template>
  <div class="page-container">

<ButtonStockCamion></ButtonStockCamion>
    <div class="table-container" id="homeView">

      <div class="table-wrapper" id="homeViewDiv">
        <table id="tableHomeView">
          <thead>
            <tr>
              <th>Client</th>
              <th>État de Livraison</th>
              <th v-if="isadmin">Livreur</th>
              <th v-if="isadmin">Stock Camion</th>
              <th>Adresse</th> <!-- Nouvelle colonne pour les adresses -->
              <th>Tournee</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(creche, index) in creches" :key="index">
              <td class="hidden-id">{{ creche.id }}</td>
              <td @click="navigateToCrecheDetails(creche.id)">
                <router-link :to="{ name: 'creche-details', params: { id: creche.id } }">
                  {{ creche.nom }}
                </router-link>
              </td>
              <td>
              <span
                :style="{ color: creche.is_delivered ? 'green' : 'red' }">
                 {{ creche.is_delivered ? 'Livrée' : 'Pas Livrée' }}
              </span>
              </td>
              <td v-if="isadmin">{{ tournees.find(tournee => tournee.creches.some(c => c.id === creche.id)).user.nom }}
              </td>
              <td v-if="isadmin">
                <router-link
                  :to="{ name: 'stockCamionSuppForDeliver', params: { id: tournees.find(tournee => tournee.creches.some(c => c.id === creche.id)).user_id } }">
                  Stock Camion
                </router-link>
              </td>
              <td>{{ creche.adresse }}</td><!-- Ajout de la colonne pour les adresses -->
              <td>
                {{
                  tournees.find(tournee => tournee.creches.some(c => c.id === creche.id)).nom
                }}
              </td>

            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import swal from 'sweetalert2';
import ButtonStockCamion from '@/components/ButtonStockCamion.vue'
const Swal = ref(swal);
const router = useRouter();

const tournees = ref([]);
const creches = ref([]);
const accessToken = localStorage.getItem('accessToken');

const livraisons = ref(Array(tournees.value.length).fill(false));
const user = JSON.parse(localStorage.getItem('user')) || {};
const isadmin = user.is_admin || false;


const navigateToCrecheDetails = (crecheId) => {
  router.push({ name: 'creche-details', params: { id: crecheId } });
};



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

      if (Array.isArray(data)) {
        tournees.value = data;
        tournees.value.forEach((tournee) => {
          tournee.creches.forEach((creche) => {
            creches.value.push(creche);
          });
          tournee.selected = false;
        });
        console.log('Livraisons data:', tournees.value);
      } else {
        console.warn('Data received is not an array:', data);
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



const toggleLivraison = (index) => {
  livraisons.value[index] = !livraisons.value[index];
};

const formattedDate = ref('');

onMounted(() => {
  fetchData();
  updateFormattedDate();
  setInterval(updateFormattedDate, 1000);
});

const updateFormattedDate = () => {
  const now = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  formattedDate.value = now.toLocaleDateString('fr-FR', options);
};
</script>
<style scoped>

/* Style pour HomeView */
#homeView {
  overflow: auto;
  margin-bottom: 10px;
  /* Réduction de la marge en bas */
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  margin: auto;
  text-align: center;
  padding: 20px;
  /* Réduction de la taille du padding */
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background: #E1DAFB;
  margin-top: 2rem;
}

#homeViewDiv {
  border: 2px solid #ddd;
  padding: 10px;
  border-radius: 10px;
}

/* Styles pour le tableau */
#tableHomeView {
  width: 100%;
  border-collapse: collapse;
}

#tableHomeView th,
#tableHomeView td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

#tableHomeView th {
  background-color: #f2f2f2;
}


.container {
  width: 100%;
  margin: 0 auto;
}

.hidden-id {
  display: none;
}

/* Styles pour la table-container sur les smartphones */
@media only screen and (max-width: 600px) {
  .table-container {
    width: 100%;
    padding: 20px;
  }

  .date-title h1 {
    font-size: 18px;
    margin-bottom: 10px;
  }

  #homeView {
    width: 100%;
    padding: 10px;
    margin-top: 1rem;
  }

  #homeViewDiv {
    padding: 5px;
  }

  #tableHomeView th,
  #tableHomeView td {
    padding: 6px;
    font-size: 12px;
  }
}</style>