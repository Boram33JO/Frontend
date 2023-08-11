import React from "react";
import ReactDOM from "react-dom/client"; // 이 부분 수정
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./redux/config/configStore";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <QueryClientProvider client={queryClient}>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </QueryClientProvider>
);

reportWebVitals();
