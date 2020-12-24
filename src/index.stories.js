import "./index.js";
import { html } from "lit-html";

export default {
  parameters: {
    layout: "centered",
  },
};

function showSnackbar() {
  document.querySelector('league-snackbar').show();
}

function onAction() {
  console.log("Undo Clicked");
}

export const story1 = () => html`
  <button @click=${showSnackbar}>Show Snackbar</button> 
  <league-snackbar action="Undo" @action=${onAction}>Your thing has been done.</league-snackbar> `;
