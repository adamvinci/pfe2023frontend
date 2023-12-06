<template>
    <div class="addClient">
      <h1> Ajouter Client </h1>
      Nom<input type="text" v-model="nom" placeholder="Les Bisounours"/>
      Ville<input type="text" v-model="ville" placeholder="Bruxelles"/>
      Adresse<input type="text" v-model="adresse" placeholder="Rue de bruxelles"/>
      Numero Adresse<input type="number" v-model="numAdresse" placeholder="1"/>
      Téléphone<input type="number" v-model="numTel" placeholder="0487014343"/>
      <button id="boutonId" v-on:click="ajouterCommande"> Ajouter </button>
    </div>
  </template>
  
  <script>
export default {
  name: 'AddClientView',
  data() {
    return {
      nom: '',
      ville: '',
      adresse: '',
      numAdresse: '',
      numTel: '',
    };
  },
  methods: {
    async ajouterCommande() {
          this.$router.push('/addCommand');
    }   
}     
};
</script>
    