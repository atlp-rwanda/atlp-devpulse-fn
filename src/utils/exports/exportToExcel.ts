import * as XLSX from "xlsx";
import toast from "react-hot-toast";

type ValidDataRow = {
  Count: number;
  EMAIL: string;
  "FIRST NAME": string;
  "LAST NAME": string;
  STATUS: string;
  PLATFORM?: string | null;
  LINK?: string | null;
};

export const exportToExcel = ({
  data,
  docName = "Technical Stage Lists",
}: {
  data: any[];
  docName?: string;
}): void => {
  if (!data || data.length === 0) {
    toast.error("Input data is empty!");
    return;
  }

  const validData: ValidDataRow[] = data
    .filter((item) => item) // Ensure the item is not null or undefined
    .map((item, index) => {
      // Extract nested properties from applicant and root
      const {
        email,
        firstName,
        lastName,
        status: applicantStatus,
      } = item.applicant || {};

      const { platform, invitationLink, status: rootStatus } = item;

      // Use rootStatus if applicantStatus is undefined
      const status = applicantStatus || rootStatus;

      // Build the formatted row
      const formattedRow: ValidDataRow = {
        Count: index + 1,
        EMAIL: email,
        "FIRST NAME": firstName,
        "LAST NAME": lastName,
        STATUS: status,
      };

      // Add PLATFORM and LINK if status is "Invited"
      if (status?.toLowerCase() === "invited") {
        formattedRow.PLATFORM = platform;
        formattedRow.LINK = invitationLink;
      }

      return formattedRow;
    })
    .filter(
      (row) =>
        row.EMAIL &&
        row["FIRST NAME"] &&
        row["LAST NAME"] &&
        (row.STATUS?.toLowerCase() !== "invited" || (row.PLATFORM && row.LINK))
    );

  if (validData.length === 0) {
    toast.error("No valid data to export!");
    return;
  }

  const worksheet = XLSX.utils.json_to_sheet(validData);

  const headerRow = Object.keys(validData[0]);
  headerRow.forEach((header, index) => {
    const cellAddress = XLSX.utils.encode_cell({ r: 0, c: index });
    if (!worksheet[cellAddress]) return;
    worksheet[cellAddress].s = {
      fill: { fgColor: { rgb: "FFFF00" } },
      font: { bold: true, color: { rgb: "000000" } },
      alignment: { horizontal: "center", vertical: "center" },
    };
  });

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  const currentDate = new Date().toISOString().split("T")[0];
  const fileName = `${docName}_${currentDate}.xlsx`;
  XLSX.writeFile(workbook, fileName);

  toast.success(`Excel file created: ${fileName}`);
};
