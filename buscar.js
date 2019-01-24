const fs = require('fs')
const path = require('path')

var ruta = '../../../Documents/MIGRACION/BusquedadTablas/test'
var Archivo = 'test1/Tablas.txt'
var files = fs.readdirSync(ruta).filter(x => ['.vis','.rep'].indexOf(path.extname(x)) > -1)

let listatablas=['CFDFlexEmpresaGral','Empresa']
files.forEach(file => {
    fileType = fs.statSync(path.join(ruta,file))
    if(fileType.isFile()){
        var texto = fs.readFileSync(path.join(ruta,file),{encoding:'latin1'}) 
    }
    if(/\[Vista[\W\w]*?(?=(^\[|^$))/m.test(texto)){
        let vista = texto.match(/\[Vista[\W\w]*?(?=^\[)/m).join('')
        if(/VistaIndependiente=\w*/gim.test(vista)){}
        else if (/ListaTablas=\w.*/gim.test(vista)){
            let vista1 = texto.match(/(?<=ListaTablas=).*/gim).join('')
            let separar= vista1.split('<BR>')
            separar.forEach(x => {
                listatablas.push(x)
            })
            fs.writeFileSync(Archivo, listatablas)
            }
        }
    })
console.log(listatablas)

