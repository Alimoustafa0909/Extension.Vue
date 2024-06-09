<template>
  <section></section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import swal from 'sweetalert2';


onMounted(() => {
  // Listen for messages from the background script
  handleOperations();
 
});


// 4-He Try to detect if there is any form on the page or not and after that he send message to the background
const detectForms = () => {
  const forms = document.querySelectorAll('form');
  if (forms.length > 0) {
    chrome.runtime.sendMessage({ action: 'form_detected' });
  } else {
    chrome.runtime.sendMessage({ action: 'no_form_detected' });
  }
};


//3- after the start activity function send to the content script  'detecting' he fire the detectForm() function
function handleOperations () {
  chrome.runtime.onMessage.addListener((message) => {
    if(message.action === 'detecting') {

      console.log('helllllo')
      detectForms();
    }

    //6- he listens for the background if he should display an image or quote ?
    if (message.type === 'quote') {
      // Display the quote using SweetAlert2
      swal.fire({
        title: 'Random Quote',
        text: message.content,
        icon: 'info',
      });
    } else if (message.type === 'image') {
      // Display the image URL using SweetAlert2
      swal.fire({
        title: 'Random Image',
        imageUrl: message.url,
        imageAlt: 'Random Image',
      });
    }
  });

}

</script>

<style >
/* Add any styles you need for this component */
</style>
