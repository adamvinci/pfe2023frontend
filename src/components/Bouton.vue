<template>
    <button class="custom-button" @click="$emit('click')">
      <slot></slot>
    </button>
  </template>
    
  <style scoped>
  .custom-button {
    width: 50%;
    height: 40px;
    border: 1px solid black;
    background: #F6BA4E;
    color: #fff;
    cursor: pointer;
    border-radius: 3px;
    border-radius: 15px;
  }
  
  .custom-button:hover {
    background: #f0c300;
  }
  </style>
  