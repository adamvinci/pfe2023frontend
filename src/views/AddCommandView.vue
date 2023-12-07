<template>
  <div class="addCommand">
    <form @submit.prevent="submitCommand">
      <div class="table-container">
        <h1>Ajouter Commande</h1>
        <table id="table">
          <thead>
            <tr>
              <th>Article</th>
              <th>Quantité</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Langes -Petit-</td>
              <td>
                <input type="number" v-model="langesQuantity" />
              </td>
            </tr>
            <tr>
              <td>Langes -Moyenne-</td>
              <td>
                <input type="number" v-model="langesQuantity" />
              </td>
            </tr>
            <tr>
              <td>Langes -Grande-</td>
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
            <label for="day">Tournées : </label>
        <select v-model="selectTournees" id="day">
          <option value="Tournee1">Tournee1</option>
          <option value="Tournee2">Tournee2</option>
        </select>
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
const $router = useRouter();
const selectTournees = ref('tournee1');

const submitCommand = () => {
  console.log('Langes:', langesQuantity.value);
  console.log('Inserts:', insertsQuantity.value);
  console.log('Sacs:', sacsQuantity.value);
  console.log('Gants:', gantsQuantity.value);

  $router.push('/home');
};
</script>

<style scoped>
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
