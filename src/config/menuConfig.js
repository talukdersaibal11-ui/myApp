// src/config/menuConfig.js
import {
    Home,
    Building2,
    FolderTree,
    Layers,
    Tags,
    Briefcase,
    Users,
    UserCheck,
    Package,
    ShoppingBag,
    UserPlus,
    UserCircle,
    ClipboardList,
    Truck,
    ShoppingCart,
    FileText,
    AlertTriangle,
    BarChart3,
    DollarSign,
    CreditCard,
    Landmark,
    MapPin,
    Database,
    Settings,
} from "lucide-react";

export const menuItems = [{
        name: "Dashboard",
        icon: Home,
        route: "/home",
        type: "protected",
    },
    {
        name: "Showroom",
        icon: Building2,
        type: "protected",
        children: [
            { name: "Add Showroom", route: "/add/showroom" },
            { name: "All Showroom", route: "/all/showroom" },
            { name: "Showroom Transaction", route: "/showroom/transaction" },
            { name: "All Showroom Transaction", route: "/showroom/transaction/all" },
        ],
    },
    {
        name: "Category",
        icon: FolderTree,
        children: [
            { name: "Add Category", route: "/add/category" },
            { name: "All Category", route: "/all/category" },
        ],
    },
    {
        name: "Sub Category",
        icon: Layers,
        children: [
            { name: "Add Sub Category", route: "/add/subcategory" },
            { name: "All Sub Category", route: "/all/subcategory" },
        ],
    },
    {
        name: "Brand",
        icon: Tags,
        children: [
            { name: "Add Brand", route: "/add/brand" },
            { name: "All Brand", route: "/all/brand" },
        ],
    },
    {
        name: "Department",
        icon: Briefcase,
        children: [
            { name: "Add Department", route: "/department/add" },
            { name: "All Department", route: "/department/all" },
        ],
    },
    {
        name: "Designation",
        icon: UserCheck,
        children: [
            { name: "Add Designation", route: "/designation/add" },
            { name: "All Designation", route: "/designation/all" },
        ],
    },
    {
        name: "Product",
        icon: Package,
        children: [
            { name: "Add Product", route: "/add/product" },
            { name: "All Products", route: "/all/product" },
            { name: "Damage Product", route: "/product/damage" },
        ],
    },
    {
        name: "SR",
        icon: Users,
        children: [
            { name: "Add SR", route: "/sr/add" },
            { name: "All SR", route: "/sr/all" },
            { name: "Transaction", route: "/sr/transaction" },
            { name: "All Transaction", route: "/sr/transaction/all" },
        ],
    },
    {
        name: "Client",
        icon: UserPlus,
        children: [
            { name: "Add Client", route: "/client/add" },
            { name: "All Clients", route: "/client/all" },
            { name: "Transaction", route: "/client/transaction" },
            { name: "All Transaction", route: "/client/transaction/all" },
        ],
    },
    {
        name: "Supplier",
        icon: Truck,
        children: [
            { name: "Add Supplier", route: "/supplier/add" },
            { name: "All Supplier", route: "/supplier/all" },
            { name: "Transaction", route: "/supplier/transaction" },
            { name: "All Transaction", route: "/supplier/transaction/all" },
        ],
    },
    {
        name: "DO Order",
        icon: ClipboardList,
        children: [
            { name: "Add DO Order", route: "/do/add" },
            { name: "All DO Order", route: "/do/all" },
            { name: "Return DO Order", route: "/do/return" },
            { name: "All Return DO Order", route: "/do/return/all" },
        ],
    },
    {
        name: "Purchase",
        icon: ShoppingBag,
        children: [
            { name: "Add Purchase", route: "/purchase/add" },
            { name: "All Purchase", route: "/purchase/all" },
            { name: "Return Purchase", route: "/purchase/return" },
            { name: "All Return Purchase", route: "/purchase/return/all" },
        ],
    },
    {
        name: "Sale",
        icon: ShoppingCart,
        children: [
            { name: "Add Sale", route: "/add/sale" },
            { name: "All Sale", route: "/sale/all" },
            { name: "Return Sale", route: "/sale/return" },
            { name: "All Return Sale", route: "/sale/return/all" },
        ],
    },
    {
        name: "Claim",
        icon: AlertTriangle,
        children: [
            { name: "Claim Recover", route: "/claim/recover" },
            { name: "All Claim", route: "/claim/all" },
            { name: "Delete Claim", route: "/claim/delete" },
        ],
    },
    {
        name: "Damage",
        icon: AlertTriangle,
        children: [
            { name: "Damage Recover", route: "/damage/recover" },
            { name: "All Damage", route: "/damage/all" },
            { name: "Clear Damage", route: "/damage/clear" },
        ],
    },
    {
        name: "Stock",
        icon: BarChart3,
        children: [
            { name: "Damage Stock", route: "/stock/damage" },
            { name: "Daily Stock", route: "/stock/daily" },
            { name: "Stock", route: "/stock/all" },
        ],
    },
    {
        name: "Employee",
        icon: Users,
        children: [
            { name: "Add Employee", route: "/employee/add" },
            { name: "All Employee", route: "/employee/all" },
            { name: "Leave Type", route: "/employee/leave-type" },
            { name: "Leave Request", route: "/employee/leave-request" },
            { name: "Leave Assign", route: "/employee/leave-assign" },
        ],
    },
    {
        name: "Attendance",
        icon: UserCircle,
        children: [
            { name: "Add Attendance", route: "/attendance/add" },
            { name: "All Attendance", route: "/attendance/all" },
        ],
    },
    {
        name: "Salary",
        icon: DollarSign,
        children: [
            { name: "Add Salary", route: "/salary/add" },
            { name: "All Salary", route: "/salary/all" },
            { name: "Advance", route: "/salary/advance" },
            { name: "All Advanced", route: "/salary/advance/all" },
        ],
    },
    {
        name: "Report",
        icon: FileText,
        children: [
            { name: "Purchase Report", route: "/report/purchase" },
            { name: "Sale Report", route: "/report/sale" },
            { name: "Order Report", route: "/report/order" },
            { name: "Claim Report", route: "/report/claim" },
            { name: "Damage Report", route: "/report/damage" },
            { name: "Salary Report", route: "/report/salary" },
            { name: "Attendance Report", route: "/report/attendance" },
            { name: "Leave Report", route: "/report/leave" },
        ],
    },
    {
        name: "Ledger",
        icon: Landmark,
        children: [
            { name: "Client Ledger", route: "/ledger/client" },
            { name: "Supplier Ledger", route: "/ledger/supplier" },
        ],
    },
    {
        name: "Payment",
        icon: CreditCard,
        children: [
            { name: "Add Account", route: "/payment/account/add" },
            { name: "All Account", route: "/payment/account/all" },
            { name: "Balance Transfer", route: "/payment/transfer" },
            { name: "All Transfer", route: "/payment/transfer/all" },
        ],
    },
    {
        name: "Loan",
        icon: DollarSign,
        children: [
            { name: "Add Loan", route: "/loan/add" },
            { name: "All Loan", route: "/loan/all" },
            { name: "Loan Transaction", route: "/loan/transaction" },
            { name: "All Loan Transaction", route: "/loan/transaction/all" },
            { name: "Loan Ledger", route: "/loan/ledger" },
        ],
    },
    {
        name: "Address",
        icon: MapPin,
        children: [
            { name: "Add Zone", route: "/address/zone/add" },
            { name: "All Zone", route: "/address/zone/all" },
            { name: "Divisions", route: "/address/divisions" },
            { name: "Districts", route: "/address/districts" },
            { name: "Upazillas", route: "/address/upazillas" },
            { name: "Unions", route: "/address/unions" },
        ],
    },
    {
        name: "Backup",
        icon: Database,
        children: [
            { name: "Database Backup", route: "/backup/db" },
            { name: "Import Table", route: "/backup/import" },
            { name: "All Database Backup", route: "/backup/all" },
        ],
    },
    {
        name: "Settings",
        icon: Settings,
        children: [
            { name: "Project Settings", route: "/settings/project" },
            { name: "Mail Settings", route: "/settings/mail" },
            { name: "SMS Settings", route: "/settings/sms" },
            { name: "Site Settings", route: "/settings/site" },
            { name: "Permission Settings", route: "/settings/permissions" },
        ],
    },
];