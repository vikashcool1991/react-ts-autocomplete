import { FC, SVGProps, memo } from "react";

interface SvgProps extends SVGProps<SVGSVGElement> {
  title?: string;
}

const SvgSearch: FC<SvgProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={800}
    height={800}
    viewBox="0 0 32 32"
    {...props}
  >
    <path
      fill="#000"
      fillRule="evenodd"
      d="M13.46 24.45c-6.29 0-11.389-5.01-11.389-11.2S7.17 2.04 13.46 2.04s11.39 5.02 11.39 11.21-5.1 11.2-11.39 11.2m18.228 5.8-8.259-8.13c2.162-2.35 3.491-5.45 3.491-8.87C26.92 5.93 20.894 0 13.46 0S0 5.93 0 13.25c0 7.31 6.026 13.24 13.46 13.24a13.52 13.52 0 0 0 8.472-2.96l8.292 8.16c.405.4 1.06.4 1.464 0 .405-.39.405-1.04 0-1.44"
    />
  </svg>
);
export default memo(SvgSearch);
