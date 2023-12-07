<template>
  <div class="page-container">
    <div class="table-container" id="homeView">
      <div class="table-wrapper" id="homeViewDiv">
        <table id="tableHomeView">
          <thead>
            <tr>
              <th class="hidden-id">Hidden ID</th>
              <th>Client</th>
              <th>Num tel</th>
              <th>Adresse</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(livraison, index) in livraisons.creches" :key="index">
              <td class="hidden-id">{{ livraison.id }}</td>
              <td>{{ livraison.nom }}</td>
              <td>{{ livraison.gsm }}</td>
              <td>{{ livraison.adresse }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const livraisons = ref({});
const accessToken = localStorage.getItem('accessToken');

const fetchData = async () => {
  try {
    const response = await fetch('/api/creches', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    if (response.ok) {
      livraisons.value = await response.json();
      console.log('Livraisons data:', livraisons.value);
    } else {
      console.error('Error fetching data:', response.status);
    }
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.hidden-id {
  display: none;
}

#homeView {
  overflow: auto;
  margin-bottom: 20px;
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

#homeViewDiv {
  border: 2px solid #ddd;
  padding: 20px;
  border-radius: 10px;
}

#tableHomeView {
  width: 100%;
  border-collapse: collapse;
}

#tableHomeView th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

#tableHomeView th {
  background-color: #f2f2f2;
}
</style>
