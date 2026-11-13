// Mock data only. No database yet.

export const currentPeriod = {
  label: "Oct 11–25, 2026",
  payDate: "Oct 30, 2026",
  status: "Review" as PeriodStep,
};

export const periodSteps = [
  "Attendance",
  "Compute",
  "Review",
  "Approve",
  "Locked",
  "Released",
] as const;
export type PeriodStep = (typeof periodSteps)[number];

export const kpis = {
  teaching: 86,
  nonTeaching: 42,
  gross: 2_184_350.5,
  deductions: 412_870.25,
  net: 1_771_480.25,
};

export const netPerCutoff = [
  { period: "Jul 26–Aug 10", short: "Aug 10", net: 1_702_110, gross: 2_098_400 },
  { period: "Aug 11–25", short: "Aug 25", net: 1_715_430, gross: 2_115_900 },
  { period: "Aug 26–Sep 10", short: "Sep 10", net: 1_698_250, gross: 2_092_300 },
  { period: "Sep 11–25", short: "Sep 25", net: 1_740_980, gross: 2_146_800 },
  { period: "Sep 26–Oct 10", short: "Oct 10", net: 1_752_600, gross: 2_160_150 },
  { period: "Oct 11–25", short: "Oct 25", net: 1_771_480, gross: 2_184_350 },
];

export const costByDepartment = [
  { dept: "Pre-school", headcount: 9, cost: 142_500, change: 1.2 },
  { dept: "Elementary", headcount: 28, cost: 486_200, change: 0.8 },
  { dept: "JHS", headcount: 24, cost: 431_750, change: -0.6 },
  { dept: "SHS", headcount: 17, cost: 352_900, change: 2.4 },
  { dept: "College", headcount: 23, cost: 498_300, change: 3.1 },
  { dept: "Admin/Staff", headcount: 27, cost: 272_700, change: 0.0 },
];

export type RemittanceStatus = "Pending" | "Filed" | "Paid";

export const remittances: {
  agency: string;
  form: string;
  amount: number;
  due: string;
  status: RemittanceStatus;
}[] = [
  { agency: "SSS", form: "R-3", amount: 168_420, due: "Oct 31, 2026", status: "Filed" },
  { agency: "PhilHealth", form: "RF-1", amount: 109_215, due: "Oct 31, 2026", status: "Pending" },
  { agency: "Pag-IBIG", form: "MCRF", amount: 25_600, due: "Oct 15, 2026", status: "Paid" },
  { agency: "BIR", form: "1601-C", amount: 214_380, due: "Nov 10, 2026", status: "Pending" },
];

export type RegisterRow = {
  id: string;
  name: string;
  category: "Teaching" | "Non-teaching";
  dept: string;
  gross: number;
  deductions: number;
  net: number;
};

export const register: RegisterRow[] = [
  { id: "T-0012", name: "Santos, Maria L.", category: "Teaching", dept: "College", gross: 24_500, deductions: 4_820.5, net: 19_679.5 },
  { id: "T-0034", name: "Reyes, Jose P.", category: "Teaching", dept: "SHS", gross: 19_750, deductions: 3_610.25, net: 16_139.75 },
  { id: "T-0057", name: "Cruz, Ana M.", category: "Teaching", dept: "Elementary", gross: 16_200, deductions: 2_745, net: 13_455 },
  { id: "P-0103", name: "Bautista, Mark R.", category: "Teaching", dept: "College", gross: 12_600, deductions: 1_260, net: 11_340 },
  { id: "N-0008", name: "Garcia, Liza T.", category: "Non-teaching", dept: "Admin/Staff", gross: 15_400, deductions: 2_480.75, net: 12_919.25 },
  { id: "T-0061", name: "Mendoza, Carlo D.", category: "Teaching", dept: "JHS", gross: 18_100, deductions: 3_150, net: 14_950 },
  { id: "N-0021", name: "Villanueva, Ramon S.", category: "Non-teaching", dept: "Admin/Staff", gross: 9_850, deductions: 1_120.5, net: 8_729.5 },
  { id: "T-0078", name: "Aquino, Grace F.", category: "Teaching", dept: "Pre-school", gross: 14_300, deductions: 2_210, net: 12_090 },
  { id: "N-0033", name: "Torres, Ben J.", category: "Non-teaching", dept: "Admin/Staff", gross: 8_900, deductions: 980, net: 7_920 },
  { id: "T-0090", name: "Flores, Kristine A.", category: "Teaching", dept: "SHS", gross: 20_250, deductions: 3_890.4, net: 16_359.6 },
];

export const alerts: { level: "warn" | "info"; text: string }[] = [
  { level: "warn", text: "3 employees have missing DTR records this cut-off." },
  { level: "warn", text: "PhilHealth RF-1 not yet filed — due Oct 31." },
  { level: "info", text: "2 SSS salary loans end this period." },
  { level: "info", text: "13th month pay must be released by Dec 24." },
];

export const navItems = [
  { href: "/", label: "Dashboard" },
  { href: "/employees", label: "Employees" },
  { href: "/timekeeping", label: "Timekeeping" },
  { href: "/payroll-runs", label: "Payroll Runs" },
  { href: "/loans", label: "Loans" },
  { href: "/remittances", label: "Government Remittances" },
  { href: "/reports", label: "Reports" },
  { href: "/settings", label: "Settings" },
];

export const currentUser = { name: "Payroll Officer", role: "HR & Payroll", initials: "PO" };

export const checklist = [
  { task: "Import DTR / biometrics", date: "Oct 26, 2026", done: true },
  { task: "Compute payroll", date: "Oct 27, 2026", done: true },
  { task: "Review payroll register", date: "Due Oct 28, 2026", done: false },
  { task: "Approve (Finance head)", date: "Due Oct 29, 2026", done: false },
  { task: "Lock period & upload bank file", date: "Due Oct 30, 2026", done: false },
];

export const peso = (n: number) =>
  "₱" + n.toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
