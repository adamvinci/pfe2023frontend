<template>
    <div>
     <!-- Bouton StockCamion -->
     <router-link to="/stockcamion">
      <button v-if="!isadmin" class="btn-StockCamion">Stock Camion</button>
    </router-link>
    <!-- Bouton en haut à gauche -->
    <router-link to="/stockCamionSupp">
      <button v-if="!isadmin" class="btn-StockCamion">Stock Supplémentaire</button>
    </router-link>
       
    <div class="date-title">
      <h1>{{ formattedDate }}</h1>
      <h2>Aujourd'hui</h2>
    </div>
</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import swal from 'sweetalert2';
const Swal = ref(swal);

const tournees = ref([]);
const creches = ref([]);
const accessToken = localStorage.getItem('accessToken');

const user = JSON.parse(localStorage.getItem('user')) || {};
const isadmin = user.is_admin || false;


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

.btn-StockCamion {
  width: 80%;
  height: 40px;
  border: 1px solid ;
  background: #F6BA4E ;
  color: black;
  cursor: pointer;
  border-radius: 3px;
  border-radius: 15px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: auto;
  margin-right: auto;
}

/* Styles pour le titre de la date */
.date-title {
  text-align: center;
  margin-bottom: 20px; /* Increased margin for better separation */
  background-color: #F6BA4E; /* Background color */
  padding: 20px; /* Increased padding for more space */
  border-radius: 15px; /* Rounded corners */
  color: #213979; /* Text color */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Slightly adjusted box shadow for a subtle effect */
}

.date-title h1 {
  font-size: 28px; /* Slightly increased font size */
  margin: 0;
  font-weight: bold; /* Added bold font weight for emphasis */
}

.date-title h2 {
  font-size: 18px; /* Slightly increased font size */
  margin: 0;
}

.button {
  height: 1rem;
  position: absolute;
  top: 0.7rem;
  right: 0.3rem;
  transition: all 0.1s;
  transition-delay: 0.1s;
}
.hidden-id {
  display: none;
}

/* Styles pour la table-container sur les smartphones */
@media only screen and (max-width: 600px) {
  .date-title h1 {
    font-size: 18px;
    margin-bottom: 10px;
  }
  .button {
    height: 0.8rem;
    top: 0.5rem;
    right: 0.2rem;
  }
}</style>