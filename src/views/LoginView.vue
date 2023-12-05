<template>
  <div class="login">
    <h1> Login Page </h1>
    <input type="text" v-model="email" placeholder="nom@hotmail.com"/>
    <input type="password" v-model="password" placeholder="*****"/>
    <button v-on:click="login"> Login </button>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '', // Ajout d'une propriété pour stocker le message d'erreur
    };
  },
  methods: {
    async login() {
      try {
        const response = await fetch('http://localhost:3333/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          mode: 'cors',  
          body: JSON.stringify({
            email: this.email,
            password: this.password,
          }),
        });

        if (response.ok) {
          this.$router.push('/home');
        } else {
          // Affichage du message d'erreur
          this.errorMessage = 'La connexion a échoué. Vérifiez vos identifiants.';
          console.error('Erreur lors de la connexion:', response.status);
        }
      } catch (error) {
        // Affichage du message d'erreur
        this.errorMessage = 'Erreur lors de la connexion. Veuillez réessayer.';
        console.error('Erreur lors de la connexion:', error);
      }
    },
  },
};
</script>

  <style>
  .error-message {
  color: red;
  font-size: 14px;
  margin-top: 10px;
}
  body {
      background-image: url("../assets/pexels.jpg");
  }
  
  .login {
      display: flex; 
      flex-direction: column;
      align-items: center;
      width: 60%;
      margin: auto;
      text-align: center;
      padding: 50px;
      border: 1px solid #ccc;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      background: #E1DAFB;
  }
  
  .login input {
      width: 100%;
      height: 40px;
      padding: 10px;
      margin-bottom: 20px;
      border: 1px solid #ddd;
      border-radius: 15px;
      box-sizing: border-box;
      background-color: #D3CAF6;
      
  }
  
  .login button {
      width: 50%;
      height: 40px;
      border: 1px solid #C4B4FD;
      background: #B09CFB;
      color: #fff;
      cursor: pointer;
      border-radius: 3px;
      border-radius: 15px;
  
  }
  
  .login button:hover {
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
  