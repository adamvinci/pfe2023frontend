<template>
    <div class="addClient">
      <h1> Ajouter Client </h1>
      Nom<input type="text" v-model="nom" placeholder="Les Bisounours"/>
      Ville<input type="text" v-model="ville" placeholder="Bruxelles"/>
      Adresse<input type="text" v-model="adresse" placeholder="Rue de bruxelles"/>
      Numero Adresse<input type="number" v-model="numAdresse" placeholder="1"/>
      Téléphone<input type="number" v-model="numTel" placeholder="0487014343"/>
      <button v-on:click="ajouterCommande"> Ajouter </button>
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
  
<style>
  
  body {
      background-image: url("../assets/pexels.jpg");
  }
  
  .addClient {
      display: flex; 
      flex-direction: column;
      align-items: center;
      width: 40%;
      margin: auto;
      text-align: center;
      padding: 50px;
      border: 1px solid #ccc;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      background: #E1DAFB;
  }
  
  .addClient input {
      width: 70%;
      height: 40px;
      padding: 20px;
      margin-bottom: 20px;
      border: 1px solid #ddd;
      border-radius: 15px;
      box-sizing: border-box;
      background-color: #D3CAF6;
      text-align: center;
      
  }
  
  .addClient button {
      width: 50%;
      height: 40px;
      border: 1px solid #C4B4FD;
      background: #B09CFB;
      color: #fff;
      cursor: pointer;
      border-radius: 3px;
      border-radius: 15px;
  
  }
  
  .addClient button:hover {
      background: #735DC6;
  }
  
  h1 {
      width: 320px;
      margin: auto;
      text-align: center;
      font-size: 36px;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 2px;
      margin-bottom: 20px;
      text-shadow: 4px 3px 0px #fff, 9px 8px 0px rgba(0, 0, 0, 0.15);
  }
</style>
    