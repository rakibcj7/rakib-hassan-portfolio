import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Top from "./containers/topbutton/Top";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  }))
});

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("does not crash on scroll after the top button unmounts", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Top />, div);
  ReactDOM.unmountComponentAtNode(div);

  expect(() => window.dispatchEvent(new Event("scroll"))).not.toThrow();
});
