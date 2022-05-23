import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class CsvService {

  constructor() { }

  saveAsCsv() {
    

    

  }

  convertToCSV(table) {
    var csv: any = ''
    var line: any = ''    
    let matriz=[]

    matriz[0] = []
    //Header
    for (var i = 0; i < table.columns.length; i++) {
      if (line != '') line += ';'

      line += table.columns[i].name
    }
    csv += line + '\r\n';


    for (let i = 0; i < table.rows.length; i++) {
      line = ''
      matriz[i+1] = []
      for (const [index, valor] of Object.values(table.rows[i]).entries()) {
        if (line != '') line += ';'
     //   if(i == 5){ //en la posición 5 viene el objeto date
        let v:any = valor
        if(valor){
          if(v.date)
            line += v.date
          else
            line +=v 
        }
        else{
          line +='' 
        }
    
        
      }
      csv += line + '\r\n'
    }

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

/* save to file */
XLSX.writeFile(wb, 'SheetJS.xlsx');
   
  //  console.log(csv)
    //this.download("download.xls",wb)
    // let file = new File();
    // var fileName: any = "tabla.csv"
    // file.writeFile(file.externalRootDirectory, fileName,csv).then(
    //   _ => {
    //     alert('Success ;-)')
    //   }
    //   )
    //   .catch(
    //   err => {

    //       file.writeExistingFile(file.externalRootDirectory, fileName, csv).then(
    //       _ => {
    //         alert('Success ;-)')
    //       }
    //       )
    //       .catch( 
    //       err => {
    //         console.log(err)
    //       }
    //       )
    //   }
    //   )

    return csv
  }

  download(filename, text) {

  

    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }
  
  // Start file download.
  
}
