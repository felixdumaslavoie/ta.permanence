import { z } from "astro/zod";

// REF: https://www.youtube.com/watch?v=L6BE-U3oy80

const urlValidationSchema = z.object({
  url: z.string().url({ message: " Url invalide." }),
});

const langValidationSchema = z.object({
  langCode: z.enum(["fr", "en"]),
});

const pageSchema = z.object({
  isMainPage: z.boolean(),
  lang: z.string(),
});

function splitUrl(url: string): string[] {
  // En premier, je vais devoir checker avec zod si c'est une url valide.
  urlValidationSchema.parse(url);
  let splittedUrl: string[] = url.split("/");

  return splittedUrl;
}

function cleanUrl(url: string[]): string[] {
  if (url.at(0) === "") url.shift();

  return url;
}

function isValidUrl(url: string): boolean {
  let locale: string | undefined = url.at(0);

  if (locale === undefined) locale = "";

  const validator = {
    langCode: locale,
  };

  langValidationSchema.parse(validator);

  return false;
}

// rendu icitte!!
export function getPageSchema() {}
