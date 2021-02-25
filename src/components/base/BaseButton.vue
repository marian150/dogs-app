<template>
  <button>
    <slot></slot>
  </button>
</template>

<style scoped>
button {
  height: 3rem;
  width: 5rem;
  margin: 0 2rem;
  align-self: center;
  background-color: white;
  border: none;
  border-bottom: 1px solid black;
  font-size: 1.2rem;
  transition: 0.3s;
}
button:hover {
  background-color: #a3f3eb;
  border: 1px solid black;
  border-radius: 1.5rem;
  cursor: pointer;
  box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
}
</style>
