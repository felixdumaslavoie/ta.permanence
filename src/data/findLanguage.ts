import { findPageId } from "./fetchData";

// URL en entrée --> PROCESSING --> Langue du texte en question en sortie.
export function findLanguage(url: URL): string {

  let stringUrl = url.pathname


  return stringUrl.split(`/`)[1];
}

