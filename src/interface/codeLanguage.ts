interface languageType {
    name: string,
    fileTypes: string[],
}


interface languageDetail {
    name: string,
    fileTypes: string[],
    lines: number,
    filesNum: number,
    funcNum: number
}

interface Details {
    [string]: languageDetail
}

interface countInfo {
    paths: string[],
    excludeKeys: string[],
    period: string,
    languages: string[]
}

export type {languageType, languageCount, countInfo, Details, languageDetail}

