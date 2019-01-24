const fs = require('fs')
const path = require('path')

var ruta = '../../../Documents/MIGRACION/Intelisis5000/Reportes MAVI'
var ruta1= '../../../Documents/MIGRACION/Intelisis3100/Codigo Original'
var Archivo = 'test1/Tablas.txt'
var Archivo1 = 'test1/Tablas3100.txt'
var Interseccion= 'test1/Interseccion.txt'
var files = fs.readdirSync(ruta).filter(x => ['.vis','.rep'].indexOf(path.extname(x)) > -1)

let listatablas=['CFDFlexEmpresaGral','Empresa']
files.forEach(file => {
    fileType = fs.statSync(path.join(ruta,file))
    if(fileType.isFile()){
        var texto = fs.readFileSync(path.join(ruta,file),{encoding:'latin1'}) 
    }
    if(/\[Vista[\W\w]*?(?=(^\[|^$))/m.test(texto)){
        let vista = texto.match(/\[Vista[\W\w]*?(?=^\[)/m)
        if(/VistaIndependiente=\w*/gim.test(vista)){}
        else if (/ListaTablas=\w.*/gim.test(vista)){
            let vista1 = texto.match(/(?<=ListaTablas=).*/gim).join('')
            let separar= vista1.split('<BR>')
            separar.forEach(x => {
                listatablas.push(x+'.tbl')
            })
            listatablas.sort(); 
            for(var i = 1; i < listatablas.length; ){ 
                if(listatablas[i-1] == listatablas[i]){
                 listatablas.splice(i, 1); 
                }
                else { 
                    i++; 
                } 
            }
            fs.writeFileSync(Archivo, listatablas.join('\n'))
            }
        }
    })
console.log(listatablas)

let tablas3100=[]
var listaTbl = fs.readdirSync(ruta1).filter(x => ['.tbl'].indexOf(path.extname(x)) > -1)
   listaTbl.forEach(tabla => {
        tablas3100.push(tabla)
        fs.writeFileSync(Archivo1, tablas3100.join('\n'))
        console.log(tablas3100)
    })

  let final=[]
  listatablas.forEach((e1)=>tablas3100.forEach((e2)=>{
      if(e1===e2){
        final.push(e1)
      }
   }
  ))
  fs.writeFileSync(Interseccion, final.join('\n'))
  console.log(final)
