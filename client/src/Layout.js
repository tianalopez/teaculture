import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import LoaderPage from "./components/loaderPage";
import Navbar from "./components/navbar";

function Layout() {


  const ctx = { };

  return (
    <>
      <Navbar />
      <Suspense fallback={<LoaderPage />}>
        <Outlet context={ctx}/>
      </Suspense>
    </>
  );
}

export default Layout
