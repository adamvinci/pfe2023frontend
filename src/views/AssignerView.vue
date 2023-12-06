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
  
  <script>
  import Bouton from '@/components/Bouton.vue';

  export default {
    name: 'assigner',
    components: {
    Bouton,
  },
    data() {
      return {
        selectedClient: 'client1',
        selectedLivreur: 'livreur1',
      };
    },
    methods: {
      submitCommand() {
        // Vous pouvez traiter les valeurs sélectionnées ici
        console.log('Client sélectionné:', this.selectedClient);
        console.log('Livreur sélectionné:', this.selectedLivreur);
        this.$router.push('/home');
    },
    },
  };
  </script>
