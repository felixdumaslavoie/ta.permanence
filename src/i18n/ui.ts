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
    'langageSwitcherRight': 'Français',
    'mainPage': 'Main page',
    'lastPage': 'Last page',
    'readText': 'Read',
    'by': 'By',
    'lesCUTE': 'SWUC(s)',
    'tracts': 'Zines',
    'affiches': 'Posters',
    'videos': 'Videos',
    'siteWeb': 'Websites'
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
    'langageSwitcherRight': 'English',
    'mainPage': 'Page d\'accueil',
    'lastPage': 'Dernière page',
    'readText': 'Lire',
    'by': 'Par',
    'lesCUTE': 'Les CUTE(s)',
    'tracts': 'Tracts',
    'affiches': 'Affiches',
    'videos': 'Vidéos',
    'siteWeb': 'Sites web'


  },
} as const;


