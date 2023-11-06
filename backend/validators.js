import { createRequire } from "module";
const require = createRequire(import.meta.url);
var validator = require("is-my-json-valid");

const objective_validator = validator({
  type: "object",
  required: true,
  properties: {
    description: {
      type: "string",
      required: true,
    },
    lng: {
      type: "number",
      required: true,
    },
    lat: {
      type: "number",
      required: true,
    },
    zoom: {
      type: "number",
      required: true,
    },
    yRatio: {
      type: "number",
      required: true,
    },
    xRatio: {
      type: "number",
      required: true,
    },
    pitch: {
      type: "number",
      required: true,
    },
    heading: {
      type: "number",
      required: true,
    },
    labelH: {
      type: "number",
      required: true,
    },
    labelW: {
      type: "number",
      required: true,
    },
  },
});

export { objective_validator };
