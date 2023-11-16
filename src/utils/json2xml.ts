import xmlbuilder from 'xmlbuilder'

function json2xml(json: object) {
    let jsonObj = {
        lang: {

        }
    }
    if(json instanceof Array) {  /* json转为对象形式 */
        json.forEach((item) => {
            // @ts-ignore
            jsonObj.lang[item['name']] = item;
        })
    } else {
        jsonObj.lang = json;
    }
    return xmlbuilder.create(jsonObj).toString();
}

export {json2xml}