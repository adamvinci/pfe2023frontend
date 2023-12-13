<template>
    <div class="page-container">
        <router-link to="/home">
            <button class="btn-back">Retour</button>
        </router-link>
        <p v-if="isAdmin" class="tourneeName" contenteditable @input="updateNom">
            {{ tourneeDetails.nom }}
        </p>
        <p v-else class="tourneeName">
            {{ tourneeDetails.nom }}
        </p>
        <p v-if="isAdmin" class="tourneeName" contenteditable @input="updatePourcentage">
            {{ tourneeDetails.pourcentage_supplementaire }}
        </p>
        <p v-if="isAdmin" class="tourneeName" contenteditable>
            Livreur :
            <select class="select" v-model="selectedUser">
                <option value="">You can choose a delivery man </option>
                <option v-for="livreur in livreurs" :key="livreur.id" :value="livreur.id">
                    {{ livreur.nom }}
                </option>
            </select>
        </p>

        <h4 class="crecheName">Nom des crèches a livrer : {{ nomCreches }}</h4>
        <div>
            <button @click="enregistrer" class="btn-enregistrer" v-if="isAdmin">
                Enregistrer
            </button>
        </div>

        <div class="table-container" id="homeView">
            <div class="table-wrapper" id="homeViewDiv">
                <table id="tableHomeView">
                    <thead>
                        <tr>
                            <th>Article</th>
                            <th>Quantité A Prendre | </th>
                            <th>Quantité Supplementaire A Prendre</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>Nombre caisse lange S</td>
                            <td>
                                {{ tourneeDetails.nombre_caisse_linge_s_aprendre }}
                            </td>

                            <td>
                                {{ tourneeDetails.nombre_caisse_linge_s_supplementaire }}
                            </td>
                        </tr>

                        <tr>
                            <td>Nombre caisse lange M</td>
                            <td>
                                {{ tourneeDetails.nombre_caisse_linge_m_aprendre }}
                            </td>
                            <td>
                                {{ tourneeDetails.nombre_caisse_linge_m_supplementaire }}
                            </td>
                        </tr>

                        <tr>
                            <td>Nombre caisse lange L</td>
                            <td>
                                {{ tourneeDetails.nombre_caisse_linge_l_aprendre }}
                            </td>
                            <td>
                                {{ tourneeDetails.nombre_caisse_linge_l_supplementaire }}
                            </td>
                        </tr>

                        <tr>
                            <td>Nombre caisse gants</td>
                            <td>
                                {{ tourneeDetails.nombre_caisse_gant_a_prendre }}
                            </td>
                            <td>
                                {{ tourneeDetails.nombre_caisse_gant_a_prendre }}
                            </td>
                        </tr>

                        <tr>
                            <td>Nombre sac poubelle</td>
                            <td>
                                {{ tourneeDetails.nombre_caisse_sac_poubelle_a_prendre }}
                            </td>
                            <td>
                                {{ tourneeDetails.nombre_caisse_sac_poubelle_supplementaire }}
                            </td>

                        </tr>

                        <tr>
                            <td>Nombre caisses insert</td>
                            <td>
                                {{ tourneeDetails.nombre_caisse_insert_a_prendre }}
                            </td>
                            <td>
                                {{ tourneeDetails.nombre_caisse_insert_supplementaire }}
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
import { useRoute } from 'vue-router';
import swal from 'sweetalert2';
const Swal = ref(swal);

const route = useRoute();
const accessToken = localStorage.getItem('accessToken');

const editMode = ref(false);
const isAdmin = ref(false);
const storedUser = localStorage.getItem('user');
if (storedUser) {
    const parsedUser = JSON.parse(storedUser);
    isAdmin.value = parsedUser.is_admin || false;
}
const tourneeDetails = ref({});
const selectedUser = ref('')
const livreurs = ref([])
const nomCreches = ref({})
const fetchData = async () => {
    try {
        const response = await fetch(`${process.env.VUE_APP_BASEURL}/tournees/${route.params.id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        if (response.ok) {
            const data = await response.json();
            if (data && data.tournee) {
                tourneeDetails.value = data.tournee[0]
                if (tourneeDetails.value.user_id) {
                    selectedUser.value = tourneeDetails.value.user_id;
                }
                nomCreches.value = data.tournee[0].creches.map((creche) => creche.nom);
                nomCreches.value = nomCreches.value.join(",")
            }
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
        console.error('Erreur lors de la requête POST:', error);
        console.log('Response Text:', await error.text());
    }
};

const fetchUser = async () => {
    try {
        const response = await fetch(`${process.env.VUE_APP_BASEURL}/users`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        if (response.ok) {

            const data = await response.json();
            if (data) {
                livreurs.value = data
                livreurs.value = livreurs.value.filter(livreur => !livreur.is_admin);
            }
        } else {

        }
    } catch (error) {
        console.error('Erreur lors de la requête POST:', error);
        console.log('Response Text:', await error.text());
    }
};
onMounted(() => {
    fetchData();
    fetchUser();
});
const updateNom = (event) => {
    tourneeDetails.value.nom = event.target.textContent;
};
const updatePourcentage = (event) => {
    tourneeDetails.value.pourcentage_supplementaire = event.target.textContent;
};

const enregistrer = async () => {
    const requestBody = {
        deliveryId: `${route.params.id}`,
        nom: tourneeDetails.value.nom,
        pourcentageSupplementaire: tourneeDetails.value.pourcentage_supplementaire,
    };
    console.log(requestBody)
    if (selectedUser.value !== "") {
        requestBody.deliveryMan = selectedUser.value;
    }
    console.log(requestBody)
    try {
        const response = await fetch(`${process.env.VUE_APP_BASEURL}/tournees/updateOne`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify(requestBody),
        });

        if (response.ok) {
            Swal.value.fire({
                icon: "success",
                title: "Success",
                html: "Nursery updated successfully",
                timer: 1500,
                didClose: () => {
                    window.location.reload();
                }
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
        console.error('Erreur lors de la requête POST:', error);
        console.log('Response Text:', await error.text());
    }

    editMode.value = false; // Disable edit mode after saving
};

</script>
    
<style scoped>
/* Styles pour masquer la colonne Hidden ID */
.hidden-id {
    display: none;
}

/* Le tableau de base */
.table-container {
    overflow: auto;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90%;
    /* Ajustement de la largeur pour les smartphones */
    margin: auto;
    text-align: center;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background: #213979;
    margin-top: 4rem;
    color: white;
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

.btn-modifier,
.btn-enregistrer,
.btn-back {
    background-color: #4CAF50;
    color: white;
    font-size: 16px;
}

.btn-enregistrer {
    margin-top: 20px;
}

button:hover {
    opacity: 0.8;
}

#tableHomeView thead {
    background-color: #00549a;
    /* Set your desired background color */
    color: white;
    /* Set the text color for the header */
}

.tourneeName {
    font-size: 20px;
    margin: auto;
    text-align: center;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 10px;
    background-color: #F6BA4E;
    /* Nouvelle couleur de fond */
    padding: 10px;
    border-radius: 10px;
}

.crecheName {
    font-size: 15px;
    margin: auto;
    text-align: center;
    letter-spacing: 2px;

    background-color: #F6BA4E;
    /* Nouvelle couleur de fond */
    padding: 10px;
    border-radius: 10px;
}
</style>