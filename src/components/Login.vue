<template>
<div class="login">
    <h1> Login Page </h1>
    <input type="text" v-model="email" placeholder="nom@hotmail.com"/>
    <input type="password" v-model="password" placeholder="*****"/>
    <button v-on:click="login"> Login </button>
  
</div>


</template>
<script>
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    login() {
      this.$router.push('/home');
    },
  },
};
</script>

<style>
body{
    background-image: url("../assets/pexels.jpg");
}
.login {
    width: 60%;
    margin: auto;
    text-align: center;
    padding: 50px; 
    border: 1px solid #ccc;
    border-radius: 5px; 
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background: #E1DAFB;
}

.login input {
    width: 100%;
    height: 40px;
    padding: 10px; 
    margin-bottom: 20px;
    border: 1px solid #ddd;
    border-radius: 3px;
    box-sizing: border-box;
    background-color: #D3CAF6;
}

.login button {
    width: 100%;
    height: 40px;
    border: 1px solid #C4B4FD;
    background: #B09CFB;
    color: #fff;
    cursor: pointer;
    border-radius: 3px;
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
	text-shadow: 4px 3px 0px #fff, 9px 8px 0px rgba(0,0,0,0.15);
    
}
</style>
