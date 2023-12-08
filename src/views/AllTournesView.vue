<template>
    <div class="page-container">
      <div class="table-container" id="tourneeView">
        <div class="table-wrapper" id="tourneeViewDiv">
          <table id="tableTourneeView">
            <thead>
              <tr>
                <th>Checkbox</th>
                <th class="hidden-id">ID</th>
                <th>Nom Tournee</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(tournee, index) in tournees" :key="index">
                <td><input type="checkbox" v-model="tournee.selected" class="styled-checkbox" /></td>
                <td class="hidden-id">{{ tournee.id }}</td>
                <td>{{ tournee.nom }}</td>
              </tr>
            </tbody>
          </table>
  
          <!-- Bouton Enregistrer avec la classe btn-enregistrer -->
          <button @click="enregistrer" class="btn-enregistrer">Enregistrer</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const tournees = ref({});
  const accessToken = localStorage.getItem('accessToken');
  
  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.VUE_APP_BASEURL}/auth/tournees`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      if (response.ok) {
        tournees.value = await response.json();
        tournees.value.forEach((tournee) => {
            tournee.selected = false;
        });
        console.log('Livraisons data:', tournees.value);
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
  console.log(tournees);
  const enregistrer = () => {
    const tourneesSelectionnees = tournees.value.filter((tournee) => tournee.selected);
    console.log('Tournees sélectionnées:', tourneesSelectionnees);
    // Ajoute ici la logique pour enregistrer les tournees sélectionnées
  };
  </script>
  
  <style scoped>
  /* Styles pour masquer la colonne Hidden ID */
  .hidden-id {
    display: none;
  }
  
  #tourneeView {
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
  #tourneeViewDiv {
    border: 2px solid #ddd; /* Bordure du carré */
    padding: 20px; /* Espace intérieur du carré */
    border-radius: 10px; /* Coins arrondis du carré */
  }
  
  /* Styles pour le tableau */
  #tableTourneeView {
    width: 100%;
    border-collapse: collapse;
  }
  
  #tableTourneeView th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  
  #tableTourneeView th {
    background-color: #f2f2f2;
  }
  
  /* Styles pour le bouton Enregistrer */
  .btn-enregistrer {
    margin-top: 20px;
    padding: 10px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  </style>
  