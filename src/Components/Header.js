import React from "react";

export default function Header() {
  // Get the page name (after slash) and capitalize it
  const pageName = window.location.pathname.substring(1).toUpperCase();

  return <h1>{pageName}</h1>;
}
