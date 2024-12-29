import textsData from "../content/data/data.json";
const premierNiveau = textsData;


function isMainPage(url: string): boolean {
  // Pour le savoir, je dois juste vérifier si y'a juste un no après l'url de base
  //console.log(url);
  //let testLang = url.substring(3);
  let splittedUrl: Array<String> = url.split("/");
  let temp: Array<String> = splittedUrl !== undefined ? splittedUrl : [""];

  console.log(temp.slice(1, 2));
  //let fuckoff = temp.at(0) === "" ? temp.shift() : temp;
  //console.log(fuckoff);
  // A-t-on affaire a un nombre?
  // let testA = Number.isInteger(temp);

  return false;
}

// Important!!
export function idFetching(string: string): string {

  //console.log(string)


  throw new Error("In id fetching!!")

  let finalString;

  finalString = premierNiveau["url2id"][finalString];
  return finalString;
}

export function urlFetching(id: string, language: string): string | null {
  if (id === "") return "";

  let theURL = premierNiveau["id2url"][id][language];

  if (!premierNiveau["id2url"][id].hasOwnProperty(language)) {
    return null;
  }
  if (theURL === undefined) {
    throw new Error(
      "Undefined url when fetchData.js is fetching url from data.json",
    );
  }

  return theURL;
}

export function findCurrentLanguage(id: string, url: string): string {
  if (url.endsWith(".html")) {
    if (
      url.startsWith("en/") ||
      url.startsWith("/en/") ||
      url.startsWith("/en")
    )
      return "en";
    else if (
      url.startsWith("fr/") ||
      url.startsWith("/fr/") ||
      url.startsWith("/fr")
    )
      return "fr";

    throw new Error(
      "Error in findCurrentLanguage() function in fetchData.ts: language is not present in slug.",
    );
  }

  let lang = "fr";

  if (premierNiveau["id2url"][id][lang] === url) return "fr";
  else if (premierNiveau["id2url"][id]["en"] === url) return "en";
  else
    throw new Error(
      "Error in findCurrentLanguage() function in fetchData.ts: json key is undefined.",
    );
}
