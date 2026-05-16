import React from "react";

export default function SectionHeading({
  title,
  subtitle,
  align = "center",
  className = "",
}) {
  const alignClass =
    align === "left" ? "text-left" : align === "right" ? "text-right" : "text-center";

  return (
    <div className={`mb-12 md:mb-16 ${alignClass} ${className}`}>
      <h2 className="text-display-md font-semibold tracking-tight text-white">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-lg text-muted md:text-xl">{subtitle}</p>
      )}
    </div>
  );
}
