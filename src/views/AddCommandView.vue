<template>
    <div class="addCommand">
  
      <form @submit.prevent="submitCommand">
        <div class="table-container1">
         <h1>Ajouter Commande</h1>

          <table>
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
          <button type="submit">Ajouter</button>
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
      };
    },
    methods: {
      submitCommand() {
        // Vous pouvez traiter les quantités ici
        console.log('Langes:', this.langesQuantity);
        console.log('Inserts:', this.insertsQuantity);
        console.log('Sacs:', this.sacsQuantity);
        console.log('Gants:', this.gantsQuantity);
  
        // Réinitialiser les quantités après la soumission
        this.langesQuantity = 0;
        this.insertsQuantity = 0;
        this.sacsQuantity = 0;
        this.gantsQuantity = 0;
      },
    },
  };
  </script>
  
  <style>
 
  
  .table-container1 {
    overflow: auto;
    margin-bottom: 20px;
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
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 10px;
  }
  
  table, th, td {
    border: 1px solid #ddd;
  }
  
  th, td {
    padding: 10px;
    text-align: center;
  }
  .table-container1 button {
      width: 50%;
      height: 40px;
      border: 1px solid #C4B4FD;
      background: #B09CFB;
      color: #fff;
      cursor: pointer;
      border-radius: 3px;
      border-radius: 15px;
  }
  </style>
  