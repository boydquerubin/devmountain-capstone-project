async function downloadSummaryAsPDF() {
	const jsPDF = window.jspdf.jsPDF; // Make sure jsPDF is also correctly included

	// Ensure html2canvas is defined
	if (typeof html2canvas === "undefined") {
		alert("html2canvas is not loaded. Please check your script tags.");
		return;
	}

	html2canvas(document.querySelector("#summary")).then((canvas) => {
		const imgData = canvas.toDataURL("image/png");
		const pdf = new jsPDF({
			orientation: "landscape",
		});

		const imgProps = pdf.getImageProperties(imgData);
		const pdfWidth = pdf.internal.pageSize.getWidth();
		const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
		pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
		pdf.save("summary.pdf");
	});
}
