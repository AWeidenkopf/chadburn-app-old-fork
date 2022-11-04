import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import dialUrl from "www/assets/rotating-dial.svg";

@customElement("rotating-dial")
export class RotatingDial extends LitElement {
  @property()
  rotation: number = 0;

  _isRotating: boolean = false;
  _mouseStart: [number, number] = [0, 0];

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("mousemove", this._handleMouseMove);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("mousemove", this._handleMouseMove);
  }

  _mouseDown(event: MouseEvent) {
    this._isRotating = true;
    this._mouseStart = [event.clientX, event.clientY];
  }

  _mouseUp() {
    this._isRotating = false;
  }

  _handleMouseMove(event: MouseEvent) {
    if (this._isRotating) {
    }
  }

  render() {
    return html`<img
      @mousedown="${this._mouseDown}"
      @mouseup="${this._mouseUp}"
      src="${dialUrl}"
      style="transform: rotate(${this.rotation}turn)"
    />`;
  }
}
