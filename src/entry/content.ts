import { createApp } from 'vue';
import ContentScript from '../view/ContentScript.vue';


const mountterm = document.createElement('section');
document.body.appendChild(mountterm);
mountterm.id ="form-finder"

createApp(ContentScript).mount("#form-finder");
