import { marked } from "marked";

const markdown = (text) => {
  return marked.parse(text);
};

export { markdown };
