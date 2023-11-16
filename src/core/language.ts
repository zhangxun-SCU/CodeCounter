import {Details, LangDetail,} from "@/interface/lang.ts";
import fs from "node:fs";
import path from "path";

function getLanguageDetail(selected: string[]) {
    const bf = fs.readFileSync(path.join(path.resolve(__dirname, '..'), 'src/setting.json'));
    const settings = JSON.parse(bf.toString());
    let details: Details = {};
    for(let i = 0; i < selected.length; ++i) {
        let language: LangDetail = {
            name: selected[i],
            filesNum: 0,
            lines: 0,
            fileTypes: settings.languageSet[selected[i]].fileTypes,
            funcNum: 0,
            totalFuncLength: 0,
            maxFuncLength: 0,
            minFuncLength: Infinity,
            avrFuncLength: 0
        };
        details[selected[i]] = language;
    }
    return details;
}

export { getLanguageDetail }