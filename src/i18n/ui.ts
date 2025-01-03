import { SITE_TITLE, SITE_DESCRIPTION, SOCIALS_MEDIA } from '../consts'


export const defaultLang = 'fr';

export const textsByMainPage: number = 3

export const languages = {
  en: 'English',
  fr: 'Français',
};

export const ui = {
  en: {
    'site_title': SITE_TITLE.en,
    'site_description': SITE_DESCRIPTION.en,
    'nav.home': 'Home',
    'nav.about': 'About',
    'div.last-updated-on': 'Last updated on',
    'ig': SOCIALS_MEDIA.ig,
    'fb': SOCIALS_MEDIA.fb,
    'langageSwitcherLeft': 'English',
    'langageSwitcherRight': 'Français'
  },
  fr: {
    'site_title': SITE_TITLE.fr,
    'site_description': SITE_DESCRIPTION.fr,
    'nav.home': 'Accueil',
    'nav.about': 'À propos',
    'div.last-updated-on': 'Édité la dernière fois le',
    'ig': SOCIALS_MEDIA.ig,
    'fb': SOCIALS_MEDIA.fb,
    'langageSwitcherLeft': 'Français',
    'langageSwitcherRight': 'English'
  },
} as const;

export const routes = {
  en: {
    'services': 'leistungen',
  },
  fr: {
    'services': 'prestations-de-service',
  },
}