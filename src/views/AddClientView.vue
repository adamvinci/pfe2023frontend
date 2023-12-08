<template>
  <div class="addClient">
    <h1> Ajouter Client </h1>
    Nom<input type="text" v-model="nom" placeholder="Les Bisounours"/>
    Adresse<input type="text" v-model="adresse" placeholder="Rue de Bruxelles"/>
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
/* AddClientView */
.addClient {
  display: flex; 
  flex-direction: column;
  align-items: center;
  width: 90%; /* Ajustement de la largeur pour les smartphones */
  margin: auto;
  text-align: center;
  padding: 20px; /* Ajustement de l'espace intérieur pour les smartphones */
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background: #E1DAFB;
  margin-top: 2rem;
}

.addClient input {
  width: 100%; /* Remplir la largeur pour les smartphones */
  height: 40px;
  padding: 10px; /* Ajustement de la taille du padding pour les smartphones */
  margin-bottom: 10px; /* Espace entre les champs pour les smartphones */
  border: 1px solid #ddd;
  border-radius: 15px;
  box-sizing: border-box;
  background-color: #D3CAF6;
  text-align: center;
}

.addClient h1 {
  font-size: 20px; /* Ajustement de la taille de la police pour les smartphones */
  margin: auto;
  text-align: center;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 10px; /* Réduction de la marge en bas pour les smartphones */
  text-shadow: 4px 3px 0px #fff, 9px 8px 0px rgba(0, 0, 0, 0.15);
}

@media only screen and (max-width: 600px) {
  /* Ajustements spécifiques pour les smartphones */
  .addClient input {
    padding: 8px; /* Ajustement de la taille du padding pour les smartphones */
  }

  .addClient h1 {
    font-size: 18px; /* Ajustement de la taille de la police pour les smartphones */
    margin-bottom: 8px; /* Réduction de la marge en bas pour les smartphones */
  }
}

</style>
