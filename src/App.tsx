import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Landing } from "./pages/Landing";
import { DocsLayout } from "./pages/docs/DocsLayout";
import { DocsIndex } from "./pages/docs/DocsIndex";
import { DocPage } from "./pages/docs/DocPage";
import { NotFound } from "./pages/NotFound";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/docs" element={<DocsLayout />}>
          <Route index element={<DocsIndex />} />
          <Route path=":slug" element={<DocPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
