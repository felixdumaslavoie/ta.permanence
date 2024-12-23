import type { ImageInputFormat } from 'astro';
import { getCollection } from 'astro:content';


import { imageURLCorrection } from '../data/imageURLCorrection';

const print = console.log

const images = import.meta.glob<ImageMetadata>('../content/files/pictures/20*/*.{jpeg,jpg,png,gif}');

const imagePaths: string[] = [];
const correctedURL: string[] = [];
const imgsMetadata : ImageMetadata[] = [];

const posts = await getCollection('blog');

let myResolve = function(value: ImageMetadata) {
	let format : ImageInputFormat = "jpeg";
	let rep : ImageMetadata;

	let imgMeta : ImageMetadata = {
		src: "",
		width: 0,
		height: 0,
    	format: format
	}

	rep = imgMeta
	if (value !== undefined)
		rep = value["default"];

	imgsMetadata.push(rep)
}

let myError = function(error){
	print(error)	
	throw new Error("Error in index.astro when parsing ImageMetadata")
}
async function fetchImagesMetadata()
{
    posts.forEach((postLang, idx)=>{
        imagePaths.push(imageURLCorrection(postLang.data.heroImage))
        correctedURL.push(".." + imagePaths[idx].substring(4,imagePaths[idx].length));
    });

	for (let i=0; i<correctedURL.length; i++){
		await images[correctedURL[i]]().then(myResolve,myError)
	}
}


export async function getImagesMetadata() {
    await fetchImagesMetadata()

    let result = {}

    for (let i=0; i<imagePaths.length; i++) {
        result[imagePaths[i]] = imgsMetadata[i]
    }

    return result;
}

