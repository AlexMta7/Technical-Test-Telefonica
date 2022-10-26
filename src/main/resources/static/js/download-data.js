
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
    
    const datos_fusionados = Object.assign(clientes,documentos,direcciones) ;
    const data = datos_fusionados;
    
    const csv = jsonToCsv(data);
  
    downloadData(csv);
    //console.log(csv);
}
    
function downloadData(data) {
    var blob = new Blob([data], {type: "text/plain;charset=utf-8"});
saveAs(blob, "hello world.csv");
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
  

  
