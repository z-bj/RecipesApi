import React from "react";
import { useState } from "react";

export function Site() {
  const [page, setPage] = useState("ingredients");

  return (
    <>
      <NavBar currentPage={page} onClick={setPage} />
      <p>{page}</p>
    </>
  );
}

function NavBar({ currentPage, onClick }) {
  const navClass = function (page) {
    let className = "nav-item";
    if (page === currentPage) {
      className = " active";
    }
    return className;
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
      <a href="#" className="navbar-brand">
        Recettes
      </a>
      <ul className="navbar-nav mr-auto">
        <li className={navClass("recipes")}>
          <a
            href="#recipes"
            className="nav-link"
            onClick={() => onClick("recipes")}
          >
            Recipes
          </a>
        </li>
        <li className={navClass("ingredients")}>
          <a
            href="#ingredients"
            className=" nav-link"
            onClick={() => onClick("ingredients")}
          >
            Ingredients
          </a>
        </li>
      </ul>
    </nav>
  );
}
