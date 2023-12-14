import {Details, LangDetail,} from "@/interface/lang.ts";


function getLanguageDetail(selected: string[], settings:{}) {
    let details: Details = {};
    for(let i = 0; i < selected.length; ++i) {
        let language: LangDetail = {
            name: selected[i],
            filesNum: 0,
            lines: 0,
            fileTypes: settings[selected[i]].fileTypes,
            funcNum: 0,
            totalFuncLength: 0,
            maxFuncLength: 0,
            minFuncLength: Infinity,
            avrFuncLength: 0,
            midFuncLength: 0,
            allFuncNums: []
        };
        details[selected[i]] = language;
    }
    return details;
}

export { getLanguageDetail }