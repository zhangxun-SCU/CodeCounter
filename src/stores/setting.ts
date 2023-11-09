import {defineStore} from 'pinia';
import {LangType} from "@/interface/lang.ts";

let languages: {[code: string]: LangType} = {};

export const useSettingStore = defineStore("setting", {
    state: () => {
        return {
            languages
        }
    },

    getters: {

    },

    actions: {

    }
})