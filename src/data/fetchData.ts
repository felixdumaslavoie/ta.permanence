import type { Url } from "node:url";
import data from "../content/data/data.json";

function splitUrl(url: URL) {
  if (url.pathname) {
    let splitted = url.pathname.split('/')
    return splitted
  }
  return null;
}


export function findPageId(url: URL): number {

  let split = splitUrl(url)

  if (split) {
    console.log(!isNaN(Number(split[2])))
    if (!isNaN(Number(split[2]))) // Si mainpage
    {
      return Number(split[2])
    }
  }

  return 0
}

const Languages = {
  Fr: "fr",
  En: "en",
}

export function pageLang(url: URL): String {
  let split = splitUrl(url)

  if (split) {
    console.log(split[1])

    if (Object.values(Languages).includes(split[1])) {
      return String(split[1])
    }

    throw new Error("Invalid url (fetchData / pageLang)")
  }

  return "fr"
}

function switchLang(lang: String) {
  return lang === "fr" ? "en" : "fr";
}

export function translatedText(url: URL): URL {

  let currentId = findPageId(url)
  let currentLang = pageLang(url)
  let newLang = switchLang(currentLang)
  //console.log(currentId)

  let query = data["id2url"][currentId][newLang]

  if (query) {
    //console.log(query)
  }

  return url;


}