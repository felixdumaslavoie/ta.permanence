import { promises as fs } from "node:fs";

const getDirectories = async (source) =>
  (await fs.readdir(source, { withFileTypes: true }))
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

const getFiles = async (source) =>
  (await fs.readdir(source, { withFileTypes: true }))
    .filter((dirent) => dirent.isFile())
    .map((dirent) => dirent.name);

export async function copyMarkdown() {
  const blogFolder = "./src/content/blog/";
  const mdFolder = "./public/blog/markdown/";

  getDirectories(blogFolder).then((res) => {
    res.forEach((dossier) => {
      getFiles(`${blogFolder}${dossier}`).then((files) => {
        files.forEach((file) => {
          let split: string[] = file.split(".");

          if (split.at(split.length - 1) === "md") {
            let corrected = split.pop();

            let fuse: string = "";
            if (corrected) {
              split.push(".md");
              split.forEach((fragment: string) => {
                fuse += fragment;
              });
              //console.log(`${pdfFolder}${dossier}/${fuse}`)

              readMarkdown(
                `${blogFolder}${dossier}/`,
                `${mdFolder}${dossier}/`,
                file,
              );
            }
          }
        });
      });
    });
  });
}

async function readMarkdown(
  ancienDossier: string,
  nouveauDossier: string,
  oldName: string,
) {
  // Le page number commence à un :( !
  var writeFlag = false;

  console.log(`${nouveauDossier}${oldName}`);

  fs.stat(`${nouveauDossier}${oldName}`).then((statDest) => {
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
    writeMarkdown(ancienDossier, nouveauDossier, oldName, writeFlag);
  });
}

async function writeMarkdown(
  ancienDossier: string,
  nouveauDossier: string,
  oldName: string,
  writeFlag: boolean,
) {
  if (writeFlag) {
    //console.log(`${nouveauDossier}${fileName} ${ancienDossier}${oldName}`)
    //
    //

    fs.readFile(`${ancienDossier}${oldName}`, "utf8").then((mdFile) => {
      let lang = (ancienDossier.includes("/en/")) ? "en" : "fr";

      fs.writeFile(`${nouveauDossier}${oldName}`, mdFile);
    });
  }
}
