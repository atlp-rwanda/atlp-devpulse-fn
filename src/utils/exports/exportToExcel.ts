import * as XLSX from 'xlsx';

export const exportToExcel = ({ data, docName = 'Technical Stage Lists' }: { data: any[]; docName?: string }): void => {

  const validData = data
    .filter((item) => item)
    .map((item, index) => {
      const { email, firstName, lastName, status } = item.applicant || item;
      return { Count: index + 1, EMAIL: email, "FIRST NAME": firstName, "LAST NAME": lastName, "STATUS": status };
    })
    .filter((row) => row.EMAIL && row['FIRST NAME'] && row['LAST NAME'] && row.STATUS);


  if (validData.length === 0) {
    console.warn("No valid data to export!");
    return;
  }


  const worksheet = XLSX.utils.json_to_sheet(validData);


  const headerRow = Object.keys(validData[0]);
  const headerRange = XLSX.utils.decode_range(worksheet['!ref']!);


  headerRow.forEach((header, index) => {
    const cellAddress = XLSX.utils.encode_cell({ r: 0, c: index });
    if (!worksheet[cellAddress]) return;
    worksheet[cellAddress].s = {
      fill: { fgColor: { rgb: "FFFF00" } },
      font: { bold: true, color: { rgb: "000000" } },
      alignment: { horizontal: "center", vertical: "center" }
    };
  });

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');


  const fileName = `${docName}.xlsx`;
  XLSX.writeFile(workbook, fileName);

  console.log(`Excel file created: ${fileName}`);
};
