import { html, render } from "lit-html";
import "./to-do-item.js";

class TodoApp extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this.$input = this._shadowRoot.querySelector("input");
    render(this.template(), this._shadowRoot, { eventContext: this });
  }

  template() {
    return html`
      <style>
        :host {
          display: block;
          font-family: sans-serif;
          text-align: center;
        }
        button {
          border: none;
          cursor: pointer;
          background-color: Transparent;
        }
        ul {
          list-style: none;
          padding: 0;
        }
      </style>
      <h3>Web component with lit-html</h3>
      <br />
      <h1>TODO App In Lit-html</h1>
      <form id="todo-input">
        <input type="text" placeholder="Add your Todo" />
        <button>Add</button>
      </form>
    `;
  }

  set todos(value) {
    this._todos = value;
    render(this.template(), this._shadowRoot, { eventContext: this });
  }

  get todos() {
    return this._todos;
  }
}

window.customElements.define("to-do-app", TodoApp);
