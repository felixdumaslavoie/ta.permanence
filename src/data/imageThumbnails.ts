import { promises as fs } from "node:fs";
import thumbnail from 'image-thumbnail';

import { exit } from "node:process";

const getDirectories = async source =>
    (await fs.readdir(source, { withFileTypes: true }))
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)

const getFiles = async source =>
    (await fs.readdir(source, { withFileTypes: true }))
        .filter(dirent => dirent.isFile())
        .map(dirent => dirent.name)



export async function generateThumbnails() {
    const pictureFolder = "./src/content/files/pictures/";
    const imagesFolder = "./public/blog/pictures/"

    getDirectories(pictureFolder).then((res) => {

        res.forEach((dossier) => {

            getFiles(`${pictureFolder}${dossier}`).then((files) => {
                files.forEach((file) => {

                    //console.log(`${imagesFolder}${dossier}/`)
                    writeImage(`${pictureFolder}${dossier}/`, `${imagesFolder}${dossier}/`, file, file)

                }

                )
            }
            )
        })
    })

}


async function writeImage(ancienDossier: string, nouveauDossier: string, oldName: string, fileName: string) {
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
            console.log("Erreur dans la lecture du fichier png. ")
        }

    }).finally(() => {

        writePicture(ancienDossier, nouveauDossier, oldName, fileName, writeFlag)
    })

}

function creerDossierSiExistePas(dossier: string) {

    fs.stat(`${dossier}`).then((statDest) => {

    }).catch((errDest) => {
        // Le dossier de destination n'existe pas
        if (errDest.code === 'ENOENT') {
            fs.mkdir(`${dossier}`);
        } else {
            console.log("Erreur dans la lecture du fichier png. ")
        }

    })
}

async function writePicture(ancienDossier: string, nouveauDossier: string, oldName: string, fileName: string, writeFlag: boolean) {
    const PAGE: number = 1



    if (writeFlag) {

        const imageThumbnail = await thumbnail(`${ancienDossier}${oldName}`)

        creerDossierSiExistePas(nouveauDossier)

        console.log(imageThumbnail)
        if (imageThumbnail) {
            fs.writeFile(`${nouveauDossier}${fileName}`, imageThumbnail);

        }

    }
}