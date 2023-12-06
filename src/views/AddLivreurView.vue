<template>
    <div class="addLivreur">
      <h1> Ajouter un Livreur </h1>
        Nom<input type="text" v-model="nom" placeholder="Michel"/>
        Mot de passe<input type="password" v-model="password" placeholder="*****"/>
        <button id="boutonId" v-on:click="ajouterLivreur"> Ajouter </button>
    </div>
  </template>
  
  <script>
export default {
  name: 'AddLivreurView',
  data() {
    return {
      nom: '',
      password: '',
    };
  },
  methods: {
    async ajouterLivreur() {
          this.$router.push('/');
    }   
}     
};
</script>