import { promises as fs } from "node:fs";
import { pdf } from "pdf-to-img";

// https://www.npmjs.com/package/pdf-to-img
async function main() {
  let counter = 1;
  const document = await pdf("example.pdf", { scale: 3 });
  for await (const image of document) {
    await fs.writeFile(`page${counter}.png`, image);
    counter++;
  }


  // you can also read a specific page number:
  const page12buffer = await document.getPage(12)
}
main();
