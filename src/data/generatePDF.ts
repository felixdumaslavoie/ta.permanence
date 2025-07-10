import { promises as fs } from "node:fs";
import { marked } from "marked";
import markedFootnote from "marked-footnote";
import matter from "gray-matter";
import htmlPdfNode from "html-pdf-node";
import { pdf } from "pdf-to-img";

const getDirectories = async (source) =>
  (await fs.readdir(source, { withFileTypes: true }))
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

const getFiles = async (source) =>
  (await fs.readdir(source, { withFileTypes: true }))
    .filter((dirent) => dirent.isFile())
    .map((dirent) => dirent.name);

export async function generatePDF() {
  const blogFolder = "./src/content/blog/";
  const pdfFolder = "./public/blog/pdf/";

  getDirectories(blogFolder).then((res) => {
    res.forEach((dossier) => {
      getFiles(`${blogFolder}${dossier}`).then((files) => {
        files.forEach((file) => {
          let split: string[] = file.split(".");

          if (split.at(split.length - 1) === "md") {
            //console.log(file)
            let corrected = split.pop();

            let fuse: string = "";
            if (corrected) {
              split.push(".pdf");
              split.forEach((fragment: string) => {
                fuse += fragment;
              });
              //console.log(`${pdfFolder}${dossier}/${fuse}`)

              writePDF(
                `${blogFolder}${dossier}/`,
                `${pdfFolder}${dossier}/`,
                file,
                fuse,
              );
            }
          }
        });
      });
    });
  });
}

async function writePDF(
  ancienDossier: string,
  nouveauDossier: string,
  oldName: string,
  fileName: string,
) {
  // Le page number commence à un :( !
  var writeFlag = false;

  fs.stat(`${nouveauDossier}${fileName}`).then((statDest) => {
    fs.stat(`${ancienDossier}${oldName}`).then((stat) => {
      const srcDate = stat.mtime;
      const destDate = statDest.mtime;

      if (destDate < srcDate) {
        writeFlag = true;
      }
    });
  }).catch((errDest) => {
    // Le fichier de destination n'existe pas
    if (errDest.code === "ENOENT") {
      writeFlag = true;
    } else {
      console.log("Erreur dans la lecture du fichier md. ");
    }
  }).finally(() => {
    convertMD2PDF(ancienDossier, nouveauDossier, oldName, fileName, writeFlag);
  });
}

async function convertMD2PDF(
  ancienDossier: string,
  nouveauDossier: string,
  oldName: string,
  fileName: string,
  writeFlag: boolean,
) {
  if (writeFlag) {
    //console.log(`${nouveauDossier}${fileName} ${ancienDossier}${oldName}`)

    fs.readFile(`${ancienDossier}${oldName}`, "utf8").then((rawData) => {
      let data = matter(rawData);

      let heroImage = `./src/content/files/pictures/${data.data.heroImage}`;
      let lang = data.data.slug.split("/")[0];

      let authorsHtml = "";

      data.data.authors.forEach((author) => {
        authorsHtml += `<h2 style="text-align: center;">${author}</h2>`;
      });

      //console.log(authorsHtml);

      const html = convertMD2HTML(data, lang).then((htmlString) => {
        var date = new Date(data.data.pubDate);

        var formattedDate = date.toLocaleDateString(lang, {
          weekday: "long",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });

        var parBy = (lang === "fr") ? "Écrit par " : "By ";

        fs.readFile(heroImage).then((imgData) => {
          var headerTemplate: string = `<div><div class="date">${formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)
            }</div><h1 class="title" style="text-align: center;">${data.data.title}</h1><img src="data:image/jpeg;base64,${imgData.toString("base64")
            }" style=" display: block;
margin-left: auto;
  margin-right: auto;
  width: 40%;"></img><h3 style="text-align: center;">${parBy}</h3>${authorsHtml}</div>`;

          let options = {
            format: "A4",
            margin: { top: "50", right: "50", bottom: "75", left: "50" },
          };

          htmlString = `${headerTemplate}${htmlString}`;

          let file = { content: htmlString };

          convertHTML2PDF(file, options).then((pdf) => {
            fs.writeFile(`${nouveauDossier}${fileName}`, pdf);
          });
        });
      });
    }).catch((error) => {
      console.log(`Erreur de lecture du fichier md (2) ${error}`);
    });
  }
}

async function convertMD2HTML(data, lang: string) {
  let html = await marked.use(markedFootnote()).parse(data.content);

  let str = `<section class="footnotes"`;

  let strReplaced =
    `<section class="footnotes" style="display: inline-block; page-break-inside: avoid; "`;

  html = html.replace(str, strReplaced);

  if (lang === "fr") {
    let labelStr = `<h2 id="footnote-label" class="sr-only">Footnotes</h2>`;

    let labelstrreplaced = `<h2 id="footnote-label" class="sr-only">Notes</h2>`;

    html = html.replace(labelStr, labelstrreplaced);
  }

  //console.log(html);

  return html;
}

async function convertHTML2PDF(file: Object, options: Object) {
  let pdf = await htmlPdfNode.generatePdf(file, options);

  return pdf;
}
