import { Footer } from "./Footer";
import { Header } from "./Header";
import { Main } from "./Main";
import { Sidebar } from "./Siderbar";

export const Layout = ({ children} ) => {
    return (
        <>
            <Header/>
            <Sidebar/>
                <Main style={{ padding: "1rem" }}>
                    { children }
                </Main>
            <Footer/>
        </>
    );
}