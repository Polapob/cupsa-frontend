<script setup lang="ts"></script>
<template>
  <div class="loader flex items-center justify-center"></div>
</template>
<style>
.loader::after {
  content: "";
  width: 150px;
  height: 150px;
  border: 15px solid #dddddd;
  border-top-color: #009578;
  border-radius: 50%;
  animation: loading 1s linear infinite;
}

@keyframes loading {
  from {
    transform: rotate(0turn);
  }
  to {
    transform: rotate(1turn);
  }
}
</style>
