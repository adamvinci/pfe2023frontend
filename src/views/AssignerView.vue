<template>
  <div class="assigner">
    <form @submit.prevent="submitCommand">
      <div class="table-container">
        <h1>Assigner commande à un livreur</h1>
        <label id="list" for="client">Liste clients :</label>
        <select v-model="selectedClient" id="client">
          <option value="client1">Client1</option>
          <option value="client2">Client2</option>
        </select>
        <label id="list" for="livreur">Liste livreur :</label>
        <select v-model="selectedLivreur" id="livreur">
          <option value="livreur1">Livreur1</option>
          <option value="livreur2">Livreur2</option>
        </select>
        <Bouton @click="submitCommand"> Assigner </Bouton>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Bouton from '@/components/Bouton.vue';
import { useRouter } from 'vue-router';

const selectedClient = ref('client1');
const selectedLivreur = ref('livreur1');
const $router = useRouter();

const submitCommand = () => {
  // Vous pouvez traiter les valeurs sélectionnées ici
  console.log('Client sélectionné:', selectedClient.value);
  console.log('Livreur sélectionné:', selectedLivreur.value);
  $router.push('/home');
};
</script>

<style scoped>
.assigner label {
  display: block;
  font-size: 14px;
  margin-bottom: 8px;
  color: #555;
}

.assigner select {
  width: 50%;
  height: 40px;
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-sizing: border-box;
}
</style>
