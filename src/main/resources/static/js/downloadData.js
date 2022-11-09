function getHeaders(){
       return {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        };
}

async function clientData(){
      const request = await fetch('api/clients', {
        method: 'GET',
        headers: getHeaders()
      });

      const clients = await request.json();

      //Se convierte el json obtenido a un archivo CSV
      const fileCsv = jsonToCsv(clients);

      //Se manda a descarga el archivo con la información de los CLIENTES
      download(fileCsv);
}

async function docData(){
      const request = await fetch('api/docs/clients', {
        method: 'GET',
        headers: getHeaders()
      });

      const docs = await request.json();

      //Se convierte el json obtenido a un archivo CSV
      const fileCsvDocs = jsonToCsv(docs);

      //Se manda a descarga el archivo con la información de los CLIENTES
      downloadDocs(fileCsvDocs);
}


async function addressData(){
      const request = await fetch('api/address/clients', {
        method: 'GET',
        headers: getHeaders()
      });

      const addressC = await request.json();

      //Se convierte el json obtenido a un archivo CSV
      const fileCsvAddress = jsonToCsv(addressC);

      //Se manda a descarga el archivo con la información de los CLIENTES
      downloadDir(fileCsvAddress);
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

  function download(data) {
      var blob = new Blob([data], {type: "text/plain;charset=utf-8"});
      saveAs(blob, "clientes.csv");
  }

  function downloadDocs(data) {
      var blob = new Blob([data], {type: "text/plain;charset=utf-8"});
      saveAs(blob, "documentos.csv");
  }

    function downloadDir(data) {
      var blob = new Blob([data], {type: "text/plain;charset=utf-8"});
      saveAs(blob, "direcciones.csv");
  }
