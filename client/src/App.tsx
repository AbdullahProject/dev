/* Axicon Developers — Concrete / Brass Editorial
   Global shell: the page is a single cinematic editorial sequence with light theme tokens. */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useCallback, useEffect, useState } from "react";
import { Route, Router as WouterRouter, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

function useHashLocation(): [string, (path: string) => void] {
  const getPath = () => window.location.hash.replace(/^#/, "") || "/";
  const [location, setLocation] = useState(getPath);

  useEffect(() => {
    const handleHashChange = () => setLocation(getPath());
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const navigate = useCallback((path: string) => {
    window.location.hash = path;
  }, []);

  return [location, navigate];
}

function Router() {
  return <WouterRouter hook={useHashLocation} hrefs={(path) => `#${path}`}><Switch><Route path="/" component={Home} /><Route path="/404" component={NotFound} /><Route component={NotFound} /></Switch></WouterRouter>;
}

export default function App() {
  return <ErrorBoundary><ThemeProvider defaultTheme="light"><TooltipProvider><Toaster /><Router /></TooltipProvider></ThemeProvider></ErrorBoundary>;
}
