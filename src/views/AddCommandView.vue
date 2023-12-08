<template>
  <div class="addCommand">
    <form @submit.prevent="submitCommand">
      <h1>Ajouter Commande</h1>
      <div class="form-group">
        <label for="langes">Langes - Petit -</label>
        <input type="number" v-model="langesQuantity" id="langes" />
      </div>
      <div class="form-group">
        <label for="inserts">Inserts</label>
        <input type="number" v-model="insertsQuantity" id="inserts" />
      </div>
      <div class="form-group">
        <label for="sacs">Sacs</label>
        <input type="number" v-model="sacsQuantity" id="sacs" />
      </div>
      <div class="form-group">
        <label for="gants">Gants</label>
        <input type="number" v-model="gantsQuantity" id="gants" />
      </div>
      <div class="form-group">
        <label for="day">Tournées :</label>
        <select v-model="selectTournees" id="day">
          <option value="Tournee1">Tournee1</option>
          <option value="Tournee2">Tournee2</option>
        </select>
      </div>
      <Bouton @click="submitCommand">Ajouter</Bouton>
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
.addCommand {
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
  background: #E1DAFB;
  margin-top: 4rem;
}

form {
  width: 100%;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input,
select {
  width: 100%;
  height: 40px;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 15px;
  box-sizing: border-box;
  background-color: #D3CAF6;
  text-align: center;
}

Bouton {
  width: 100%;
}
</style>
