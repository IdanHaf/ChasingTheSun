import Ajv from "ajv";
const ajv = new Ajv();

const objective_schema = {
  type: "object",
  properties: {
    description: { type: "string" },
    info: {
      type: "array",
      items: { 
        type: "object", 
        properties: {
          lng: { type: "number" },
          lat: { type: "number" },
          zoom: { type: "number" },
          yRatio: { type: "number" },
          xRatio: { type: "number" },
          pitch: { type: "number" },
          heading: { type: "number" },
          labelH: { type: "number" },
          labelW: { type: "number" },
        },
        required: ["lng", "lat", "zoom", "yRatio", "xRatio", "pitch", "heading", "labelH", "labelW"], 
      },
    },
  },
  required: ["description", "info"],
  additionalProperties: false,
};

export { objective_schema };