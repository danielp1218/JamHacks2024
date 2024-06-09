import React from "react";
export const AddIcon = ({
  fill = 'currentColor',
  filled,
  size,
  height,
  width,
  label,
  ...props
}) => {
  return (
    <svg
      width={size || width || 24}
      height={size || height || 24}
      viewBox="0 0 24 24"
      fill={filled ? fill : 'none'}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >

    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" stroke="currentColor" class="size-6"></path>

    </svg>
  );
};

