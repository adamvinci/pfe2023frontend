<template>
    <div class="addLivreur">
      <h1> Ajouter un Livreur </h1>
        Nom<input type="text" v-model="nom" placeholder="Michel"/>
        Mot de passe<input type="password" v-model="password" placeholder="*****"/>
        <Bouton @click="ajouterLivreur"> Ajouter </Bouton>
    </div>
  </template>
  
  <script>
  import Bouton from '@/components/Bouton.vue';

export default {
  name: 'AddLivreurView',
  components: {
    Bouton,
  },
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