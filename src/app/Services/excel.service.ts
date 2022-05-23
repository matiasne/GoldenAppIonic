import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { File } from '@ionic-native/file/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor(
    private file:File,
    private platform:Platform) {


   }

  saveAsCsv() {
    

    

  }

  downloadTable(table,filename) {
    var csv: any = ''
    var line: any = ''    
    let matriz=[]

    matriz[0] = []
    
    matriz[0] = []
    for (var i = 0; i < table.columns.length; i++) {
      matriz[0][i]= table.columns[i].name
    }

    for (let i = 0; i < table.rows.length; i++) {
      matriz[i+1] = []
      for (const key of Object.keys(table.rows[i])) {
       
        if(table.rows[i][key]){
          for (let p = 0; p < table.columns.length; p++) {           
          
            if(table.columns[p].prop.includes(key)){
              
              
              if(table.rows[i][key].date){
                matriz[i+1][p]= table.rows[i][key].date
              }               
              else
                matriz[i+1][p]= table.rows[i][key]
            }
           
          }
        }
        

      }
    }
 
    console.log(matriz)
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(matriz);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    if(this.platform.is('cordova')){
      let buffer = XLSX.write(wb,{bookType:'xlsx',type:'array'});
      
      var fileType = 'application/vnd.opnxmlformats-officedocument.spreadsheetml.sheet'
      let data:Blob = new Blob([buffer],{type:fileType})
      
     this.file.writeFile(this.file.externalRootDirectory,filename+".xlsx",data,{replace:true}).then(data=>{
       console.log(data)
     },err=>{
       console.log(err)
     })
    }
    else{
      XLSX.writeFile(wb, 'tabla.xlsx');
    }
    

  }

  download(filename, data) {

  var blob = new Blob(data)

    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename+".xlsx";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a)


  }

  
}
