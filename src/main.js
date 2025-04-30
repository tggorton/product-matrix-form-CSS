// Remove individual SMUI style imports
// import '@smui/select/style.scss';
// import '@smui/radio/style.scss';
// import '@smui/form-field/style.scss';
// import '@smui/button/style.scss';
// import '@smui/list/style.scss';

// Remove the centralized SMUI SCSS file import
// import './smui.scss';

import App from './App.svelte';
import { mount } from 'svelte';

const app = mount(App, {
  target: document.getElementById('app')
});

export default app;
