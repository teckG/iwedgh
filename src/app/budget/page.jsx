"use client"; 
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import ExcelJS from "exceljs"; 
import { saveAs } from "file-saver"; 
import { Button } from "@/components/ui/button"; 
import { Input } from "@/components/ui/input"; 
import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table"; 

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

  const handleDownloadExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Budget Report");

    worksheet.addRow(["Item", "Cost", "Category"]);

    budgetItems.forEach((item) => {
      worksheet.addRow([item.name, item.cost, item.category]);
    });

    worksheet.addRow([]);
    worksheet.addRow(["Grand Total", calculateTotals().grandTotal, ""]);

    worksheet.columns.forEach((column) => {
      column.width = 20;
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "budget_report.xlsx");
  };

  const { grandTotal, subtotals } = calculateTotals();

  return (
    <div className="container mx-auto py-10 px-4 md:px-10">
      <Toaster />
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6">Budget Planner</h1>

      {/* Budget Item Form */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Input
          type="text"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          placeholder="Item name"
          className="w-full"
        />
        <Input
          type="number"
          value={newItem.cost}
          onChange={(e) => setNewItem({ ...newItem, cost: +e.target.value })}
          placeholder="Cost"
          className="w-full"
        />
        <Input
          type="text"
          value={newItem.category}
          onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
          placeholder="Category"
          className="w-full"
        />
        <Button
          onClick={addBudgetItem}
          className="bg-[#fe8f40] text-white w-full"
        >
          Add Item
        </Button>
      </div>

      {/* Budget Report */}
      <div id="budget-report" className="bg-white p-6 shadow-md rounded-md">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Budget Summary</h2>
        <Table className="min-w-full text-left">
          <thead className="border-b">
            <TableRow>
              <TableCell className="font-bold py-2">Item</TableCell>
              <TableCell className="font-bold py-2">Cost</TableCell>
              <TableCell className="font-bold py-2">Category</TableCell>
            </TableRow>
          </thead>
          <TableBody>
            {budgetItems.length > 0 ? (
              budgetItems.map((item, index) => (
                <TableRow key={index} className="border-b">
                  <TableCell className="py-2">{item.name}</TableCell>
                  <TableCell className="py-2">
                    {item.cost.toLocaleString("en-GH", {
                      style: "currency",
                      currency: "GHS",
                      minimumFractionDigits: 2,
                    })}
                  </TableCell>
                  <TableCell className="py-2">{item.category}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="3" className="text-center py-4">
                  No items added yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          {budgetItems.length > 0 && (
            <tfoot>
              <TableRow className="font-bold">
                <TableCell className="py-2">Grand Total:</TableCell>
                <TableCell className="py-2">
                  {grandTotal.toLocaleString("en-GH", {
                    style: "currency",
                    currency: "GHS",
                    minimumFractionDigits: 2,
                  })}
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </tfoot>
          )}
        </Table>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex justify-end gap-4">
       
        <Button
          onClick={handleDownloadExcel}
          className="bg-[#fe8f40] text-white"
        >
          Download Excel
        </Button>
      </div>
    </div>
  );
}
