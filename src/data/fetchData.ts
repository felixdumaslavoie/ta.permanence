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

    let temp = split[1] // main page id or slug

    if (Number.parseInt(temp)) // Si mainpage
    {
      return 0
    }
    else if (!Number.parseInt(temp)) {

      return data["url2id"][temp]
    }
  }

  return 0
}

const Languages = {
  Fr: "fr",
  En: "en",
}

export function textLang(post: any): String {
  if (post.id) {
    let extracted = post.id.split('/')[0]
    if (extracted) {
      return extracted
    }
  }

  return "fr"
}

export function pageLang(url: URL): String {

  let split = splitUrl(url)

  if (split) {
    //console.log(split[1])

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

  //console.log(url)

  let currentId = findPageId(url)
  let currentLang = pageLang(url)
  let newLang = switchLang(currentLang)


  /*let query = data["id2url"][currentId][newLang]

  if (query) {
    //console.log(query)
  }
  if (result !== null) {
  translationURL = result;
  if (result !== "") translationURL = Astro.url.origin + "/" + translationURL;
}  
  
  */
  return url;


}