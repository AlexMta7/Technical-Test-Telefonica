
async function getDataToDownload() {
    const requestClients = await fetch('api/clients', {
        method: 'GET',
        headers: getHeaders()
    });

    const requestDocuments = await fetch('api/docs', {
        method: 'GET',
        headers: getHeaders()
    });

    const requestAddresses = await fetch('api/address', {
        method: 'GET',
        headers: getHeaders()
    });

    const clientes = await requestClients.json();
    const documentos = await requestDocuments.json();
    const direcciones = await requestAddresses.json();
    console.log(clientes);
    console.log(documentos);
    console.log(direcciones);

    if (clientes == "") {
        console.log("No hay datos de clientes");
        return;
    }
    else {
        const csvClientes = jsonToCsv(clientes);
        downloadData(csvClientes, 'clientes');  
        
        if (documentos == "") {
            console.log("No hay datos de documentos");
        }
        else {
            const csvDocumentos = jsonToCsv(documentos);
            downloadData(csvDocumentos,'documentos_de_clientes');    
        }

        if (direcciones == "") {
            console.log("No hay datos de direcciones");
            return;
        }
        else {
            const csvDirecciones = jsonToCsv(direcciones);
            downloadData(csvDirecciones,'direcciones_de_clientes');    
        }
    }  
    // const datos_fusionados = Object.assign(clientes,documentos,direcciones) ;
    // const data = datos_fusionados;
    
  
    //(archivo,nombre para descargar)
    //console.log(csv);
}
    
function downloadData(data,name) {
    var blob = new Blob([data], {type: "text/plain;charset=utf-8"});
saveAs(blob, "reporte_"+name+".csv");
}

function jsonToCsv(items) {
    const header = Object.keys(items[0]);
  
    const headerString = header.join(',');
  
    // handle null or undefined values here
    const replacer = (key, value) => value ?? '';
  
    const rowItems = items.map((row) =>
      header
        .map((fieldName) => JSON.stringify(row[fieldName], replacer))
        .join(',')
    );
  
    // join header and body, and break into separate lines
    const csv = [headerString, ...rowItems].join('\r\n');
  
    return csv;
  }
  

  
