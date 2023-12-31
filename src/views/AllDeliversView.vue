<template>
  <div class="page-container">
    <button @click="toggleEditMode" class="btn-modifier">
      {{ editMode ? "Retour" : "Modifier" }}
    </button>
    <div class="table-container" id="homeView">
      <div class="table-wrapper" :class="{ 'edit-mode': editMode }" id="homeViewDiv">
        <table :class="{ 'edit-mode': editMode }" id="tableHomeView">
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
                <div>
                  <button @click="confirmDeleteLivreur(livreur.id)" class="btn-supprimer">
                    X
                  </button>
                </div>

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
import swal from 'sweetalert2';
const Swal = ref(swal);
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
};



const selectedLivreurHiddenId = ref(null);

const editLivreur = (hiddenId) => {
  // Mettre à jour le hiddenId du livreur sélectionné
  selectedLivreurHiddenId.value = hiddenId;


  // Appeler fetchData pour mettre à jour les données si nécessaire
  fetchData2();
};

const fetchData2 = async () => {
  try {
    const hiddenId = selectedLivreurHiddenId.value;
    const index = livreurs.value.findIndex((livreur) => livreur.id === hiddenId);
    const passwordToUpdate = livreurPasswords.value[index];


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
      Swal.value.fire({
        icon: "success",
        title: "Success",
        html: "User Password successfully updated",
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
      const index = livreurs.value.findIndex((livreur) => livreur.id === hiddenId);
      livreurs.value.splice(index, 1);
      Swal.value.fire({
        icon: "success",
        title: "Success",
        html: "User Deleted successfully",
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
const confirmEditLivreur = (hiddenId) => {
  const confirmed = window.confirm('Êtes-vous sûr de vouloir modifier ce livreur ?');

  if (confirmed) {
    editLivreur(hiddenId);
  }
};

const confirmDeleteLivreur = (hiddenId) => {
  const confirmed = window.confirm('Êtes-vous sûr de vouloir supprimer ce livreur ?');

  if (confirmed) {
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
  width: 90%;
  margin: auto;
  text-align: center;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background: #213979;
  margin-top: 2rem;
  color: white;
}

#homeViewDiv {
  border: 2px solid #ddd;
  padding: 10px;
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
  background-color: #00549a;
}

/* Styles pour le bouton Modifier et Enregistrer */
button {
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
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

.edit-mode #tableHomeView {
  display: block;
  width: 100%;
  overflow-x: auto;
  white-space: nowrap;
}

/* Styles spécifiques pour les smartphones */
@media only screen and (max-width: 600px) {
  #homeView {
    width: 100%;
  }

  #homeViewDiv {
    padding: 5px;
  }

  #tableHomeView th,
  td {
    padding: 6px;
    font-size: 12px;
  }

  .btn-modifier,
  .btn-enregistrer,
  .btn-supprimer {
    font-size: 12px;
  }
}

.btn-supprimer {
  background-color: #ff3333;
  color: white;
}
</style>
