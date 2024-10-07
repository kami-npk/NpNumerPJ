import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { navItems } from "./nav-items";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import RootOfEquations from "./pages/RootOfEquations";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/root-of-equations" element={<RootOfEquations />} />
          {navItems.map(({ to, page }) => (
            <Route key={to} path={to} element={page} />
          ))}
          {navItems.flatMap(item => 
            item.subItems ? item.subItems.map(subItem => (
              <Route key={subItem.to} path={subItem.to} element={<div className="p-4"><h1 className="text-2xl font-bold mb-4">{subItem.title}</h1><p>Content for {subItem.title} goes here.</p></div>} />
            )) : []
          )}
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;