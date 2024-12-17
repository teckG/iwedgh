"use client"; // For client-side rendering in Next.js
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import ExcelJS from "exceljs";  // Import ExcelJS
import { saveAs } from "file-saver";  // Import file-saver
import { Button } from "@/components/ui/button"; // shadcn button
import { Input } from "@/components/ui/input";   // shadcn input
import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table"; // shadcn table

export default function BudgetPlanner() {
  const [budgetItems, setBudgetItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", cost: 0, category: "" });

  const addBudgetItem = () => {
    if (newItem.name && newItem.cost > 0) {
      setBudgetItems([...budgetItems, newItem]);
      setNewItem({ name: "", cost: 0, category: "" });
      toast.success("Budget item added!");
    }
  };

  const calculateTotals = () => {
    const grandTotal = budgetItems.reduce((sum, item) => sum + item.cost, 0);
    const subtotals = budgetItems.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + item.cost;
      return acc;
    }, {});
    return { grandTotal, subtotals };
  };

  const handlePrint = () => {
    const printContent = document.getElementById("budget-report");
    const win = window.open("", "", "width=600,height=400");
    win.document.write(printContent.innerHTML);
    win.document.close();
    win.print();
  };

  const handleDownloadPDF = () => {
    const input = document.getElementById("budget-report");
    html2canvas(input).then((canvas) => {
      const pdf = new jsPDF();
      const imgData = canvas.toDataURL("image/png");
      const imgWidth = 190;
      const pageHeight = pdf.internal.pageSize.height;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let position = 0;

      pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
      pdf.save("my_budget_report_on_iwedgh.pdf");
    });
  };

  const handleDownloadExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Budget Report");

    // Add Header Row
    worksheet.addRow(["Item", "Cost", "Category"]);

    // Add Data Rows
    budgetItems.forEach(item => {
      worksheet.addRow([item.name, item.cost, item.category]);
    });

    // Add Total Row
    worksheet.addRow([]);
    worksheet.addRow(["Grand Total", grandTotal, ""]);

    // Style the sheet
    worksheet.columns.forEach(column => {
      column.width = 20;
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    saveAs(blob, "my_budget_report_on_iwedgh.xlsx");
  };

  const { grandTotal, subtotals } = calculateTotals();

  return (
    <div className="container mx-auto py-10">
      <Toaster />
      <h1 className="text-3xl font-bold mb-6 ">Budget Planner</h1>

      {/* Budget Item Form */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
        <Input
          type="text"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          placeholder="Item name..."
          className="w-full md:w-1/3"
        />
        <Input
          type="number"
          value={newItem.cost}
          onChange={(e) => setNewItem({ ...newItem, cost: +e.target.value })}
          placeholder="Cost..."
          className="w-full md:w-1/3"
        />
        <Input
          type="text"
          value={newItem.category}
          onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
          placeholder="Category..."
          className="w-full md:w-1/3"
        />
        <Button onClick={addBudgetItem} className="bg-[#fe8f40] text-white">
          Add Item
        </Button>
      </div>

      {/* Budget Report */}
      <div id="budget-report" className="p-6 rounded-lg ">
        <h2 className="font-bold text-lg mb-4">Budget Summary</h2>
        <Table className="min-w-full">
          <thead>
            <TableRow>
              <TableCell className="font-bold">Item</TableCell>
              <TableCell className="font-bold">Cost</TableCell>
              <TableCell className="font-bold">Category</TableCell>
            </TableRow>
          </thead>
          <TableBody>
            {budgetItems.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.cost.toLocaleString("en-GH", {
                  style: "currency",
                  currency: "GHS",
                  minimumFractionDigits: 2,
                })}</TableCell>
                <TableCell>{item.category}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <tfoot>
            <TableRow className="font-bold">
              <TableCell colSpan="2">Grand Total:</TableCell>
              <TableCell>
                {grandTotal.toLocaleString("en-GH", {
                  style: "currency",
                  currency: "GHS",
                  minimumFractionDigits: 2,
                })}
              </TableCell>
            </TableRow>
          </tfoot>
        </Table>
      </div>

      {/* Print, PDF, and Excel Buttons */}
      <div className="mt-8 flex justify-end gap-4">
        <Button onClick={handlePrint} className="bg-[#fe8f40] text-white">
          Print Budget
        </Button>
        <Button onClick={handleDownloadPDF} className="bg-[#fe8f40] text-white">
          Download PDF
        </Button>
        <Button onClick={handleDownloadExcel} className="bg-[#fe8f40] text-white">
          Download Excel
        </Button>
      </div>
    </div>
  );
}
