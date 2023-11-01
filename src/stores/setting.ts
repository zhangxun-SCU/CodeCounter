import {defineStore} from 'pinia';
import {languageType} from "@/interface/codeLanguage.ts";

let languages: {[string]: languageType} = {};

export const useSettingStore = defineStore("setting", {
    state: () => {
        return {
            languages
        }
    },

    getters: {
        // async getLanguages() {
        //     return await import("@/setting.json");
        // }

    },

    actions: {
        // addLanguage(language: languageType) {
        //     this.languages.push(language);
        // }
    }
})