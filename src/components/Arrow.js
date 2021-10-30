import { useTheme } from "@emotion/react";

export function Arrow({ active, ...rest }) {
  const theme = useTheme();
  return (
    <svg
      {...rest}
      width="39"
      height="20"
      viewBox="0 0 39 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        style={{ transition: "fill 0.1s" }}
        fillRule="evenodd"
        cliprle="evenodd"
        d="M0 19.2788L19.2788 0L38.5577 19.2788H0Z"
        fill={active ? theme.colors.primary : "transparent"}
      />
    </svg>
  );
}
