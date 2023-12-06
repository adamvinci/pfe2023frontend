<template>
    <button class="custom-button" @click="$emit('click')">
      <slot></slot>
    </button>
  </template>
    
  <style scoped>
  .custom-button {
    width: 50%;
    height: 40px;
    border: 1px solid #C4B4FD;
    background: #B09CFB;
    color: #fff;
    cursor: pointer;
    border-radius: 3px;
    border-radius: 15px;
  }
  
  .custom-button:hover {
    background: #735DC6;
  }
  </style>
  