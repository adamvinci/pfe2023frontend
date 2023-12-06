<template>
  <div class="addCommand">
    <form @submit.prevent="submitCommand">
      <div class="table-container">
        <h1>Ajouter Commande</h1>

        <label for="day">Jour de la semaine :</label>
        <select v-model="selectedDay" id="day">
          <option value="lundi">Lundi</option>
          <option value="mardi">Mardi</option>
          <option value="mercredi">Mercredi</option>
          <option value="jeudi">Jeudi</option>
          <option value="vendredi">Vendredi</option>
          <option value="samedi">Samedi</option>
          <option value="dimanche">Dimanche</option>
        </select>

        <table id="table">
          <thead>
            <tr>
              <th>Article</th>
              <th>Quantité</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Langes</td>
              <td>
                <input type="number" v-model="langesQuantity" />
              </td>
            </tr>
            <tr>
              <td>Inserts</td>
              <td>
                <input type="number" v-model="insertsQuantity" />
              </td>
            </tr>
            <tr>
              <td>Sacs</td>
              <td>
                <input type="number" v-model="sacsQuantity" />
              </td>
            </tr>
            <tr>
              <td>Gants</td>
              <td>
                <input type="number" v-model="gantsQuantity" />
              </td>
            </tr>
          </tbody>
        </table>
        <Bouton @click="submitCommand"> Ajouter  </Bouton>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Bouton from '@/components/Bouton.vue';

const langesQuantity = ref(0);
const insertsQuantity = ref(0);
const sacsQuantity = ref(0);
const gantsQuantity = ref(0);
const selectedDay = ref('lundi');
const $router = useRouter();

const submitCommand = () => {
  console.log('Jour de la semaine:', selectedDay.value);
  console.log('Langes:', langesQuantity.value);
  console.log('Inserts:', insertsQuantity.value);
  console.log('Sacs:', sacsQuantity.value);
  console.log('Gants:', gantsQuantity.value);

  $router.push('/home');
};
</script>

<style scoped>
/* Add command styles */
#table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 10px;
}

#table table, th, td {
  border: 1px solid #ddd;
}

#table th, td {
  padding: 10px;
  text-align: center;
}
</style>
