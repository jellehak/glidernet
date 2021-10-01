function tableToJson(table) {
  var data = [];
  for (var i = 1; i < table.rows.length; i++) {
    var tableRow = table.rows[i];
    var rowData = [];
    for (var j = 0; j < tableRow.cells.length; j++) {
      rowData.push(tableRow.cells[j].innerHTML);
    }
    data.push(rowData);
  }
  return data;
}

const mapToObject = (arr = []) => {
  return {
    // index: arr[0],
    // towPlane: arr[1],
    // towPlaneType: arr[2],
    // glider: arr[3],
    // callSign: arr[4],
    // type: arr[5],
    // takeOff: arr[6],
    // gliderLanding: arr[7],
    // gliderTime: arr[8],
    // towPlaneLanding: arr[9],
    // towPlaneTime: arr[10],
    // towPlaneMaxAlt: arr[11],
    // remarks: arr[12],
    index: arr[0],
    towPlane: {
      registration: arr[1],
      type: arr[2],
      landing: arr[9],
      time: arr[10],
      maxAlt: arr[11],
    },
    registration: arr[3],
    callSign: arr[4],
    type: arr[5],
    takeOff: arr[6],
    landing: arr[7],
    time: arr[8],
    remarks: arr[12],
  };
};

const FILTER = {
  a: "EHSB",
  d: "26092021", // DDMMYYYY
};

/**
 * @example  
 * const day = await glidernetService.getLogbook({
      a: "EHSB",
      date: "26092021",
  })
 * @param {*} _filter 
 * @returns 
 */
export async function getLogbook(_filter = FILTER) {
  const filter = {
    ...FILTER,
    ..._filter,
  };

  const resp = await fetch(
    `${glidernetService.proxy}https://logbook.glidernet.org/index.php?a=${filter.a}&s=QFE&u=M&z=2&p=&t=0&td=15&d=${filter.d}`,
    {
      method: "GET",
    }
  ).then((elem) => elem.text());

  var parser = new DOMParser();
  var htmlDoc = parser.parseFromString(resp, "text/html");

  const tables = htmlDoc.getElementsByTagName("table");
  const table = tables[1];
  const data = tableToJson(table);
  
  return data.map(mapToObject);
}

export const glidernetService = {
  // Proxy to handle CORS
  proxy: "",
  getLogbook,
};
