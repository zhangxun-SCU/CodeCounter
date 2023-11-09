import {Details, languageDetail,} from "@/interface/codeLanguage.ts";
import fs from "node:fs";
import path from "path";

function getLanguageDetail(selected: string[]) {
    const bf = fs.readFileSync(path.join(path.resolve(__dirname, '..'), 'src/setting.json'));
    const settings = JSON.parse(bf);
    let details: Details = {};
    for(let i = 0; i < selected.length; ++i) {
        let language: languageDetail = {
            name: selected[i],
            filesNum: 0,
            lines: 0,
            fileTypes: settings.languageSet[selected[i]].fileTypes,
            funcNum: 0,
            avrFuncLength: 0,
            maxFuncLength: 0,
            minFuncLength: Infinity
        };
        details[selected[i]] = language;
    }
    return details;
}

export { getLanguageDetail }