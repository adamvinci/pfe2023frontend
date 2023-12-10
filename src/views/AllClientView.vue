<template>
  <div class="page-container">
    <button @click="toggleEditMode" class="btn-modifier">
      {{ editMode ? "Annuler" : "Modifier" }}
    </button>
    <button v-if="editMode" @click="saveChanges" class="btn-enregistrer">
      Enregistrer
    </button>
    <div v-if="editMode" class="form-container">
      <h3>Créer une nouvelle tournée</h3>
      
      <form @submit.prevent="createTournee">
        <label>Nom de la tournée:</label>
        <input v-model="newTournee" type="text" required />
        <button type="submit">Créer</button>
      </form>

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
                {{
                  (livraison.id &&
                    apiTournees.find(
                      (tournee) => tournee.creches.some((c) => c.id === livraison.id)
                    )?.nom) ||
                  ''
                }}
              </td>
            </tr>
          </tbody>

        </table>
        <select v-if="editMode" v-model="selectedTournee">
          <option value="" disabled selected>Choisissez une tournée</option>
          <option v-for="tournee in apiTournees" :key="tournee.id" :value="tournee.id">
            {{ tournee.nom }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const livraisons = ref({});
const accessToken = localStorage.getItem('accessToken');
const apiTournees = ref([]); // Ajout de la référence pour les tournées de l'API

const tournees = ref([]);
const livraisonss = ref(Array(tournees.value.length).fill(false));

const newTournee = ref('');

const selectedCrecheId = ref(null);

const fetchData = async () => {
  try {
    // Chargement des creches
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
      console.log('Livraisons data:', livraisons.value);
    } else {
      console.error('Error fetching data:', response.status);
    }

    // Chargement des tournées depuis l'API
    const tourneesResponse = await fetch(`${process.env.VUE_APP_BASEURL}/tournees`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (tourneesResponse.ok) {
      apiTournees.value = await tourneesResponse.json();
      console.log('Tournées data:', apiTournees.value);

      // Ajoute cette boucle pour afficher chaque tournée détaillée dans la console
      for (const tournee of apiTournees.value) {
        console.log('Nombre de tournées:', apiTournees.value.length);
      }
    } else {
      console.error('Error fetching tournees:', tourneesResponse.status);
    }
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

const editMode = ref(false);
const selectedTournee = ref('');
const errorMessage = ref('');
const successMessage = ref('');

const toggleEditMode = () => {
  editMode.value = !editMode.value;
};

const saveChanges = () => {
  // Ajoute ici la logique pour sauvegarder les changements
  console.log('Changements sauvegardés. Tournee sélectionnée:', selectedTournee.value);
};

onMounted(() => {
  fetchData();
});

const createTournee = async () => {
  try {
    const selectedCreches = livraisons.value.creches.filter(creche => creche.selected);

    if (selectedCreches.length === 0) {
      // Gérer le cas où aucun élément n'est sélectionné
      console.error('Aucune crèche sélectionnée.');
      return;
    }

    const crecheIds = selectedCreches.map(creche => creche.id); // Obtenir uniquement les IDs

    const response = await fetch(`${process.env.VUE_APP_BASEURL}/tournees`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        nom: newTournee.value,
        creches: crecheIds, // Utiliser uniquement les IDs
      }),
    });

    console.log('Données envoyées:', JSON.stringify({
      nom: newTournee.value,
      creches: crecheIds, // Utiliser uniquement les IDs
    }));

    if (response.ok) {
      // Le reste de votre logique de traitement en cas de succès
    } else {
      console.error('Erreur lors de la création de la tournée:', response.status);
      const errors = await response.json();
      errorMessage.value = errors;
    }
  } catch (error) {
    console.error('Erreur lors de la création de la tournée:', error);
  }
};


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
  
