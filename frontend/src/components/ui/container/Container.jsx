import React from "react";

export default function Container({ className, id, children }) {
  return (
    <div className={className} id={id}>
      {children}
    </div>
  );
}
