import { createApp } from 'vue';
import ContentScript from '../view/ContentScript.vue';

// Create a new div element to mount our Vue component
const mountElement = document.createElement('div');
document.body.appendChild(mountElement);
mountElement.id ="form-finder"

// Create and mount the Vue app
createApp(ContentScript).mount("#form-finder");
