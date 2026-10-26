import { Rule, defineConfig } from "html-validate";

// A self-closing layout renders the page content after `</html>`.
// Chromium silently moves it back inside, so the tests can't see it.
class SingleRoot extends Rule {
  setup() {
    this.on("dom:ready", ({ document }) => {
      for (const element of document.root.childElements.slice(1)) {
        this.report(element, `<${element.tagName}> is outside <html>`);
      }
    });
  }
}

export default defineConfig({
  plugins: [{ name: "local", rules: { "local/single-root": SingleRoot } }],
  extends: ["html-validate:recommended"],
  rules: {
    "local/single-root": "error",
    // A bare "&" before a space is valid HTML5; relaxed still flags ambiguous ampersands.
    "no-raw-characters": ["error", { relaxed: true }],
    // Shiki colours code tokens with style attributes.
    "no-inline-style": "off",
  },
});
