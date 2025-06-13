import { promises as fs } from "node:fs";
import { marked } from 'marked';
import markedFootnote from 'marked-footnote'
import matter from "gray-matter";
import jsPDF from "jspdf";

const getDirectories = async source =>
  (await fs.readdir(source, { withFileTypes: true }))
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

const getFiles = async source =>
  (await fs.readdir(source, { withFileTypes: true }))
    .filter(dirent => dirent.isFile())
    .map(dirent => dirent.name)

export async function generatePDF() {

  const blogFolder = "./src/content/blog/rdm/";
  const pdfFolder = "./public/blog/pdf/"

  getDirectories(blogFolder).then((res) => {


    res.forEach((dossier) => {


      getFiles(`${blogFolder}${dossier}`).then((files) => {

        files.forEach((file) => {
          let split: string[] = file.split(".")

          if (split.at(split.length - 1) === "md") {
            //console.log(file)
            let corrected = split.pop()

            let fuse: string = ""
            if (corrected) {
              split.push(".pdf")
              split.forEach((fragment: string) => {
                fuse += fragment
              })
              //console.log(`${pdfFolder}${dossier}/${fuse}`)

              writePDF(`${blogFolder}${dossier}/`, `${pdfFolder}${dossier}/`, file, fuse)
            }
          }
        })
      })
    })

  })
}



async function writePDF(ancienDossier: string, nouveauDossier: string, oldName: string, fileName: string) {
  // Le page number commence à un :( ! 
  var writeFlag = false


  fs.stat(`${nouveauDossier}${fileName}`).then((statDest) => {

    fs.stat(`${ancienDossier}${oldName}`).then((stat) => {

      const srcDate = stat.mtime
      const destDate = statDest.mtime


      if (destDate < srcDate) {
        writeFlag = true
      }

    });

  }).catch((errDest) => {
    // Le fichier de destination n'existe pas
    if (errDest.code === 'ENOENT') {
      writeFlag = true
    } else {
      console.log("Erreur dans la lecture du fichier md. ")
    }

  }).finally(() => {

    convertMD2PDF(ancienDossier, nouveauDossier, oldName, fileName, writeFlag)
  })



}

async function convertMD2PDF(ancienDossier: string, nouveauDossier: string, oldName: string, fileName: string, writeFlag: boolean) {


  if (writeFlag) {
    console.log(`${nouveauDossier}${fileName} ${ancienDossier}${oldName}`)

    fs.readFile(`${ancienDossier}${oldName}`, 'utf8').then((rawData) => {

      let data = matter(rawData)

      let heroImage = `./src/content/files/pictures/${data.data.heroImage}`;

      const html = convertMD2HTML(data).then((html) => {

        var doc = new jsPDF();
        doc.html(html, {
          callback: function (doc) {
            // Save the PDF
            doc.save(`${nouveauDossier}${fileName}`);
          },
          x: 15,
          y: 15,
          width: 170, //target width in the PDF document
          windowWidth: 650 //window width in CSS pixels
        });


      })

      console.log(html)
      //console.log(`${heroImage} ${ancienDossier}${oldName}`)
      //
      //


    }).catch((error) => {
      console.log(`Erreur de lecture du fichier md (2) ${error}`)
    })

  }
}

async function convertMD2HTML(data) {

  let html = await marked.use(markedFootnote()).parse(data.content)

  return html;
}



