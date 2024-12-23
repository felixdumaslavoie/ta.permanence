import textsData from "../content/data/data.json";
const premierNiveau = textsData;

function urlCleanTests(i: number, url: string) {
  let testA = i === 0 && url.charAt(i) === "/";
  let testB = i === url.length - 1 && url.charAt(i) === "/";

  return !(testA || testB);
}

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

export function idFetching(url: string): string {
  let finalString = "";

  let testLang = url; // j'aimerais qu'il tombe ici si c'est la page titre.

  // En fait, si j'ai une url du type: "en/123" avec juste des chiffres à la fin, je sais que je suis sur la page principale
  isMainPage(url);
  if (
    testLang === "/fr/" ||
    testLang === "/en/" ||
    testLang === "/fr" ||
    testLang === "/en" ||
    testLang.endsWith(".html")
  )
    return "";

  if (testLang.charAt(0) === "/") testLang = testLang.substring(1);

  let lang = testLang.substring(0, 2);
  for (let i = 0; i < url.length; i++) {
    if (urlCleanTests(i, url)) finalString += url.charAt(i);
  }

  finalString = premierNiveau["url2id"][finalString];

  if (finalString === undefined) {
    throw new Error(
      "Undefined string when fetchData.js is fetching data from data.json",
    );
  }

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
