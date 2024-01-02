import React, { ChangeEvent, useState } from "react";
import * as XLSX from "xlsx";

interface PresaleData {
  identity: string;
  name: string;
  school: string;
  class: string;
  cellPhone: string;
  homePhoneNumber: string;
  sourceBranchCampus: string;
  responsibleBranchCampus: string;
  salesperson: string;
  applicationTime: string;
  labels: string[];
  courses: string[];
}

const ExcelParser: React.FC = () => {
  const [presaleData, setPresaleData] = useState<Array<string>>([]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const data = e.target?.result;
        if (typeof data === "string") {
          parseExcelData(data);
        }
      };

      reader.readAsBinaryString(file);
    }
  };

  const parseExcelData = (binaryData: string) => {
    const workbook = XLSX.read(binaryData, { type: "binary" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    const parsedData: any = XLSX.utils.sheet_to_json(sheet, {
      header: 1,
      range: 1, // Start parsing from the second row (index 1)
    });
    console.log(parsedData[0]);
    setPresaleData(parsedData[0]);
  };

  return (
    <div>
      <input type="file" id="fileInput" onChange={handleFileChange} />
      <table style={{ fontSize: "10px", textAlign: "left" }}>
        <thead>
          <tr>
            <th>Identity</th>
            <th>Name</th>
            <th>School</th>
            <th>Class</th>
            <th>Cell Phone</th>
            <th>Home Phone Number</th>
            <th>Source Branch Campus</th>
            <th>Responsible Branch Campus</th>
            <th>Salesperson</th>
            <th>Application Time</th>
            <th>Labels</th>
            <th>Courses</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {presaleData.map((data: any, index) => {
              return <td key={index}>{data}</td>;
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ExcelParser;
