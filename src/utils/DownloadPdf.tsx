import html2canvas from "html2canvas";
import jspdf from "jspdf";

export const DownloadPdf = (
  elementId,
  filename = "Trainee-Information.pdf"
) => {
  const element = document.getElementById(elementId);

  if (element) {
    html2canvas(element)
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jspdf();
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

        pdf.addImage(imgData, "PNG", 0, 0, imgWidth * ratio, imgHeight * ratio);
        pdf.save(filename);
      })
      .catch((error) => {
        console.error("Error capturing the div as PDF:", error);
      });
  }
};
