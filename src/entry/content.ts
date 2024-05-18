import { createApp } from 'vue';
import ContentScript from '../view/ContentScript.vue';

// Create a new div element to mount our Vue component
const mountElement = document.createElement('div');
mountElement.id ="FormFinder"
document.body.appendChild(mountElement);

// Create and mount the Vue app
createApp(ContentScript).mount(mountElement);
