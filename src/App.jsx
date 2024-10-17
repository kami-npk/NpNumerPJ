import React from 'react';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import RootOfEquations from "./pages/RootOfEquations";
import LinearAlgebra from "./pages/LinearAlgebra";
import Interpolation from "./pages/Interpolation";
import Extrapolation from "./pages/Extrapolation";
import Integration from "./pages/Integration";
import Differential from "./pages/Differential";

const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/root-of-equations/*" element={<RootOfEquations />} />
            <Route path="/linear-algebra/*" element={<LinearAlgebra />} />
            <Route path="/interpolation/*" element={<Interpolation />} />
            <Route path="/extrapolation/*" element={<Extrapolation />} />
            <Route path="/integration/*" element={<Integration />} />
            <Route path="/differential/*" element={<Differential />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;