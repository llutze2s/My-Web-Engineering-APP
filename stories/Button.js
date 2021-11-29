import { html } from 'lit-html';
import './button.css';

/**
 * Primary UI component for user interaction
 */
export const Button = ({ label }) => {
  return html`
        <title>Einkaufsliste</title>
        <script type="module" src="../Übungen/Assets/8.Modular/modul_einkaufsliste.js"></script>
        <einkaufs-liste></einkaufs-liste>
  `;
};
