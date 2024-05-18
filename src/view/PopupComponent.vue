<template>
  <div class="main_app">
    <button @click="startActivity">Start Activity</button>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

const startActivity = () => {
  // Send message to content script to start activity
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0].id !== undefined) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'start_activity' });
    }
  });
};

// You can use onMounted if you need to perform any setup when the component is mounted
onMounted(() => {
  // Perform any setup if necessary
});
</script>

<style>
body {
  width: 200px;
  height: 100px;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
