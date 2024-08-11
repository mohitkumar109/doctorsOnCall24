import { BrowserRouter } from "react-router-dom";
import Layout from "./layout/Layout";
import { AppProvider } from "./context/AppContext";

export default function App() {
    return (
        <AppProvider>
            <BrowserRouter>
                <Layout />
            </BrowserRouter>
        </AppProvider>
    );
}
