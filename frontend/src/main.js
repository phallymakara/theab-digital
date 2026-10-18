import './styles/main.css';
import { AppController } from './controllers/AppController.js';

document.addEventListener('DOMContentLoaded', () => {
  const app = new AppController();
  app.init().catch((err) => {
    console.error('Failed to initialize Digital Theab App:', err);
  });
});
