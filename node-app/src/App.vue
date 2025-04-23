<template>
 <RouterView />
</template>


<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>


<style>
html {
  scroll-behavior: smooth;
}
body {
  margin: 0;
  padding: 0;
  max-width: 100%;
  font-family:
    Inter,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    'Fira Sans',
    'Droid Sans',
    'Helvetica Neue',
    sans-serif;
  font-size: 14px;
}

main{
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100;
}

img {
    width: 200px;
}

nav {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.name {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
}

.content{
    display: flex;
    flex-direction: row;
}

.auth{
  display: flex;
  flex-direction: column;
  text-align: left;
  background-color: #f2f2f2;
  width: 100%;
}

@media (max-width: 600px) {
  body {
    display: flex;
    flex-direction: column;
    place-items: center;
  }

  #app {
    display: flex;
    flex-direction: column;
    padding: 0 2rem;
  }

  .header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    
    }

    .content{
    display: flex;
    flex-direction: column;
    justify-content: center;
    }


    .left{
        width: 100%;
    }
    .right{
        width: 100%;
    }
}

</style>
