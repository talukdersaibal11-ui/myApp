import { ForgotPasswordPage } from "../pages/auth/ForgotPasswordPage";
import { LoginPage } from "../pages/auth/LoginPage";
import { RegistrationPage } from "../pages/auth/RegistrationPage";
import { AddCategoryPage } from "../pages/category/AddCategoryPage";
import { AllCategoryPage } from "../pages/category/AllCategoryPage";
import { DashboardPage } from "../pages/DashboardPage";
import { AddGodownPage } from "../pages/godown/AddGodownPage";
import { AllGodownPage } from "../pages/godown/AllGodownPage";
import { AddProductPage } from "../pages/product/AddProductPage";
import { AllProductPage } from "../pages/product/AllProductPage";
import { AddSalePage } from "../pages/sale/AddSalePage";
import { AddSubCategoryPage } from "../pages/subcategory/AddSubCategoryPage";
import { AllSubCategoryPage } from "../pages/subcategory/AllSubCategoryPage";

export const publicRoutes = [
    {path: "/", element:<LoginPage/> },
    {path: "/register", element:<RegistrationPage/> },
    {path: "/forget/password", element:<ForgotPasswordPage/> },
];

export const privateRoutes = [
    {path: "/home", element: <DashboardPage/>},
    {path: "/add/category", element: <AddCategoryPage/>},
    {path: "/all/category", element: <AllCategoryPage/>},
    {path: "/add/subcategory", element: <AddSubCategoryPage/>},
    {path: "/all/subcategory", element: <AllSubCategoryPage/>},
    {path: "/add/showroom", element: <AddGodownPage/>},
    {path: "/all/showroom", element: <AllGodownPage/>},
    {path: "/add/product", element: <AddProductPage/>},
    {path: "/all/product", element: <AllProductPage/>},
    {path: "/add/sale", element: <AddSalePage/>},
];