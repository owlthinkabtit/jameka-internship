import React from "react";

const CustomPrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "#8364E2",
        borderRadius: "50%",
        padding: "1px",
        left: "-25px",
        zIndex: "1",
      }}
      onClick={onClick}
    >
      <i className="fa fa-chevron-left" style={{ color: "#8364E2" }}></i>
    </div>
  );
};

export default CustomPrevArrow;
