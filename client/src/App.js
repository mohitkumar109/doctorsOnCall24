import { BrowserRouter } from "react-router-dom";
import Layout from "./layout/Layout";
import { AppProvider } from "./context/AppContext";
import { Toaster } from "react-hot-toast";

export default function App() {
    return (
        <AppProvider>
            <BrowserRouter>
                <Layout />
                <Toaster position="bottom-right" reverseOrder={true} />
            </BrowserRouter>
        </AppProvider>
    );
}
