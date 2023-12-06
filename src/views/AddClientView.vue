<template>
  <div class="addClient">
    <h1> Ajouter Client </h1>
    Nom<input type="text" v-model="nom" placeholder="Les Bisounours"/>
    Ville<input type="text" v-model="ville" placeholder="Bruxelles"/>
    Adresse<input type="text" v-model="adresse" placeholder="Rue de bruxelles"/>
    Numero Adresse<input type="number" v-model="numAdresse" placeholder="1"/>
    Téléphone<input type="number" v-model="numTel" placeholder="0487014343"/>
    <Bouton @click="ajouterCommande"> Ajouter  </Bouton>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';  // Assurez-vous d'importer depuis 'vue-router' ici
import Bouton from '@/components/Bouton.vue';

const $router = useRouter();

const nom = ref('');
const ville = ref('');
const adresse = ref('');
const numAdresse = ref('');
const numTel = ref('');

const ajouterCommande = () => {
  $router.push('/addCommand');
};
</script>



<style scoped>
/* AddClientView*/
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
  margin-top: 4rem;
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

.addClient h1 {
  font-size: 24px; /* Vous pouvez ajuster la taille selon vos préférences */
  margin: auto;
  text-align: center;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 20px;
  text-shadow: 4px 3px 0px #fff, 9px 8px 0px rgba(0, 0, 0, 0.15);
}
</style>
