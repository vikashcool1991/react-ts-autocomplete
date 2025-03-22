import { FC, SVGProps, memo } from "react";

interface SvgProps extends SVGProps<SVGSVGElement> {
  title?: string;
}
const SvgCancel: FC<SvgProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={800}
    height={800}
    viewBox="0 0 512 512"
    {...props}
  >
    <path
      fill="#000"
      fillRule="evenodd"
      d="M420.48 121.813 390.187 91.52 256 225.92 121.813 91.52 91.52 121.813l134.4 134.188-134.4 134.186 30.293 30.293L256 286.08l134.187 134.4 30.293-30.293L286.08 256z"
    />
  </svg>
);
export default memo(SvgCancel);
