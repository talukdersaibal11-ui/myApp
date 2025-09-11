import { ForgotPasswordPage } from "../pages/auth/ForgotPasswordPage";
import { LoginPage } from "../pages/auth/LoginPage";
import { RegistrationPage } from "../pages/auth/RegistrationPage";
import { AllBrandPage } from "../pages/brand/AllBrandPage";
import { AllCategoryPage } from "../pages/category/AllCategoryPage";
import { ColorPage } from "../pages/color/ColorPage";
import { DashboardPage } from "../pages/DashboardPage";
import { AddDepartmentPage } from "../pages/department/AddDepartmentPage";
import { AllDepartmentPage } from "../pages/department/AllDepartmentPage";
import { EditDepartmentPage } from "../pages/department/EditDepartmentPage";
import { AddDesignationPage } from "../pages/designation/AddDesignationPage";
import { AllDesignationPage } from "../pages/designation/AllDesignationPage";
import { EditDesignationPage } from "../pages/designation/EditDesignationPage";
import { AddGodownPage } from "../pages/godown/AddGodownPage";
import { AllGodownPage } from "../pages/godown/AllGodownPage";
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

    // Product Manage
    {path: "/categories", element: <AllCategoryPage/>},
    {path: "/subcategories", element: <AllSubCategoryPage/>},
    {path: "/brands", element: <AllBrandPage/>},
    {path: "/sizes", element: <AllSizePage/>},
    {path: "/colors", element: <ColorPage/>},
    {path: "/units", element: <UnitPage/>},
    //Product Manage

    {path: "/all/department", element: <AllDepartmentPage/>},
    {path: "/add/department", element: <AddDepartmentPage/>},
    {path: "/edit/department/:id", element: <EditDepartmentPage/>},


    {path: "/add/designation", element: <AddDesignationPage/>},
    {path: "/all/designation", element: <AllDesignationPage/>},
    {path: "/edit/designation/:id", element: <EditDesignationPage/>},


    {path: "/add/showroom", element: <AddGodownPage/>},
    {path: "/all/showroom", element: <AllGodownPage/>},

    {path: "/add/product", element: <AddProductPage/>},
    {path: "/all/product", element: <AllProductPage/>},

    {path: "/add/sale", element: <AddSalePage/>},
];