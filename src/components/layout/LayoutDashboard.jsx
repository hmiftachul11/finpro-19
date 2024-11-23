import NavbarDashboard from "../navbarDashboard/NavbarDasboard";

const LayoutDashboard = ({ children }) => {
    return (
        <>
            <NavbarDashboard />
            {children}
           
        </>
    )
}

export default LayoutDashboard;