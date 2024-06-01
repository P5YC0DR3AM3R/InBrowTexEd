// Import methods to save and get data from the indexedDB database in './database.js'
import { getDb, putDb } from './database';
import { header } from './header';

export default class {
  constructor() {
    const localData = localStorage.getItem('content');

    // check if CodeMirror is loaded
    if (typeof CodeMirror === 'undefined') {
      throw new Error('CodeMirror is not loaded');
    }

    this.editor = CodeMirror(document.querySelector('#main'), {
      value: '',
      mode: 'javascript',
      theme: 'monokai',
      lineNumbers: true,
      lineWrapping: true,
      autofocus: true,
      indentUnit: 2,
      tabSize: 2,
    });

    // When the editor is ready, set the value to whatever is stored in indexeddb.
    // Fall back to localStorage if nothing is stored in indexeddb, and if neither is available, set the value to header.
    getDb().then((data) => {
      console.info('Loaded data from IndexedDB, injecting into editor');
      const storedData = data.length > 0 ? data[0].content : null;
      this.editor.setValue(storedData || localData || header);
    });

    this.editor.on('change', () => {
      localStorage.setItem('content', this.editor.getValue());
    });

    // Save the content of the editor when the editor itself loses focus
    this.editor.on('blur', () => {
      console.log('The editor has lost focus');
      putDb({ id: 1, content: localStorage.getItem('content') });
    });

    // // Check if the browser is online or offline
    // if (!navigator.onLine) {
    //   console.warn('You are currently offline. Some features may be unavailable.');
    //   // Handle offline functionality here
    //   // For example, you can display a message or disable certain features
    //   alert('You are currently offline. Some features may be unavailable.');
    // } else {
    //   console.log('You are online.');
    // }

    // window.addEventListener('offline', () => {
    //   console.warn('The browser is now offline.');
    //   alert('You have lost internet connection. Some features may be unavailable.');
    // });

    // window.addEventListener('online', () => {
    //   console.log('The browser is now online.');
    //   alert('You are back online.');
    // });
  }
}