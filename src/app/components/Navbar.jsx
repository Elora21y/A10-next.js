"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { FiHome, FiBox, FiPlusCircle, FiLogIn, FiLogOut } from "react-icons/fi";

const Navbar = () => {
  const { data: session } = useSession();

  const links = (
    <>
      <li>
        <Link href="/" className="flex items-center gap-2">
          <FiHome /> Home
        </Link>
      </li>
      <li>
        <Link href="/products" className="flex items-center gap-2">
          <FiBox /> Products
        </Link>
      </li>
      {session && (
        <li>
          <Link
            href="/dashboard/add-product"
            className="flex items-center gap-2"
          >
            <FiPlusCircle /> Add Product
          </Link>
        </li>
      )}
    </>
  );
  return (
    <div>
      <div className="navbar bg-base-100/60 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">Prodify</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end">
          {/* Auth buttons */}
          {session ? (
            <button
              className="btn flex items-center gap-2"
              onClick={() => signOut()}
            >
              <FiLogOut /> Logout
            </button>
          ) : (
            <button
              className="btn flex items-center gap-2"
              onClick={() => signIn()}
            >
              <FiLogIn /> Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
