document.addEventListener("DOMContentLoaded", function () {
	setupSummaryTab();
});

function setupSummaryTab() {
	const summaryTab = document.querySelector('.nav-link[href="#summary"]');
	if (summaryTab) {
		summaryTab.addEventListener("shown.bs.tab", function (event) {
			drawChartsAndSummary();
		});
	}
}

//CREATE A DOWNLOAD PDF FILE OR SEND A COPY TO YOUR EMAIL
