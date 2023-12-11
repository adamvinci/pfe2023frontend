<template>
  <div class="page-container">
    <button @click="toggleEditMode" class="btn-modifier">
      {{ editMode ? "Annuler" : "Assigner commande à tournée" }}
    </button>

    <button @click="toggleDeleteMode" v-if="!editMode" class="btn-supprimer">
      {{ deleteMode ? "Retour" : "Supprimer" }}
    </button>

    <div v-if="editMode" class="form-container">
      <h3>Créer une nouvelle tournée</h3>

      <form @submit.prevent="createTournee">
        <label>Nom de la tournée:</label>
        <input v-model="newTournee" type="text" required />
        <button type="submit">Créer</button>
      </form>

      <h3>Ajouter un client à une tournée</h3>
      <select v-if="editMode" v-model="selectedTournee">
        <option value="" disabled selected>Choisissez une tournée</option>
        <option v-for="tournee in apiTournees" :key="tournee.id" :value="tournee.id">
          {{ tournee.nom }}
        </option>
      </select>

      <button @click="confirmDeleteTournee(selectedTournee)" v-if="editMode" class="btn-supprimer">
        Supprimer
      </button>

      <button @click="addToTournee" type="button">Ajouter</button>
    </div>



    <div class="table-container" id="homeView">
      <div class="table-wrapper" id="homeViewDiv">
        <table id="tableHomeView">
          <thead>
            <tr>
              <th class="hidden-id">Hidden ID</th>
              <th>Client</th>
              <th>Num tel</th>
              <th>Adresse</th>
              <th v-if="editMode">Choix</th>
              <th v-if="deleteMode">Supprimer</th>
              <th>Tournee</th>
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
                  Supprimer
                </button>
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
const toggleEditMode = () => {
  editMode.value = !editMode.value;
};



const createTournee = async () => {
  try {
    const selectedCreches = livraisons.value.creches.filter(creche => creche.selected);

    if (selectedCreches.length === 0) {
      console.error('Aucune crèche sélectionnée.');
      return;
    }

    const crecheIds = selectedCreches.map(creche => creche.id);

    const response = await fetch(`${process.env.VUE_APP_BASEURL}/tournees`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        nom: newTournee.value,
        creches: crecheIds,
      }),
    });

    if (response.ok) {
      // Handle success if needed
      Swal.value.fire({
        icon: "success",
        title: "Success",
        html: "Tournee has been added",
        timer: 1500,
      });
      window.location.reload();

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
    console.error('Erreur lors de la création de la tournée:', error);
  }
};

const getTourneeName = (crecheId) => {
  const foundTournee = apiTournees.value.find(
    (tournee) => tournee.creches.some((c) => c.id === crecheId)
  );

  return foundTournee ? foundTournee.nom : '';
};

const addToTournee = async () => {
  try {
    const selectedClients = livraisons.value.creches.filter((creche) => creche.selected);

    if (selectedClients.length === 0 || !selectedTournee.value) {
      console.error('Aucun client sélectionné ou aucune tournée choisie.');
      return;
    }

    const clientIds = selectedClients.map((creche) => creche.id);
    console.log('clientIds:', clientIds);

    const response = await fetch(`${process.env.VUE_APP_BASEURL}/tournees/updateOne`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        deliveryId: selectedTournee.value,  // Assurez-vous que le nom du champ est correct
        creches: clientIds,
      }),
    });


    if (response.ok) {
      console.log('Clients ajoutés à la tournée avec succès:', response);
      Swal.value.fire({
        icon: "success",
        title: "Success",
        html: "Tournee updated successfully",
        timer: 1500,
      });
      window.location.reload();
    } else {
      console.error('Erreur lors de l\'ajout des clients à la tournée:', response.status);
      const errors = await response.json();
      errorMessage.value = errors;
    }
  } catch (error) {
    console.error('Erreur lors de l\'ajout des clients à la tournée:', error);
  }
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
const confirmDeleteTournee = (tourneeId) => {
  console.log('tourneeId:', tourneeId); // Add this line to check the value
  const confirmed = window.confirm('Êtes-vous sûr de vouloir supprimer cette tournée ?');

  if (confirmed) {
    deleteTournee(tourneeId);
  }
};

const deleteTournee = async (tourneeId) => {
  try {
    const response = await fetch(`${process.env.VUE_APP_BASEURL}/tournees/${tourneeId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      // Supprime la tournée de la liste locale
      const index = apiTournees.value.findIndex((tournee) => tournee.id === tourneeId);
      apiTournees.value.splice(index, 1);

     Swal.value.fire({
        icon: "success",
        title: "Success",
        html: "Delivery Deleted successfully",
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

</script>


<style scoped>
/* Common styles for both desktop and mobile */
.btn-supprimer {
  background-color: #ff3333;
  color: white;
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
    width: 90%;
    /* Adjust the width for smaller screens */
    padding: 10px;
    /* Adjust padding for smaller screens */
  }

  #homeViewDiv {
    padding: 10px;
    /* Adjust padding for smaller screens */
  }

  #tableHomeView th,
  td {
    font-size: 12px;
    /* Adjust font size for smaller screens */
  }

  .form-container {
    padding: 10px;
    /* Adjust padding for smaller screens */
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
}
</style>
