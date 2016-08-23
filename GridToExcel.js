 window.grid2Excel = function(grid,fileName) {
        alert("heating");
        var columns = grid.initialConfig.columns|| [],
            store = grid.getStore(),
            headLevel1 = [],headLevel2 = [],headLevel = 1,isGroup = false,
            dataIndex =[],tableStr = '<table><thead>{thead}</thead><tbody>{tbody}</tbody></table>';

        columns.forEach(function(column) {
            if(!column.dataIndex) {
                isGroup = true;
                return false;
            }

        });
        if(isGroup) {
            headLevel = 2;  //只支持二级表头
        }
        columns.forEach(function(column) {
            if(column.dataIndex) {
                column.colspan = 1;
                column.rowspan = headLevel;
                headLevel1.push(column);
                dataIndex.push(column);
            }else {
                var items = column.columns ||[];
                column.colspan = items.length;
                column.rowspan = 1;
                headLevel1.push(column);
                items.forEach(function(item) {
                    item.colspan = 1;
                    item.rowspan = 1;
                    headLevel2.push(item);
                    dataIndex.push(item);
                })
            }
        });
        var headLevel1Str = '<tr>';
        headLevel1.forEach(function(head) {
            headLevel1Str += '<th colspan = "'+head.colspan+
            '" rowspan="'+head.rowspan+'">'+head.text+'</th>';

        });
        headLevel1Str += '</tr>';

        var headLevel2Str = '';
        if(headLevel2.length > 0) {
            headLevel2Str += '<tr>';
            headLevel2.forEach(function(head) {
                headLevel2Str += '<th colspan = "'+head.colspan+
                '" rowspan="'+head.rowspan+'">'+head.text+'</th>';
            });
            headLevel2Str += '</tr>'
        }
        var theadStr = headLevel1Str + headLevel2Str,
            tbodyStr = '', defRenderer = function(value) {
                return value;
            };

        store.each(function(r) {
            tbodyStr += '<tr>';
            dataIndex.forEach(function(c) {
                var renderere = c.renderer || defRenderer;
                tbodyStr += '<td>'+renderere.call(r,r.get(c.dataIndex))+'</td>'
            });
            tbodyStr +='</tr>'
        });
        console.log("theadStr=="+theadStr);
        console.log("tbodyStr=="+tbodyStr);


        // tableStr = format(tableStr,{
        //     thead:theadStr,
        //     tbody:tbodyStr
        // });
        tableStr="<table border='1'><tr> <th>Month</th>  <th>Savings</th></tr><tr> <td>January</td>  <td>$100</td> </tr></table>";
        tableToExcel(tableStr,fileName);

    };
var tableToExcel = function(table,fileName) {
        var uri = 'data:application/vnd.ms-excel;base64,'
            ,fileName = fileName || 'excelexport'
            , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office"' +
                ' xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head>' +
                '<meta http-equiv="Content-Type" content="text/html; charset=utf-8">'+
                '<!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets>' +
                '<x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/>' +
                '</x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml>' +
                '<![endif]--></head><body>{table}</body></html>';

        var ctx = {worksheet:'Worksheet', table: table};
        var a = document.createElement('a');
        document.body.appendChild(a);
        a.hreflang = 'zh';
        a.charset = 'utf-8';
        a.type="application/vnd.ms-excel";
        a.href = uri + Base64.encode(format(template,ctx));
        a.target = '_blank';
        a.download = fileName + '.xls';
        a.click();

    };