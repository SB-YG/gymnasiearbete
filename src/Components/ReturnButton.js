import React from "react";

const ReturnButton = () => {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <button
      onClick={handleGoBack}
      style={{
        padding: "2px",
        marginBottom: "4px",
        fontWeight: "bold",
        marginBottom: "10px",
      }}
    >
      <img
        src="\Images\back.png"
        style={{
          width: "11px",
          height: "auto",
          marginBottom: "-1px",
        }}
      />
      Go Back
    </button>
  );
};

export default ReturnButton;
