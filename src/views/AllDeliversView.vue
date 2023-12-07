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
              <th>Livreur</th>
              <th>Mot de Passe</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(livraison, index) in livraisons" :key="index">
              <td class="hidden-id">{{ livraison.hiddenId }}</td>
              <td>
                <span v-if="!editMode">{{ livraison.livreur }}</span>
                <input
                  v-else
                  v-model="livraisons[index].livreur"
                  type="text"
                  :disabled="!editMode"
                />
              </td>
              <td>
                <span v-if="!editMode">{{ livraison.password }}</span>
                <input
                  v-else
                  v-model="livraisons[index].password"
                  type="text"
                  :disabled="!editMode"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const livraisons = ref([
  { hiddenId: 1, livreur: 'Livreur1', password: 'password1' },
  { hiddenId: 2, livreur: 'Livreur2', password: 'password2' },
  { hiddenId: 3, livreur: 'Livreur3', password: 'password3' },
]);
const editMode = ref(false);

const toggleEditMode = () => {
  editMode.value = !editMode.value;
};

const saveChanges = () => {
  // Ajoutez ici la logique pour sauvegarder les modifications
  console.log('Modifications enregistrées :', livraisons);
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
