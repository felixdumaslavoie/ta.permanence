import { ui, defaultLang, textsByMainPage } from './ui';
import { howManyTexts, Languages } from "../data/fetchData";


export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  }
}

export function computePaths(lang: string, test): Array<Object> {


  if (!Object.values(Languages).includes(lang)) {
    throw new Error("Compute paths: language code not found")
  }

 

  let pageNumber: number = 4 / textsByMainPage


  let paramArray = new Array(Math.ceil(pageNumber)).fill({});

  paramArray.forEach((paramAtom, idx) => {
    paramArray[idx] = {
      params: { pagination: idx },
    };
  });

  return paramArray;
}

export function howManyMainPages(lang: string, howManyTexts : number): number {
  if (!Object.values(Languages).includes(lang)) {
    throw new Error("howManyMainPages: language code not found")
  }

  let textNumber: number = howManyTexts;

  let pageNumber: number = Math.ceil(textNumber / textsByMainPage)

  return pageNumber
}


export function computeMainTexts(texts: Array<Object>, pageNumber: String): Array<Object> {

  let test = Number(pageNumber)
  let pages = 0
  if (!isNaN(test)) {
    pages = test
  }

  let iByN = pages.valueOf() * textsByMainPage


  return texts.slice(iByN, (iByN + textsByMainPage))
}
