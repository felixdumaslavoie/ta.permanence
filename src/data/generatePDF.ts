import { promises as fs } from "node:fs";
import { createReadStream, createWriteStream } from "node:fs";

import pkg from 'markdown-pdf';
const { markdownpdf } = pkg;

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

        console.log(files)
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

              //writePDF(`${blogFolder}${dossier}/`, `${pdfFolder}${dossier}/`, file, fuse)
            }
          }
        })
      })
    })

  })
}


async function writePDF(ancienDossier: string, nouveauDossier: string, oldName: string, fileName: string) {

  createReadStream(`${ancienDossier}${oldName}`)
    .pipe(markdownpdf())
    .pipe(createWriteStream(`${nouveauDossier}${fileName}`))
}

