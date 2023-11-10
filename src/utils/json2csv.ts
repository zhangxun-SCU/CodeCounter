function json2csv(json: object) {
    let csv: string = '';
    if(json instanceof Array) {  /*  数组json  */
        // 表头
        let tableHead = Object.keys(json[0]);
        const tableWidth = tableHead.length;
        tableHead.forEach((h, i) => {
            csv += h;
            if(i != tableWidth - 1) {
                csv += ',';
            } else {
                csv += '\n';
            }
        })
        // 表体
        json.forEach((item) => {
            tableHead.forEach((head, i) => {
                if(item[head] instanceof Array) {
                    item[head].forEach((item: string | number) => {
                        csv += '.';
                        csv += item
                    })
                } else {
                    csv += item[head];
                }
                if(i != tableWidth - 1) {
                    csv += ',';
                } else {
                    csv += '\n';
                }
            })
        })
    } else {  /*  对象json  */

    }
    return csv;
}

export {json2csv}