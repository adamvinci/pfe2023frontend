<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-orange-pastel">
    <div class="container">
      <div class="d-flex align-items-center"> <!-- Utilisation de flexbox pour aligner les éléments horizontalement -->
        <!-- "Mes livraisons" à gauche -->
        <router-link to="/home" class="navbar-brand">
          <img src="/src/assets/snappies-logo.webp" alt="Logo Mon Site" class="logo-navbar" loading="lazy">
          Mes livraisons
        </router-link>
        </div>

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

      <div class="collapse navbar-collapse justify-content-end" id="navbarNav"> <!-- Utilisation de justify-content-end pour aligner à droite -->
        <ul class="navbar-nav">
          <li class="nav-item" v-if="isAdmin">
            <router-link class="nav-link" to="/alldelivers">Liste Livreurs</router-link>
          </li>
          <li class="nav-item" v-if="isAdmin">
            <router-link class="nav-link" to="/allclients">Liste Clients</router-link>
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
          <li class="nav-item">
            <router-link class="nav-link" to="/tournees"> tournees</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/" @click="logout">Se déconnecter</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
let savedUser = false;

// Vérifie si 'user' existe dans le local storage
const storedUser = localStorage.getItem('user');

if (storedUser) {
  const parsedUser = JSON.parse(storedUser);

  // Vérifie si 'is_admin' existe dans l'objet parsé
  if (parsedUser.is_admin !== undefined) {
    savedUser = parsedUser.is_admin;
  }
}
export default {
  data() {
    return {
      user: JSON.parse(localStorage.getItem('user')) || {},
      isAdmin: savedUser,
    };
  },
  watch: {
    // Utilise un watcher pour détecter les changements dans la route
    $route(to, from) {
      this.updateUserStatus();
    },
  },
  methods: {
    logout() {
      console.log('Déconnexion en cours...');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      this.isAdmin = false;
      this.$router.push('/');
      console.log('Utilisateur déconnecté. Redirection vers la page d\'accueil.');
    },
    updateUserStatus() {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        this.isAdmin = parsedUser.is_admin || false;
      }
    },
  },
  created() {
    this.updateUserStatus();
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
  margin-right: 10px;
}
</style>