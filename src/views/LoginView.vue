<template>
  <div class="login">
    <img src="../assets/snappies-logo.webp" alt="Login Image" class="login-image" />

    <h1>Login Page</h1>
    <input type="text" v-model="nom" placeholder="nom" />
    <input type="password" v-model="password" placeholder="*****" />
    <div>
      <a href="#" @click="forgotPasswordHandler">Mot de passe oublié?</a>
    </div>
    <div>
      <Bouton id="button" @click="login">Login</Bouton>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Bouton from '@/components/Bouton.vue';
import swal from 'sweetalert2';
const Swal = ref(swal);
const nom = ref('');
const password = ref('');
const $router = useRouter();
const accessToken = ref('');
const accessUser = ref('');
const forgotPasswordHandler = async async => {
  const { value: email } = await Swal.value.fire({
    title: "Input email address",
    input: "email",
    inputLabel: "Your email address",
    inputPlaceholder: "Enter your email address"
  });
  const response = await fetch(`${process.env.VUE_APP_BASEURL}/auth/resetPasswordAdmin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });
  const responseData = await response.json();
  if (response.ok) {
    Swal.value.fire({
      icon: "success",
      title: "Success",
      html: `${responseData.message}`,
      timer: 1500,
    });

  } else {
    const errorMessages = (responseData.errors || []).map(element => element.message).join('<br>');

    Swal.value.fire({
      icon: "error",
      title: "Oops...",
      html: errorMessages || responseData.message || responseData.error || 'An unknown error occurred',
    });
  }
}
const login = async () => {
  try {
    const response = await fetch(`${process.env.VUE_APP_BASEURL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nom: nom.value,
        password: password.value,
      }),
    });

    if (response.ok) {
      const data = await response.json();

      accessToken.value = data.token.token;

      accessUser.value = data.user;


      // Stocke le token dans le localStorage
      localStorage.setItem('accessToken', accessToken.value);
      localStorage.setItem('user', JSON.stringify(accessUser.value));

      $router.push('/home');
    } else {

      const errorData = await response.json();
      const errorMessages = (errorData.errors || []).map(element => element.message).join('<br>');

      Swal.value.fire({
        icon: "error",
        title: "Oops...",
        html: errorMessages || errorData.message || errorData.error || 'An unknown error occurred',
      });
    }
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
  }
};
</script>
<style scoped>

body {
  font-family: 'Arial', sans-serif;
  background-color: #E1DAFB;
}

.error-message {
  color: red;
  font-size: 14px;
  margin-top: 10px;
}

.login {

  width: 80%;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background: white;
  margin-top: 8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.login h1 {
  font-size: 20px;
  margin-bottom: 20px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-shadow: 2px 1px 0px #fff, 4px 3px 0px rgba(0, 0, 0, 0.15);
  text-align: center;
}

.login input {
  width: 100%;
  height: 40px;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-sizing: border-box;
  background-color: #F6BA4E;
  opacity: 0.6;
}

.login input[type="checkbox"] {
  width: 16px;
  height: 16px;
}

.login label {
  font-size: 14px;
  margin-left: 5px;
}

#button {
  margin-top: 20px;
  width: 200px;
}
</style>
