import { ForgotPasswordPage } from "../pages/auth/ForgotPasswordPage";
import { LoginPage } from "../pages/auth/LoginPage";
import { RegistrationPage } from "../pages/auth/RegistrationPage";
import { AllBrandPage } from "../pages/brand/AllBrandPage";
import { AllCategoryPage } from "../pages/category/AllCategoryPage";
import { ColorPage } from "../pages/color/ColorPage";
import { DashboardPage } from "../pages/DashboardPage";
import { DepartmentPage } from "../pages/department/DepartmentPage";
import { DesignationPage } from "../pages/designation/DesignationPage";
import { AddGodownPage } from "../pages/godown/AddGodownPage";
import { AllGodownPage } from "../pages/godown/AllGodownPage";
import { LeaveTypePage } from "../pages/leaveType/LeaveTypePage";
import { AddProductPage } from "../pages/product/AddProductPage";
import { AllProductPage } from "../pages/product/AllProductPage";
import { AddSalePage } from "../pages/sale/AddSalePage";
import { AllSizePage } from "../pages/size/AllSizePage";
import { AllSubCategoryPage } from "../pages/subcategory/AllSubCategoryPage";
import { UnitPage } from "../pages/unit/UnitPage";

export const publicRoutes = [
    {path: "/", element:<LoginPage/> },
    {path: "/register", element:<RegistrationPage/> },
    {path: "/forget/password", element:<ForgotPasswordPage/> },
];

export const privateRoutes = [
    {path: "/home", element: <DashboardPage/>},

    // Product Route
    {path: "/categories", element: <AllCategoryPage/>},
    {path: "/subcategories", element: <AllSubCategoryPage/>},
    {path: "/brands", element: <AllBrandPage/>},
    {path: "/sizes", element: <AllSizePage/>},
    {path: "/colors", element: <ColorPage/>},
    {path: "/units", element: <UnitPage/>},
    //Product Route

    // HRM Route
    {path: "/departments", element: <DepartmentPage/>},
    {path: "/designations", element: <DesignationPage/>},
    {path: "/leaves/type", element: <LeaveTypePage/>},
    //HRM Route

    {path: "/add/showroom", element: <AddGodownPage/>},
    {path: "/all/showroom", element: <AllGodownPage/>},

    {path: "/add/product", element: <AddProductPage/>},
    {path: "/all/product", element: <AllProductPage/>},

    {path: "/add/sale", element: <AddSalePage/>},
];