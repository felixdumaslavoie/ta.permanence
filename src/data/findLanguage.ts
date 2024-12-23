import { idFetching, findCurrentLanguage } from "../data/fetchData";

// URL en entrée --> PROCESSING --> Langue du texte en question en sortie.

export function findLanguage(url: string): string {
  const idStr = idFetching(url);

  return findCurrentLanguage(idStr, url);
}

