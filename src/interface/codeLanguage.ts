interface languageType {
    name: string,
    fileTypes: string[],
}

interface languageCount {
    name: string,
    fileTypes: string[]
    lines: number,
    funcCount: number,
    fileCount: number
}


interface languageDetails {
    [name: string]: languageCount
}

export type {languageType, languageCount, languageDetails}

