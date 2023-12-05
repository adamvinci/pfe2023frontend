<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-orange-pastel">
    <div class="container">
      <router-link to="/">
        <!-- Ajoute une classe à l'image pour styliser -->
        <img src="/src/assets/Snappies-removebg-preview.png" alt="Logo Mon Site" class="navbar-brand logo-navbar">
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
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  // Composant de la navbar
}
</script>

<style scoped>
/* Ajoute ici des styles personnalisés si nécessaire */

/* Couleur orange pastel très claire */
.bg-orange-pastel {
  background-color: rgba(255, 165, 0, 0.2); /* Ajuste l'opacité selon tes préférences */
}

/* Style pour réduire la taille du logo */
.logo-navbar {
  width: 50px; /* Ajuste la taille selon tes besoins */
  height: auto; /* Maintient le rapport hauteur-largeur */
}
</style>
