<template>
    <div class="table-container" id="homeView">
      <button @click="toggleDeleteMode" v-if="!editMode" class="btn-supprimer">
        {{ deleteMode ? "Retour" : "Supprimer" }}
      </button>
      <div class="table-wrapper" id="homeViewDiv">
        <table id="tableHomeView">
          <thead>
            <tr>
              <th class="hidden-id">Hidden ID</th>
              <th>Client</th>
              <th>Num tel</th>
              <th>Adresse</th>
              <th v-if="editMode">Choix</th>
              <th>Tournee</th>
              <th v-if="deleteMode">Supprimer</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(livraison, index) in livraisons.creches" :key="index">
              <td class="hidden-id">{{ livraison.id }}</td>
              <td @click="navigateToCrecheDetails(livraison.id)">
                <router-link :to="{ name: 'creche-details', params: { id: livraison.id } }">
                  {{ livraison.nom }}
                </router-link>
              </td>
              <td>{{ livraison.gsm }}</td>
              <td>{{ livraison.adresse }}</td>
              <td v-if="editMode">
                <input type="checkbox" v-model="livraison.selected" />
              </td>
              <td>
                {{ getTourneeName(livraison.id) }}
              </td>
              <td v-if="deleteMode">
                <button @click="confirmDelete(livraison.id)" class="btn-supprimer">
                  <!-- Your delete button content goes here -->
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>


<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import swal from 'sweetalert2';


const Swal = ref(swal);
const router = useRouter();
const livraisons = ref({});
const accessToken = localStorage.getItem('accessToken');
const apiTournees = ref([]);
const newTournee = ref('');
const editMode = ref(false);
const selectedTournee = ref('');

const fetchData = async () => {
  console.log('Avant la requête API');

  try {
    const response = await fetch(`${process.env.VUE_APP_BASEURL}/creches`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      livraisons.value = await response.json();
      livraisons.value.creches.forEach((creche) => {
        creche.selected = false;
      });
    } else {
      const errorData = await response.json();
      const errorMessages = (errorData.errors || []).map(element => element.message).join('<br>');

      Swal.value.fire({
        icon: "error",
        title: "Oops...",
        html: errorMessages || errorData.message || errorData.error || 'An unknown error occurred',
      });
    }

    const tourneesResponse = await fetch(`${process.env.VUE_APP_BASEURL}/tournees`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (tourneesResponse.ok) {
      apiTournees.value = await tourneesResponse.json();
      console.log('tournees:', apiTournees.value);

    } else {
      const responseData = await response.json();
      const errorMessages = (responseData.errors || []).map(element => element.message).join('<br>');

      Swal.value.fire({
        icon: "error",
        title: "Oops...",
        html: errorMessages || responseData.message || responseData.error || 'An unknown error occurred',
      });
    }
  } catch (error) {
    console.error('Fetch error:', error);
  }
  console.log('Après la requête API');
};

const getTourneeName = (crecheId) => {
  const foundTournee = apiTournees.value.find(
    (tournee) => tournee.creches.some((c) => c.id === crecheId)
  );

  return foundTournee ? foundTournee.nom : '';
};


const navigateToCrecheDetails = (crecheId) => {
  router.push({ name: 'creche-details', params: { id: crecheId } });
};


onMounted(() => {
  fetchData();
});

const deleteClient = async (crecheId) => {
  try {
    const response = await fetch(`${process.env.VUE_APP_BASEURL}/creche/${crecheId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      // Supprime le client de la liste locale
      const index = livraisons.value.creches.findIndex((creche) => creche.id === crecheId);
      livraisons.value.creches.splice(index, 1);

      Swal.value.fire({
        icon: "success",
        title: "Success",
        html: "Nursery Deleted successfully",
        timer: 1500,
      });
    } else {
      const responseData = await response.json();
      const errorMessages = (responseData.errors || []).map(element => element.message).join('<br>');

      Swal.value.fire({
        icon: "error",
        title: "Oops...",
        html: errorMessages || responseData.message || responseData.error || 'An unknown error occurred',
      });

    }
  } catch (error) {
    console.error('Delete error:', error);
  }
};
const deleteMode = ref(false);

const toggleDeleteMode = () => {
  deleteMode.value = !deleteMode.value;
};
const confirmDelete = (crecheId) => {
  const confirmed = window.confirm('Êtes-vous sûr de vouloir supprimer ce client ?');

  if (confirmed) {
    deleteClient(crecheId);
  }
};

</script>


<style scoped>
/* Common styles for both desktop and mobile */
.btn-supprimer {
  background-color: red; /* Set your desired red color */
  color: white; /* Text color */
  border: none; /* Remove button border if needed */
  padding: 10px 15px; /* Adjust padding as needed */
  border-radius: 5px; /* Add border radius for rounded corners */
  cursor: pointer; /* Add pointer cursor for better UX */
}

.hidden-id {
  display: none;
}

#homeView {
  overflow: auto;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background: #E1DAFB;
  margin-top: 4rem;
}

#homeViewDiv {
  border: 2px solid #ddd;
  padding: 20px;
  border-radius: 10px;
}

#tableHomeView {
  width: 100%;
  border-collapse: collapse;
}

#tableHomeView th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

#tableHomeView th {
  background-color: #f2f2f2;
}

.form-container {
  margin-top: 20px;
  background: #fff;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
}

.form-container label {
  margin-right: 10px;
}

/* Media query for screens smaller than 600px (adjust as needed) */
@media (max-width: 600px) {
  #homeView {
    width: 100%;
    padding: 10px;
  }

  #homeViewDiv {
    width: 100%;
    padding: 10px;
  }

  #tableHomeView th,
  #tableHomeView td {
    font-size: 10px; /* Adjust font size for smaller screens */
  }

  .form-container {
    padding: 10px;
  }

  .form-container label {
    display: block;
    margin-bottom: 5px;
  }

  .form-container input,
  .form-container select,
  .form-container button {
    width: 100%;
    margin-bottom: 10px;
  }

  /* Ensure that the button is displayed properly */
  #tableHomeView td .btn-supprimer {
    display: block; 
  }

}


</style>
