# rdmV2 readme

This is an **Astro web project**. For more information about this framework look at [www.astro.build](https://astro.build/).

### Project scope

The aim with this project is to be minimalistic as possible when providing the same core features a full Wordpress website would offer.

## Reference

Links between translated texts and some basic text info are stored in a tiny "database" (under the folder ./src/content/blog/data) in a cleartext JSON file (named data.json) that will be used as a reference to find the link between translated texts. The search feature uses [pagefind](https://pagefind.app/).

### A data.json structure example


```json
{
	"id2url": {
	"65": {
		"fr": "fr/les-soins-cest-pour-les-autres",
		"en": "en/care-is-for-others"
    },
	"124": {
		"fr": "fr/lautonomie-reellement-existante"
		}
	},
	"url2id": {
		"fr/les-soins-cest-pour-les-autres" : "65",
		"en/care-is-for-others" : "65",
		"fr/lautonomie-reellement-existante" : "124",
	}
}
```

**65** is the id of the text, then for each one of them you could have some translations. In this example, there is one text with the id 65 and this text has 2 translations/versions available (a french one and an english one). I then link each version with thier respective slug. I will use this data to implement the *langage switcher* between multiple translations of the same text in Astro. All this data is pregenerated by a node.js module.


##### Project done by Flx DL