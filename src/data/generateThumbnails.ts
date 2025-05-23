import { promises as fs } from "node:fs";
import { pdf } from "pdf-to-img";

// https://www.npmjs.com/package/pdf-to-img
//
//
const getDirectories = async source =>
  (await fs.readdir(source, { withFileTypes: true }))
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

const getFiles = async source =>
  (await fs.readdir(source, { withFileTypes: true }))
    .filter(dirent => dirent.isFile())
    .map(dirent => dirent.name)

export async function generateThumbnails() {
  let counter = 1;

  const materielFolder = "./public/archives/cute/materiel/";
  const imagesFolder = "./public/archives/cute/images/"

  getDirectories(materielFolder).then((res) => {

    res.forEach((dossier) => {

      getFiles(`${materielFolder}${dossier}`).then((files) => {

        console.log(files)
      })
    })

  })




  // you can also read a specific page number:
}

async function writeImage(ancienDossier: string, nouveauDossier: string, fileName: string) {
  const document = (await pdf(`${ancienDossier}${fileName}`, { scale: 3 })).getPage(0);
  await document.then((img) => {
    fs.writeFile(`${nouveauDossier}${fileName}`, img);
  })
}

