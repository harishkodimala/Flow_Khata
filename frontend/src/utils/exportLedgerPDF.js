import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportLedgerPDF = (
  customer,
  transactions
) => {

  const doc =
    new jsPDF();

  doc.setFontSize(20);

  doc.text(
    "Udhaar Khata Ledger",
    14,
    20
  );

  doc.setFontSize(12);

  doc.text(
    `Customer: ${customer.name}`,
    14,
    35
  );

  doc.text(
    `Phone: ${customer.phone}`,
    14,
    43
  );

  doc.text(
    `Balance: ₹${customer.currentBalance}`,
    14,
    51
  );

  autoTable(doc, {

    startY: 65,

    head: [[

      "Date",

      "Type",

      "Amount",

      "Note"

    ]],

    body:
      transactions.map(
        (transaction) => [

          new Date(
            transaction.createdAt
          ).toLocaleDateString(
            "en-IN"
          ),

          transaction.type,

          `₹${transaction.amount}`,

          transaction.note ||
          "-"

        ]
      )

  });

  doc.save(
    `${customer.name}-ledger.pdf`
  );

};