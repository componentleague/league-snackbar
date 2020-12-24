import { LitElement, html, css } from "lit-element";
import { TemplateResult } from 'lit-html';

export class LeagueSnackbar extends LitElement {
  static properties = {
    open: { type: Boolean, reflect: true },
    timeout: { type: Number },
    layout: { type: String, reflect: true },
    action: { type: String, reflect: true },
    static: { type: Boolean, reflect: true }
  };

  static styles = css`
    :host {
      position: fixed;
      z-index: 999;
      transform: translate(0, 100%);
      border-radius: 3px;
      transition: all .3s ease;
      left: .75em;
      bottom: 0;
      display: flex;
      align-items: center;
      max-width: min(60ch, 90vw);
    }

    :host([open]) {
      background-color: var(--league-snackbar-background, #333);
      color: var(--league-snackbar-color, white);
      bottom: .75rem;
      transform: translate(0, 0);
    }

    :host([layout="right"]) {
      left: auto;
      right: .75em;
    }

    :host([layout="center"]) {
      left: 50%;
      transform: translate(-50%, 100%);
      bottom: 0;
    }

    :host([layout="center"][open]) {
      transform: translate(-50%, 0);
    }
    
    .action {
      display: block;
      color: var(--league-action-color, #8FA);
      text-transform: uppercase;
      padding: .75rem 1.5em;
      cursor: pointer;
    }

    .text {
      display: block;
      flex-grow: 1;
      padding: .75rem 1.5em;
    }

    .action:empty {
      display: none;
    }

    @media (max-width: 600px) {
      :host, :host([layout="right"]) {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        left: 50%;
        right: auto;
        transform: translate(-50%, 100%);
        bottom: 0;
      }

      :host([open]) {
        transform: translate(-50%, 0);
        bottom: 0;
      }
    }

    :host([static]) {
      transform: none;
      position: static;
      background-color: var(--league-snackbar-background, #333);
      color: var(--league-snackbar-color, white);
    }
  `;

  constructor() {
    super();
    this.open = false;
    this.timeout = 3;
    this.layout = "left";
    this.action = '';
    this.static = false;
  }

  show() {
    this.open = true;
    if (this.timeout > 0)
      this.ttl(this.timeout)
  }

  close() {
    clearTimeout(this._timeout);
    this.open = false;
  }

  ttl(seconds) {
    clearTimeout(this._timeout);
    this._timeout = setTimeout(() => this.close(), seconds * 1000);
  }

  onActionClick(e) {
    let evt = new CustomEvent('action', { bubbles: true });
    this.dispatchEvent(evt);
    this.close();
  }

  render() {
    return html`
      <span class="text"><slot></slot></span>
      <span class="action" @click=${this.onActionClick}>${this.action}</span>
    `;
  }
}

customElements.define("league-snackbar", LeagueSnackbar);

export function showSnackbar(content, options) {
  let snackbar = document.querySelector('league-snackbar');
  if (!snackbar) {
    snackbar = new LeagueSnackbar();
    document.body.appendChild(snackbar);
  }

  if (html instanceof TemplateResult) {
    render(snackbar, content)
  } else {
    snackbar.innerText = content;
  }

  snackbar.action = options.action;

  snackbar.open = true;
}