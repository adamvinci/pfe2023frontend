<template>
  <div class="page-container">
    <button @click="toggleEditMode" class="btn-modifier">
      {{ editMode ? "Retour" : "Modifier" }}
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
            <tr v-for="(livreur, index) in livreurs" :key="index">
              <td class="hidden-id">{{ livreur.id }}</td>
              <td>
                <span>{{ livreur.nom }}</span>
              </td>
              <td>
                <span v-if="!editMode">{{ livreur.password }}</span>
                <input v-else v-model="livreurPasswords[index]" type="password" :disabled="!editMode" />
              </td>
              
              <td v-if="editMode">
                <button @click="confirmEditLivreur(livreur.id)" class="btn-modifier">
                  Modifier
                </button>
              </td>
              <td v-if="editMode">
                <button @click="confirmDeleteLivreur(livreur.id)" class="btn-supprimer">
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

const livreurs = ref([]);
const editMode = ref(false);
const livreurPasswords = ref([]);

const toggleEditMode = () => {
  editMode.value = !editMode.value;
};

const accessToken = localStorage.getItem('accessToken');

const fetchData = async () => {
  try {
    const response = await fetch(`${process.env.VUE_APP_BASEURL}/users`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    if (response.ok) {
      livreurs.value = await response.json();
      livreurPasswords.value = livreurs.value.map(() => ''); // Initialiser les mots de passe
      console.log('Livreurs data:', livreurs.value);
    } else {
      console.error('Error fetching data:', response.status);
    }
  } catch (error) {
    console.error('Fetch error:', error);
  }
};


const errorMessage = ref('');
const successMessage = ref('');

const selectedLivreurHiddenId = ref(null);

const editLivreur = (hiddenId) => {
  // Mettre à jour le hiddenId du livreur sélectionné
  selectedLivreurHiddenId.value = hiddenId;
  console.log('id à envoyer:', selectedLivreurHiddenId.value);

  // Appeler fetchData pour mettre à jour les données si nécessaire
  fetchData2();
};

const fetchData2 = async () => {
  try {
    const hiddenId = selectedLivreurHiddenId.value;
    const index = livreurs.value.findIndex((livreur) => livreur.id === hiddenId);
    const passwordToUpdate = livreurPasswords.value[index];
    console.log('id à envoyer:', hiddenId);
    console.log('Mot de passe à envoyer:', passwordToUpdate);
    
    const response = await fetch(`${process.env.VUE_APP_BASEURL}/auth/updatePassword`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        idUser: hiddenId,
        password: passwordToUpdate,
      }),
    });
    if (response.ok) {
      successMessage.value = 'mdp changé avec succès!';
      errorMessage.value = '';
    } else {
      const errors = await response.json();
      console.log(errors)
      errorMessage.value = errors;
      // errorMessage.value = 'Erreur lors de l\'ajout du livreur. Veuillez réessayer.';
      successMessage.value = '';
    }

  } catch (error) {
    console.error('Fetch error:', error);
  }
};

onMounted(() => {
  fetchData();
});
const deleteLivreur = async (hiddenId) => {
  try {
    const response = await fetch(`${process.env.VUE_APP_BASEURL}/users/${hiddenId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      // Supprime le livreur de la liste locale
      const index = livreurs.value.findIndex((livreur) => livreur.id === hiddenId);
      livreurs.value.splice(index, 1);

      successMessage.value = 'Livreur supprimé avec succès!';
      errorMessage.value = '';
    } else {
      const errors = await response.json();
      errorMessage.value = errors;
      // errorMessage.value = 'Erreur lors de la suppression du livreur. Veuillez réessayer.';
      successMessage.value = '';
    }
  } catch (error) {
    console.error('Delete error:', error);
  }
};
const confirmEditLivreur = (hiddenId) => {
  const confirmed = window.confirm('Êtes-vous sûr de vouloir modifier ce livreur ?');

  if (confirmed) {
    // Appeler votre fonction d'édition ici
    editLivreur(hiddenId);
  }
};

const confirmDeleteLivreur = (hiddenId) => {
  const confirmed = window.confirm('Êtes-vous sûr de vouloir supprimer ce livreur ?');

  if (confirmed) {
    // Appeler votre fonction de suppression ici
    deleteLivreur(hiddenId);
  }
};
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
  width: 90%; /* Ajustement de la largeur pour les smartphones */
  margin: auto;
  text-align: center;
  padding: 20px; /* Ajustement de l'espace intérieur pour les smartphones */
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background: #E1DAFB;
  margin-top: 2rem;
}

/* Styles pour le wrapper du tableau */
#homeViewDiv {
  border: 2px solid #ddd;
  padding: 10px; /* Ajustement de l'espace intérieur pour les smartphones */
  border-radius: 10px;
}

/* Styles pour le tableau */
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

/* Styles pour le bouton Modifier et Enregistrer */
button {
  width: 100%; /* Remplir la largeur pour les smartphones */
  margin-bottom: 10px; /* Espace entre les boutons pour les smartphones */
  padding: 10px; /* Ajustement de la taille des boutons pour les smartphones */
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

/* Styles spécifiques pour les smartphones */
@media only screen and (max-width: 600px) {
  #homeView {
    width: 100%; /* Pleine largeur sur les smartphones */
  }

  #homeViewDiv {
    padding: 5px; /* Ajustement de l'espace intérieur pour les smartphones */
  }

  #tableHomeView th,
  td {
    padding: 6px; /* Ajustement de la taille du padding pour les smartphones */
    font-size: 12px; /* Ajustement de la taille de la police pour les smartphones */
  }

  .btn-modifier,
  .btn-enregistrer,
  .btn-supprimer {
    font-size: 12px; /* Ajustement de la taille de la police pour les smartphones */
  }
}
.btn-supprimer {
  background-color: #ff3333;
  color: white;
}
</style>
