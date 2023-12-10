<template>
  <div class="page-container">
    <button @click="toggleEditMode" class="btn-modifier">
      {{ editMode ? "Annuler" : "Modifier" }}
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
              <th>Tournee</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(livraison, index) in livraisons.creches" :key="index">
              <td class="hidden-id">{{ livraison.id }}</td>
              <td>{{ livraison.nom }}</td>
              <td>{{ livraison.gsm }}</td>
              <td>{{ livraison.adresse }}</td>
              <td v-if="editMode">
                <input type="checkbox" v-model="livraison.selected" />
              </td>
              <td>
                {{ getTourneeName(livraison.id) }}
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

const livraisons = ref({});
const accessToken = localStorage.getItem('accessToken');
const apiTournees = ref([]);
const newTournee = ref('');
const editMode = ref(false);
const selectedTournee = ref('');
const errorMessage = ref('');

const fetchData = async () => {
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
      console.error('Error fetching data:', response.status);
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
      console.error('Error fetching tournees:', tourneesResponse.status);
    }
  } catch (error) {
    console.error('Fetch error:', error);
  }
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
    } else {
      console.error('Erreur lors de la création de la tournée:', response.status);
      const errors = await response.json();
      errorMessage.value = errors;
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

    const response = await fetch(`${process.env.VUE_APP_BASEURL}/tournees/updateOne`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        id: selectedTournee.value,  // Assurez-vous que le nom du champ est correct
        creches: clientIds,
      }),
    });

    if (response.ok) {
      // Gérer le succès si nécessaire
      console.log('Clients ajoutés à la tournée avec succès.');
    } else {
      console.error('Erreur lors de l\'ajout des clients à la tournée:', response.status);
      const errors = await response.json();
      errorMessage.value = errors;
    }
  } catch (error) {
    console.error('Erreur lors de l\'ajout des clients à la tournée:', error);
  }
};


onMounted(() => {
  fetchData();
});

</script>

<style scoped>
.hidden-id {
  display: none;
}

#homeView {
  overflow: auto;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40%;
  margin: auto;
  text-align: center;
  padding: 50px;
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
</style>
  
