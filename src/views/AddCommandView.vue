<template>
   <div class="addCommand">
    <form @submit.prevent="submitCommand">
      <div class="table-container">
        <h1>Ajouter Commande</h1>

        <label for="day">Jour de la semaine :</label>
        <select v-model="selectedDay" id="day">
          <option value="lundi">Lundi</option>
          <option value="mardi">Mardi</option>
          <option value="mercredi">Mercredi</option>
          <option value="jeudi">Jeudi</option>
          <option value="vendredi">Vendredi</option>
          <option value="samedi">Samedi</option>
          <option value="dimanche">Dimanche</option>
        </select>

        <table id="table">
          <thead>
            <tr>
              <th>Article</th>
              <th>Quantité</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Langes</td>
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
          </tbody>
        </table>
        <button id="boutonId" type="submit" @click="submitCommand">Ajouter</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'addCommand',
  data() {
    return {
      langesQuantity: 0,
      insertsQuantity: 0,
      sacsQuantity: 0,
      gantsQuantity: 0,
      selectedDay: 'lundi', // Valeur par défaut
    };
  },
  methods: {
    submitCommand() {
      // Vous pouvez traiter les quantités et le jour ici
      console.log('Jour de la semaine:', this.selectedDay);
      console.log('Langes:', this.langesQuantity);
      console.log('Inserts:', this.insertsQuantity);
      console.log('Sacs:', this.sacsQuantity);
      console.log('Gants:', this.gantsQuantity);

      // Rediriger vers /home
      this.$router.push('/home');
    },
  },
};
  </script>
