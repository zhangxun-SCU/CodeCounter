/**
 * setting.json 和store中的 编程语言类型
 */
interface LangType {
    name: string,
    fileTypes: string[],
}

/**
 * 编程语言统计信息类型
 */
interface LangDetail {
    name: string,
    fileTypes: string[],
    lines: number,
    filesNum: number,
    funcNum: number
    maxFuncLength: number
    minFuncLength: number
    avrFuncLength: number
}

/**
 * 统计信息
 */
interface Details {
    [code: string]: LangDetail
}

/**
 * 传入参数类型
 */
interface CountInfo {
    paths: string[],
    excludeKeys: string[],
    period: string,
    languages: string[]
}

/**
 * 函数统计信息
 */
interface FuncDetail {
    maxLine: number,
    minLine: number,
    totalLine: number,
    funcNum: number
}

export type {LangType, CountInfo, Details, LangDetail, FuncDetail}

