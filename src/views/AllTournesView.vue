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
              <td>
                <input type="checkbox" v-model="tournee.selected" class="styled-checkbox"
                  @change="() => selectionnerTournee(tournee.id)" />
              </td>
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
import swal from 'sweetalert2';
const Swal = ref(swal);
const tournees = ref([]);;
const accessToken = localStorage.getItem('accessToken');
const iduser = localStorage.getItem('user');
const parseduser = JSON.parse(iduser);

let selectedTourneeId = null;


const selectionnerTournee = (tourneeId) => {
  selectedTourneeId = tourneeId;
};
const enregistrer = () => {


  if (selectedTourneeId !== null) {
    fetchData2(selectedTourneeId);
  }
};


const fetchData = async () => {
  try {
    const response = await fetch(`${process.env.VUE_APP_BASEURL}/tournees`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    if (response.ok) {
      tournees.value = (await response.json()).filter(tournee => tournee.user_id === null);
      tournees.value.forEach((tournee) => {
        tournee.selected = false;
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
  } catch (error) {
    console.error('Fetch error:', error);
  }
};
const fetchData2 = async () => {
  try {
    const response = await fetch(`${process.env.VUE_APP_BASEURL}/users/assignDelivery`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        idDelivery: selectedTourneeId,
        idDeliveryMan: parseduser.id,
      }),
    });
    if (response.ok) {
      // Trouver la tournee sélectionnée dans le tableau et la mettre à jour
      const updatedTournees = [...tournees.value];
      const index = updatedTournees.findIndex(tournee => tournee.id === selectedTourneeId);
      if (index !== -1) {
        updatedTournees.splice(index, 1);
      }
      tournees.value = updatedTournees;
      Swal.value.fire({
        icon: "success",
        title: "Success",
        html: "Delivery A successfully",
        timer: 1500,
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

/* Styles généraux pour la vue de la tournée */
#tourneeView {
  overflow: auto;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
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

#tourneeViewDiv {
  border: 2px solid #ddd;
  padding: 10px;
  border-radius: 10px;
}

#tableTourneeView {
  width: 100%;
  border-collapse: collapse;
}

#tableTourneeView th,
#tableTourneeView td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

#tableTourneeView th {
  background-color: #00549a;
}

.btn-enregistrer {
  margin-top: 20px;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

/* Styles pour les smartphones */
@media only screen and (max-width: 600px) {
  #tourneeView {
    width: 100%;
    padding: 10px;
  }

  #tourneeViewDiv {
    padding: 5px;
  }

  #tableTourneeView th,
  #tableTourneeView td {
    padding: 6px;
    font-size: 12px;
  }
}
</style>
  