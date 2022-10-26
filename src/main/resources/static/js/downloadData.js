function getHeaders(){
       return {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //'Authorization': localStorage.token
        };
}

async function clientData(){
      const request = await fetch('api/clientes', {
        method: 'GET',
        headers: getHeaders()
      });

      const clients = await request.json();

      console.log(clients);

      jsonToCsv(clients);

       console.log(jsonToCsv);

      downloadInfo(jsonToCsv);

      console.log(downloadInfo);
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

  function downloadInfo(data) {
      var blob = new Blob([data], {type: "text/plain;charset=utf-8"});
  saveAs(blob, "clientes.csv");
  }
