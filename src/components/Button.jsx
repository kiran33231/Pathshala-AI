import React from "react";

function Button({ children, type = "primary", onClick }) {
  const baseClass = "px-6 py-3 rounded-lg font-semibold transition";
  const styles = {
    primary: "bg-[#8e2de2] text-white hover:bg-[#6b1db0]",
    secondary:
      "bg-white text-[#8e2de2] border border-[#8e2de2] hover:bg-gray-100",
  };
  return (
    <button className={`${baseClass} ${styles[type]}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
