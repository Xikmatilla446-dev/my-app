import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export type Props = {
    children?: React.ReactNode;
};

const Layout = ({children}: Props) => {
    return (
        <>
            <Header/>
            <div className={"page-content"}>{children}</div>
            <Footer/>
        </>
    );
};

export default Layout;
