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
  const materielFolder = "./public/archives/cute/materiel/";
  const imagesFolder = "./public/archives/cute/images/"

  getDirectories(materielFolder).then((res) => {

    res.forEach((dossier) => {

      getFiles(`${materielFolder}${dossier}`).then((files) => {
        files.forEach((file) => {
          let split: string[] = file.split(".")

          if (split.at(split.length - 1) === "pdf") {
            //console.log(file)
            let corrected = split.pop()

            let fuse: string = ""
            if (corrected) {
              split.push(".png")
              split.forEach((fragment: string) => {
                fuse += fragment
              })
              //console.log(`${imagesFolder}${dossier}/`)
              writeImage(`${materielFolder}${dossier}/`, `${imagesFolder}${dossier}/`, file, fuse)

            }
          }
        })
      })
    })

  })
}

async function writeImage(ancienDossier: string, nouveauDossier: string, oldName: string, fileName: string) {
  // Le page number commence à un :( ! 
  const PAGE: number = 1
  const document = (await pdf(`${ancienDossier}${oldName}`, { scale: 0.7 })).getPage(Number(PAGE));
  await document.then((img) => {

    fs.writeFile(`${nouveauDossier}${fileName}`, img);
  })
}

