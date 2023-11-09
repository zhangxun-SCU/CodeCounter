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
    maxFuncLength: number
    minFuncLength: number
    avrFuncLength: number
}

interface Details {
    [code: string]: languageDetail
}

interface countInfo {
    paths: string[],
    excludeKeys: string[],
    period: string,
    languages: string[]
}


interface FuncDetail {
    maxLine: number,
    minLine: number,
    totalLine: number,
    funcNum: number
}

export type {languageType, countInfo, Details, languageDetail, FuncDetail}

