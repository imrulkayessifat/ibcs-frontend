import jsPDF from "jspdf";
import "jspdf-autotable";
// Date Fns is used to format the dates we receive
// from our API call
import { format } from "date-fns";

// define a generatePDF function that accepts a tickets argument
const generatePDF = (temp,balance) => {
  console.log(balance);
  const doc = new jsPDF();

  // define the columns we want and their titles
  const tableColumn = ["ObjectId", "uniqueId", "name", "rank", "address","mobile", "account","basic","houserent","medicalAllowance"];
  // define an empty array of rows
  const tableRows = [];

  // for each ticket pass all its data into an array
  temp?.forEach(ticket => {
    const ticketData = [
      ticket._id,
      ticket.uniqueId,
      ticket.name,
      ticket.rank,
      ticket.address,
      ticket.mobile,
      ticket.account,
      balance?.basic,
      balance?.houserent,
      balance?.medicalallowance
    ];
    tableRows.push(ticketData);
  });


  // startY is basically margin-top
  doc.autoTable(tableColumn, tableRows, { startY: 10 });
  const date = Date().split(" ");
  // we use a date string to generate our filename.
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  // // ticket title. and margin-top + margin-left
  // doc.text("Closed tickets within the last one month.", 14, 15);
  // we define the name of our PDF file.
  doc.save(`report_${dateStr}.pdf`);
};

export default generatePDF;