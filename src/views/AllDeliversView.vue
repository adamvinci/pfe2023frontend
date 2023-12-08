<template>
    <div class="page-container">
      <button @click="toggleEditMode" class="btn-modifier">
        {{ editMode ? "Retour" : "Modifier" }}
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
                <th>Livreur</th>
                <th>Mot de Passe</th>
                <th v-if="editMode">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(livraison, index) in livreurs" :key="index">
                <td class="hidden-id">{{ livraison.hiddenId }}</td>
                <td>
                  <span v-if="!editMode">{{ livraison.nom }}</span>
                  <input
                    v-else
                    v-model="livreurs[index].livreur"
                    type="text"
                    :disabled="!editMode"
                  />
                </td>
                <td>
                  <span v-if="!editMode">{{ livraison.password }}</span>
                  <input
                    v-else
                    v-model="livreurs[index].password"
                    type="text"
                    :disabled="!editMode"
                  />
                </td>
                <td v-if="editMode">
                  <input type="checkbox" v-model="livreurs[index].selected" />
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
  
  const livreurs = ref([]);
  const editMode = ref(false);
  
  const toggleEditMode = () => {
    editMode.value = !editMode.value;
  };
  
  
  const saveChanges = () => {
    // Ajoutez ici la logique pour sauvegarder les modifications des livreurs
    console.log('Modifications enregistrées :', livreurs);
  };
  const accessToken = localStorage.getItem('accessToken');
  
  
  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.VUE_APP_BASEURL}/users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      if (response.ok) {
        livreurs.value = await response.json();
        livreurs.value.forEach((livreur) => {
          livreur.selected = false;
        });
        console.log('Livreurs data:', livreurs.value);
      } else {
        console.error('Error fetching data:', response.status);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };
  
  onMounted(() => {
    fetchData();
  });
  </script>
  
  <style scoped>
  /* Styles pour masquer la colonne Hidden ID */
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
  
  /* Styles pour le wrapper du tableau */
  #homeViewDiv {
    border: 2px solid #ddd;
    padding: 20px;
    border-radius: 10px;
  }
  
  /* Styles pour le tableau */
  #tableHomeView {
    width: 100%;
    border-collapse: collapse;
  }
  
  #tableHomeView th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  
  #tableHomeView th {
    background-color: #f2f2f2;
  }
  
  /* Styles pour le bouton Modifier et Enregistrer */
  button {
    padding: 6px 10px;
    cursor: pointer;
    border: none;
    border-radius: 4px;
  }
  
  .btn-modifier {
    background-color: #4CAF50;
    color: white;
  }
  
  .btn-enregistrer {
    background-color: #008CBA;
    color: white;
  }
  
  button:hover {
    opacity: 0.8;
  }
  </style>