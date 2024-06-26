import { renderToString } from "./test/end-to-end/hydrate/index.mjs";

export class CarData {
  constructor(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
  }
}


const vento = new CarData('VW', 'Vento', 2024);
const beetle = new CarData('VW', 'Beetle', 2023);

const doc = await renderToString(`
  <html>
    <head>
      <title>End To End</title>
      <script type="module" src="./test/end-to-end/dist/endtoend/endtoend.esm.js"></script>
    </head>
    <body>
      <prerender-cmp></prerender-cmp>
      <slot-cmp></slot-cmp>
      <another-car-list cars=${JSON.stringify([vento, beetle])}></another-car-list>
    </body>
  </html>
`, {
  prettyHtml: true
});

console.log(doc.html);
