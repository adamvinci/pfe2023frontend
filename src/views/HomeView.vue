<template>
  <div class="page-container">
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

    <div class="table-container" id="homeView">
      <!-- Moteur de recherche -->
      <div v-if="isadmin" class="container">
        <input type="text" maxlength="12" placeholder="Rechercher" class="searchbar" />
      </div>
      <div class="table-wrapper" id="homeViewDiv">
        <table id="tableHomeView">
          <thead>
            <tr>
              <th>Client</th>
              <th>État de Livraison</th>
              <th v-if="isadmin">Livreur</th>
              <th v-if="isadmin">Stock Camion</th>
              <th>Adresse</th> <!-- Nouvelle colonne pour les adresses -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="(client, index) in clients" :key="index">
              <td class="hidden-id">{{ client.id }}</td>
              <td>
                <router-link :to="{ path: '/livraisonclient' }">
                  <button>{{ client.name }}</button>
                </router-link>
              </td>
              <td>
                <button
                  id="livraisonCheck"
                  @click="toggleLivraison(index)"
                  :style="{ color: livraisons[index] ? 'green' : 'red' }"
                >
                  {{ livraisons[index] ? 'Livrée' : 'Pas Livrée' }}
                </button>
              </td>
              <td v-if="isadmin">{{ client.livreur }}</td>
              <td v-if="isadmin">
                <router-link :to="{ path: '/stockcamion' }">
                  Stock Camion
                </router-link>
              </td>
              <td>{{ client.address }}</td> <!-- Ajout de la colonne pour les adresses -->
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const clients = ref([
  { id: 1, name: 'Client1', livreur: 'Livreur1', address: 'Adresse1' },
  { id: 2, name: 'Client2', livreur: 'Livreur2', address: 'Adresse2' },
  { id: 3, name: 'Client3', livreur: 'Livreur3', address: 'Adresse3' },
]);
const livraisons = ref(Array(clients.value.length).fill(false));
const user = JSON.parse(localStorage.getItem('user')) || {};
const isadmin = ref(user.isAdmin || true);

const toggleLivraison = (index) => {
  livraisons.value[index] = !livraisons.value[index];
};

const formattedDate = ref('');

onMounted(() => {
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
/* Styles pour le bouton de retour */
/* Styles pour le bouton de retour */
.btn-StockCamion {
  width: 80%;
  height: 40px;
  border: 1px solid #C4B4FD;
  background: #B09CFB;
  color: #fff;
  cursor: pointer;
  border-radius: 3px;
  border-radius: 15px;
  margin-top: 10px; /* Réduction de la marge en haut */
  margin-bottom: 10px; /* Réduction de la marge en bas */
  margin-left: auto;
  margin-right: auto;
}

/* Style pour HomeView */
#homeView {
  overflow: auto;
  margin-bottom: 10px; /* Réduction de la marge en bas */
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  margin: auto;
  text-align: center;
  padding: 20px; /* Réduction de la taille du padding */
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background: #E1DAFB;
  margin-top: 2rem;
}

/* Styles pour le wrapper du tableau */
#homeViewDiv {
  border: 2px solid #ddd;
  padding: 10px; /* Réduction de la taille du padding */
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

/* Styles pour les boutons */
#livraisonCheck {
  padding: 6px 10px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
}

#livraisonCheck:hover {
  opacity: 0.8;
}

/* Styles pour le titre de la date */
.date-title {
  text-align: center;
  margin-bottom: 10px; /* Réduction de la taille de la marge */
}

.date-title h2 {
  font-size: 16px; /* Réduction de la taille de la police */
  margin: 0;
}

/* Styles pour la barre de recherche */
.container {
  width: 100%;
  margin: 0 auto;
}

.searchbar {
  font-size: 1rem; /* Réduction de la taille de la police */
  width: 100%;
  height: 2.5rem;
  border: none;
  outline: none;
  border-radius: 4rem;
  padding: 1rem;
  transition: all 0.1s;
  transition-delay: 0.1s;
}

.button {
  height: 1rem; /* Réduction de la taille de l'icône */
  position: absolute;
  top: 0.7rem;
  right: 0.3rem;
  transition: all 0.1s;
  transition-delay: 0.1s;
}

.searchbar::placeholder {
  opacity: 0.3;
}
.hidden-id {
  display: none;
}

/* Styles pour la table-container sur les smartphones */
@media only screen and (max-width: 600px) {
  .table-container {
    width: 100%;
    padding: 20px; /* Ajustement de la taille du padding */
  }

  .date-title h1 {
    font-size: 18px; /* Ajustement de la taille de la police */
    margin-bottom: 10px; /* Ajustement de la taille de la marge */
  }

  #homeView {
    width: 100%;
    padding: 10px; /* Ajustement de la taille du padding */
    margin-top: 1rem; /* Ajustement de la taille de la marge en haut */
  }

  #homeViewDiv {
    padding: 5px; /* Ajustement de la taille du padding */
  }

  #tableHomeView th,
  #tableHomeView td {
    padding: 6px; /* Ajustement de la taille du padding */
    font-size: 12px; /* Ajustement de la taille de la police */
  }

  .searchbar {
    font-size: 0.9rem; /* Ajustement de la taille de la police */
  }

  .button {
    height: 0.8rem; /* Ajustement de la taille de l'icône */
    top: 0.5rem; /* Ajustement de la position de l'icône */
    right: 0.2rem; /* Ajustement de la position de l'icône */
  }
}
</style>
