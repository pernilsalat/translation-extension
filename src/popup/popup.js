import { setupSelect } from './helpers/setupSelect.js';
import { setupSwitch } from './helpers/setupSwitch.js';

let select = document.getElementById('language-selector');
let switchElement = document.getElementById('switch');

setupSelect(select);
setupSwitch(switchElement);
