import React from "react";
import Button from "./components/Button";
import Li from "./components/Li";
import P from "./components/P";
import Div from "./components/Div";
import Checkbox from "./components/Checkbox";
import Input from "./components/Input";
import Select from "./components/Select";
import Header from "./components/Header";

const Components = {
  button : Button,
  li : Li,
  p : P,
  div : Div,
  checkbox : Checkbox,
  input: Input,
  select: Select,
  h1: Header
};

// This function is used to actually create components based of the JSON representation of it.

// eslint-disable-next-line
export default (block,socket) => {
  if (typeof Components[block.component] !== "undefined") {
    return React.createElement(Components[block.component], {
      key: block._uid,
      block: block,
      socket: socket
    });
  }
  return React.createElement(
    () => <div>The component {block.component} has not been created yet.</div>,
    { key: block._uid }
  );
};

