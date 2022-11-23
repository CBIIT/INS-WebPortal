export function createFileName(fileName) {
  const date = new Date();
  const yyyy = date.getFullYear();
  let dd = date.getDate();
  let mm = (date.getMonth() + 1);

  if (dd < 10) { dd = `0${dd}`; }

  if (mm < 10) { mm = `0${mm}`; }

  const todaysDate = `${yyyy}-${mm}-${dd}`;

  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  if (hours < 10) { hours = `0${hours}`; }

  if (minutes < 10) { minutes = `0${minutes}`; }

  if (seconds < 10) { seconds = `0${seconds}`; }

  return `${fileName} ${todaysDate} ${hours}-${minutes}-${seconds}${'.csv'}`;
}

export function convertToCSV(jsonse, keysToInclude, header) {
  const objArray = jsonse;
  // To Do empty object just print headers
  const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
  let str = '';
  array.map((entry, index) => {
    let line = '';
    keysToInclude.map((keyName) => {
      if (line !== '') line += ',';
      let columnResult = entry[keyName];
      if (typeof columnResult === 'string') {
        const intialColumnResult = columnResult.replace(/"/g, '""');
        columnResult = intialColumnResult;
        if (columnResult.search(/("|,|\n)/g) >= 0) {
          columnResult = `"${columnResult}"`;
        }
      }

      if (columnResult !== null && typeof columnResult === 'object') {
        let finalColumnResult = '';

        for (let i = 0; i < columnResult.length; i += 1) {
          if (i === 0) {
            finalColumnResult += `"${columnResult[0]}`;
          } else {
            finalColumnResult += `, ${columnResult[i]}`;
          }
        }

        columnResult = `${finalColumnResult}"`;
      }

      line += columnResult !== null ? columnResult : ' ';
      return line;
    });
    if (index === 0) {
      str = header.join(',');
      str += `\r\n${line}\r\n`;
    } else {
      str += `${line}\r\n`;
    }
    return str;
  });
  return str;
}

export function downloadJson(tableData, tableDownloadCSV) {
  const jsonse = JSON.stringify(tableData);
  const csv = convertToCSV(jsonse, tableDownloadCSV.keysToInclude, tableDownloadCSV.header);
  const exportData = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8' });
  const JsonURL = window.URL.createObjectURL(exportData);
  let tempLink = '';
  tempLink = document.createElement('a');
  tempLink.setAttribute('href', JsonURL);
  tempLink.setAttribute('download', createFileName(tableDownloadCSV.fileName || ''));
  document.body.appendChild(tempLink);
  tempLink.click();
  document.body.removeChild(tempLink);
}
