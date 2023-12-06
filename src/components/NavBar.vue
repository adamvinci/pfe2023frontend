<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-orange-pastel">
    <div class="container">
      <router-link to="/">
        <img src="/src/assets/snappies-logo.webp" alt="Logo Mon Site" class="navbar-brand logo-navbar" loading="lazy">
      </router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/home">Mes livraisons</router-link>
          </li>
          <li class="nav-item" v-if="isAdmin">
            <router-link class="nav-link" to="/">Liste Livreurs</router-link>
          </li>
          <li class="nav-item" v-if="isAdmin">
            <router-link class="nav-link" to="/">Liste Clients</router-link>
          </li>
          <li class="nav-item" v-if="isAdmin">
            <router-link class="nav-link" to="/addLivreur">Ajouter Livreur</router-link>
          </li>
          <li class="nav-item" v-if="isAdmin">
            <router-link class="nav-link" to="/addClient">Ajouter Client</router-link>
          </li>
          <li class="nav-item" v-if="isAdmin">
            <router-link class="nav-link" to="/assigner">Assigner commande</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isAdmin: true, //Remplacer Backend
    };
  },
};
</script>

<style scoped>
.bg-orange-pastel {
  background-color: #bd83da33;
}

.logo-navbar {
  width: 50px;
  height: auto;
}
.navbar-nav .nav-item {
  color: #ffcc00; 
  font-weight: bold; 
  border: 1px solid black; 
  border-radius: 5px; 
  margin-right: 10px;
}
</style>
