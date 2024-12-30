import { findPageId } from "./fetchData";

// URL en entrée --> PROCESSING --> Langue du texte en question en sortie.
function findPageLanguage() {

  return 'fr';
}


export function findLanguage(url: URL): string {
  const idStr = findPageId(url);

  return findPageLanguage();
}

