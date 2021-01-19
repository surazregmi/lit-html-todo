import { html, render } from "lit-html";
import "./to-do-item.js";

class TodoApp extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });

    // render(this.template(), this._shadowRoot, { eventContext: this });
    this.todos = [{ text: "Learn about Lit-html", checked: true }];
    this.$input = this._shadowRoot.querySelector("input");
    // make sure you maintain order...if input is declared above todos it will throw error.
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
        <button @click=${this._addTodo}>Add</button>
      </form>
      <ul id="todos">
        ${this.todos.map(
          (todo, index) => html`
            <to-do-item
              ?checked=${todo.checked}
              .index=${index}
              text=${todo.text}
              @onRemove=${this._removeTodo}
              @onToggle=${this._toggleTodo}
            ></to-do-item>
          `
        )}
      </ul>
    `;
  }

  _addTodo(e) {
    // preventDefault cancels the event if it is cancelable.
    // for eg : Clicking on a "Submit" button, prevent it from submitting a form
    e.preventDefault();
    if (this.$input.value.length > 0) {
      // ... spread operator used as bracket eraser ..this line is just like pushing element into array.
      this.todos = [...this.todos, { text: this.$input.value, checked: false }];
      this.$input.value = "";
    }
    console.log(this.todos);
  }

  _removeTodo(e) {
    // index to be removed comes from custom event (e) and filter returns todos where
    // index is not equal to index of deleted todo.
    this.todos = this.todos.filter((todo, index) => {
      return index !== e.detail;
    });
  }

  _toggleTodo(e) {
    this.todos = this.todos.map((todo, index) => {
      return index === e.detail ? { ...todo, checked: !todo.checked } : todo;
    });
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
