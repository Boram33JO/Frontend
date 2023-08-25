import React from "react";
import ReactDOM from "react-dom/client"; // 이 부분 수정
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./redux/config/configStore";
import { persistStore } from "redux-persist"
import { PersistGate } from "redux-persist/integration/react";
export const persistor = persistStore(store);

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        }
    }
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <QueryClientProvider client={queryClient}>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </PersistGate>
        </Provider>
    </QueryClientProvider>
);

reportWebVitals();
