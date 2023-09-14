import jsPDF from "jspdf";
import "jspdf-autotable";

import { format } from "date-fns";

const generatePDF = (temp, balance) => {
  const doc = new jsPDF();

  const tableColumn = [
    "ObjectId",
    "uniqueId",
    "name",
    "rank",
    "address",
    "mobile",
    "account",
    "basic",
    "houserent",
    "medicalAllowance",
  ];

  const tableRows = [];
  if (Array.isArray(temp)) {
    temp?.forEach((ticket) => {
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
        balance?.medicalallowance,
      ];
      tableRows.push(ticketData);
    });
  }


  doc.autoTable(tableColumn, tableRows, { startY: 10 });
  const date = Date().split(" ");

  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];

  doc.save(`report_${dateStr}.pdf`);
};

export default generatePDF;
