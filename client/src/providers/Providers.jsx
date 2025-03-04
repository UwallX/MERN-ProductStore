import ReactQueryProvider from './QueryClientProvider'
import { Provider } from "@/components/ui/provider";
import { BrowserRouter } from "react-router-dom";

const Providers = ({ children }) => {
  return (
    <ReactQueryProvider>
      <Provider>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </Provider>
    </ReactQueryProvider>
  )
};

export default Providers;
