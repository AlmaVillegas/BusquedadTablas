const fs = require('fs')
const path = require('path')

var ruta = '../../../Documents/MIGRACION/BusquedadTablas/test'
var nuevaCarpeta = 'test1/'
var files = fs.readdirSync(ruta).filter(x => ['.vis','.rep'].indexOf(path.extname(x)) > -1)

files.forEach(file => {
 fileType = fs.statSync(path.join(ruta,file))
 if(fileType.isFile()){
  var texto = fs.readFileSync(path.join(ruta,file),{encoding:'latin1'}) 
 }
     if(/\[Vista[\W\w]*?(?=(^\[|^$))/m.test(texto))
        {
            // fs.writeFileSync('test/texto.txt', texto)
            let vista = texto.match(/\[Vista[\W\w]*?(?=^\[)/m).join('')
            
            fs.writeFileSync('test/vista.txt', vista)
        }
      //texto = texto.match(/^\[Vista[\W\w]*?(?=(^\[|^$))/m)
      //texto = texto.match(/ListaTablas=\w*/gim)
      //texto = texto.match(/VistaIndependiente=\w*/gim)
      console.log(texto)
      //console.log(texto.match(/ListaTablas=\w*/gim))
      //console.log(texto.match(/VistaIndependiente=\w*/gim))
     fs.writeFile(nuevaCarpeta+file, texto, function (err) {
        if (err) {
          return console.log(err)
        }
    })
})