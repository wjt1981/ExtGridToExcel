# ExtGridToExcel
Ext通过Gird对象导出Excel

ExtGridToExcel(param1,param2,param3,param4)传入参数说明
  param1：导出excel的文件名
  param2：Gird对象
  param3：表头的行数
  param4：编码格式


示例：
      var gridt=Ext.getCmp("ExtGrid");
      var ddd= new ExtGridToExcel('文件名称',gridt,3,'ANSI');
      var a = document.createElement('a');
      document.body.appendChild(a);
      a.hreflang = 'zh';
      a.charset = 'ANSI';
      a.type="application/vnd.ms-excel";
      a.href =   'data:application/vnd.ms-excel;base64,' +encode64(ddd.html);
      a.target = '_blank';
      a.download = 'excelexport' + '.xls';
      a.click();
