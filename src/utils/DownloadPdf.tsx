import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const DownloadPdf = () => {
  const element = document.getElementById("trainee-info");

  if (element) {
 
    const clonedElement = element.cloneNode(true) as HTMLElement;

    clonedElement.style.position = "absolute";
    clonedElement.style.top = "-9999px";
    document.body.appendChild(clonedElement);

    html2canvas(clonedElement, {
      scale: 1.2,
      useCORS: true,
      logging: true,
      backgroundColor: null,
      imageTimeout: 0,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png", 1.0);

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: [canvas.width, canvas.height],
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const padding = 20;

      pdf.addImage(
        imgData,
        "PNG",
        padding,
        padding,
        pdfWidth - padding * 2,
        pdfHeight - padding * 2
      );
      pdf.save("trainee-info.pdf");

      // Remove the cloned element from the DOM after download
      document.body.removeChild(clonedElement);
    });
  } else {
    console.error("Element with id 'trainee-info' not found.");
  }
};
