import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { navItems } from "./nav-items";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import BisectionSearchPage from "./pages/BisectionSearchPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/root-of-equations/bisection" element={<BisectionSearchPage />} />
          {navItems.map(({ to, page }) => (
            <Route key={to} path={to} element={page} />
          ))}
          {navItems.flatMap(item => 
            item.subItems ? item.subItems.map(subItem => (
              <Route key={subItem.to} path={subItem.to} element={<BisectionSearchPage />} />
            )) : []
          )}
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;