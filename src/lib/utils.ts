import {RecognitionResult} from "@/components/Dashboard";

export function printData(data: RecognitionResult[]) {
  const printContent = data
    .map(
      (item) => `
    <tr>
      <td>${item.name}</td>
      <td>${item.timestamp.toLocaleString()}</td>
      <td>${item.status}</td>
    </tr>
  `
    )
    .join("");

  const html = `
    <html>
      <head>
        <title>Recognition Results</title>
        <style>
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1px solid black; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
        </style>
      </head>
      <body>
        <h1>Recognition Results</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Timestamp</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${printContent}
          </tbody>
        </table>
      </body>
    </html>
  `;

  const printWindow = window.open("", "_blank");
  if (printWindow) {
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.print();
  }
}

export function exportToExcel(data: RecognitionResult[]) {
  const headers = ["Name", "Timestamp", "Status"];
  const csvContent = [
    headers.join(","),
    ...data.map((item) =>
      [item.name, item.timestamp.toLocaleString(), item.status].join(",")
    ),
  ].join("\n");

  const blob = new Blob([csvContent], {type: "text/csv;charset=utf-8;"});
  const link = document.createElement("a");
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "recognition_results.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
export const cn = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};
