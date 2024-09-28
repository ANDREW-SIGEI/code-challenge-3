
let basicSalary = parseFloat(prompt("Enter your basic salary:"));
let benefits = parseFloat(prompt("Enter your benefits:"));


const KRA_RATE = 0.3;
const NHIF_RATE = 0.015;
const NSSF_RATE = 0.06;

// Calculate payee (tax), NHIF deductions, and NSSF deductions
let payee = KRA_RATE * basicSalary;
let nhifDeductions = NHIF_RATE * (basicSalary + benefits);
let nssfDeductions = NSSF_RATE * basicSalary;

// Calculate gross salary and net salary
let grossSalary = basicSalary + benefits;
let netSalary = grossSalary - payee - nhifDeductions - nssfDeductions;

// Print results
console.log("Payee (Tax): KES", payee);
console.log("NHIF Deductions: KES", nhifDeductions);
console.log("NSSF Deductions: KES", nssfDeductions);
console.log("Gross Salary: KES", grossSalary);
console.log("Net Salary: KES", netSalary);
