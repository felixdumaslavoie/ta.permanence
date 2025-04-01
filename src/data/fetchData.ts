import data from "../content/data/data.json";

function splitUrl(url: URL) {
  if (url.pathname) {
    let splitted = url.pathname.split('/')
    return splitted
  }
  return null;
}

export function isMainPage(url: URL): boolean {

  let split = splitUrl(url)

  if (split) {
    let temp = split[2] // main page id or slug

    let pageNumber = Number.parseInt(temp)

    if (!isNaN(pageNumber)) // Si mainpage
      return true;
  }

  return false;
}


export function findPageId(url: URL): number {

  let split = splitUrl(url)

  if (split) {

    let temp = split[2] // main page id or slug




    if (Number.parseInt(temp)) // Si mainpage
    {
      return 0
    }
    else if (!Number.parseInt(temp)) {
      let lang = split[1]

      return data["url2id"][lang + "/" + temp]
    }
  }

  return 0
}

export const Languages = {
  Fr: "fr",
  En: "en",
}

export function textLang(post: any): String {

  if (post.id) {
    let extracted = post.id.split('/')[1]
    if (extracted) {
      return extracted
    }
  }

  return "fr"
}

export function pageLang(url: URL): String {

  let split = splitUrl(url)

  if (split) {

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

export function switchMainPageLang(url: URL, pageNumber: Number): URL {
  let currentLang = pageLang(url)
  let newLang = switchLang(currentLang)

  return new URL(`${url.origin}/${newLang}/${pageNumber}`)
}

export function translatedText(url: URL): URL {

  let currentId = findPageId(url)
  if (currentId) {
    let currentLang = pageLang(url)
    let newLang = switchLang(currentLang)

    let query = data["id2url"][currentId][newLang]

    let result = `${url.origin}/${query}`

    return new URL(result);
  }

  return url;
}

export function howManyTexts(language: string): number {

  let textsNumber = 0

  if (Object.values(Languages).includes(language)) {
    let ids = data["id2url"]

    for (const key in ids) {
      if (ids[key][language] !== undefined) {
        textsNumber++
      }

    }
    return textsNumber
  }


  throw new Error("FetchData, howManTexts : this language doesn't exist.")

}


