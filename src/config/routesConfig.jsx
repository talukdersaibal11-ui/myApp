import { ForgotPasswordPage } from "../pages/auth/ForgotPasswordPage";
import { LoginPage } from "../pages/auth/LoginPage";
import { RegistrationPage } from "../pages/auth/RegistrationPage";
import { AddCategoryPage } from "../pages/category/AddCategoryPage";
import { DashboardPage } from "../pages/DashboardPage";
import { AddGodownPage } from "../pages/godown/AddGodownPage";
import { AllGodownPage } from "../pages/godown/AllGodownPage";
import { AddProductPage } from "../pages/product/AddProductPage";
import { AllProductPage } from "../pages/product/AllProductPage";
import { AddSalePage } from "../pages/sale/AddSalePage";

export const publicRoutes = [
    {path: "/", element:<LoginPage/> },
    {path: "/register", element:<RegistrationPage/> },
    {path: "/forget/password", element:<ForgotPasswordPage/> },
];

export const privateRoutes = [
    {path: "/home", element: <DashboardPage/>},
    {path: "/add/category", element: <AddCategoryPage/>},
    {path: "/add/showroom", element: <AddGodownPage/>},
    {path: "/all/showroom", element: <AllGodownPage/>},
    {path: "/add/product", element: <AddProductPage/>},
    {path: "/all/product", element: <AllProductPage/>},
    {path: "/add/sale", element: <AddSalePage/>},
];