<template>
    <div class="page-container">
      <button @click="toggleEditMode" class="btn-modifier">
        {{ editMode ? "Annuler" : "Modifier" }}
      </button>
      <button v-if="editMode" @click="saveChanges" class="btn-enregistrer">
        Enregistrer
      </button>
  
      <div class="table-container" id="homeView">
        <div class="table-wrapper" id="homeViewDiv">
          <table id="tableHomeView">
            <thead>
              <tr>
                <th class="hidden-id">Hidden ID</th>
                <th>Client</th>
                <th>Num tel</th>
                <th>Adresse</th>
                <th v-if="editMode">Action</th>
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
              </tr>
            </tbody>
          </table>
          <select v-if="editMode" v-model="selectedTournee">
            <option v-for="tournee in tournees" :key="tournee">{{ tournee }}</option>
          </select>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const livraisons = ref({});
  const accessToken = localStorage.getItem('accessToken');
  
  const fetchData = async () => {
    try {
      const response = await fetch('/api/creches', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
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
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };
  
  const editMode = ref(false);
  const selectedTournee = ref('');
  const tournees = ["Tournee A", "Tournee B", "Tournee C"];
  
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
  </style>
  