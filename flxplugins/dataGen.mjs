import { writeFile, readFileSync, writeFileSync, readdirSync } from 'node:fs';
import * as lineByLine from 'n-readlines';
import matter from 'gray-matter';

const ENCODING = 'utf8'
const contentPath = './src/content/blog'
const DataJSONPath = './src/content/data/data.json'

// JSON keys
const id2urlKey = "id2url"
const url2IDKey = "url2id"


const print = console.log

var data


//initData()
function initData() {
  data = {}
  data["id2url"] = {}
  data["url2id"] = {}
}


//readData()
function readData() {
  try {
    data = readFileSync(DataJSONPath, ENCODING);
  } catch (error) {

    print("File data.json doesn't exist.")
    print("This script will now create a new data.json.")

    let toWrite = JSON.stringify(data);

    writeFile(DataJSONPath, toWrite, err => {
      if (err) {
        console.error(err);
      }
    });
  }
  data = JSON.parse(data) // Converting data to javascript JSON object
  initData() // Pour l'instant, je vais regénérer les données à chaque exécution.
  // Dans le futur, je pourrai peu être générer un hash pour chaque parsing du data,
  // et le comparer à chaque fois pour savoir si je dois regénérer. 
  //À ce stade ce n'est pas très important.
}


//manipulateData()
function manipulateData() {
  try {
    const langues = readdirSync(contentPath);
    for (const langue of langues) {
      const textes = readdirSync(contentPath + "/" + langue);

      for (const texte of textes) {
        try {
          let aTextPath = contentPath + "/" + langue + "/" + texte;

          let frontMatterObj = getFrontmatterDataFromYAML(exctractYAMLFromText(aTextPath))

          let idDuTexte = texte.split("_")[0];

          /* if (!data[id2urlKey].hasOwnProperty(idDuTexte)) {
             data[id2urlKey][idDuTexte] = {}
             data[id2urlKey][idDuTexte][langue] = frontMatterObj.slug
           } else if (!data[id2urlKey][idDuTexte].hasOwnProperty(langue)) {
             data[id2urlKey][idDuTexte][langue] = frontMatterObj.slug
           }
 
           if (!data[url2IDKey].hasOwnProperty(frontMatterObj.slug)) {
             data[url2IDKey][frontMatterObj.slug] = idDuTexte
           }*/

        } catch (error) {
          print(error)

          process.exit(-1)
        }
      }
    }
  } catch (err) {
    print(err);
    process.exit(-1)
  }
}



var prettyValue = 2

//writeData()
function writeData() {
  try {
    let toWrite = JSON.stringify(data, null, prettyValue);

    writeFileSync(DataJSONPath, toWrite, err => {
      if (err) {
        console.error(err);
      }
    });
  } catch (error) {
    print("Error while trying to write data.json file")
    process.exit(-1)
  }
}

/////////////////////////////////////////////
////////////////UTILITAIRES//////////////////
/////////////////////////////////////////////

function exctractYAMLFromText(textPath) {
  let extracted = "";
  let liner = new lineByLine.default(textPath);
  let line;

  while (line !== '---' && line !== false) {
    line = liner.next()
    if (line) {
      line = line.toString(ENCODING)
    }
  }

  if (line !== false) {
    line = liner.next()
    if (line) {
      line = line.toString(ENCODING)
    }
    let yaml = ""
    while (line !== '---' && line !== false) {
      yaml += (line + "\n");
      line = liner.next()
      if (line) {
        line = line.toString(ENCODING)
      }
    }
    extracted = yaml;
  }
  return extracted;
}

function getFrontmatterDataFromYAML(extractedData) {
  return matter.engines.yaml.parse(extractedData)
}
/////////////////////////////////////////////
////////////////////END//////////////////////
/////////////////////////////////////////////

export function dataGen() {
  initData()
  readData()
  manipulateData()
  writeData()
}