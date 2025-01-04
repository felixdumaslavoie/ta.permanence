

export function imageURLCorrection(url: string | undefined): string {

    if (url === undefined)
        return "";


    url = "/src/content/files/pictures/" + url;

    return url;
}