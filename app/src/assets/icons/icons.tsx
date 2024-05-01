import { Icon } from "./types";

export const HomeIcon: React.FC<Icon> = ({ size, color }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size || 24}
    height={size || 24}
    viewBox="0 0 24 24"
  >
    <path
      fill={color || "currentColor"}
      d="M20.25 10a1.25 1.25 0 1 0-2.5 0zm-14 0a1.25 1.25 0 1 0-2.5 0zm13.866 2.884a1.25 1.25 0 0 0 1.768-1.768zM12 3l.884-.884a1.25 1.25 0 0 0-1.768 0zm-9.884 8.116a1.25 1.25 0 0 0 1.768 1.768zM7 22.25h10v-2.5H7zM20.25 19v-9h-2.5v9zm-14 0v-9h-2.5v9zm15.634-7.884-9-9-1.768 1.768 9 9zm-10.768-9-9 9 1.768 1.768 9-9zM17 22.25A3.25 3.25 0 0 0 20.25 19h-2.5a.75.75 0 0 1-.75.75zm-10-2.5a.75.75 0 0 1-.75-.75h-2.5A3.25 3.25 0 0 0 7 22.25z"
    />
  </svg>
);

export const SearchIcon: React.FC<Icon> = ({ size, color }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size || 24}
    height={size || 24}
    viewBox="0 0 1024 1024"
  >
    <path
      fill={color || "currentColor"}
      d="m795.904 750.72l124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704a352 352 0 0 0 0 704"
    />
  </svg>
);
export const SubtitleIcon: React.FC<Icon> = ({ size, color }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size || 24}
    height={size || 24}
    viewBox="0 0 24 24"
  >
    <path
      fill={color || "currentColor"}
      d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2M5 12h2c.55 0 1 .45 1 1s-.45 1-1 1H5c-.55 0-1-.45-1-1s.45-1 1-1m8 6H5c-.55 0-1-.45-1-1s.45-1 1-1h8c.55 0 1 .45 1 1s-.45 1-1 1m6 0h-2c-.55 0-1-.45-1-1s.45-1 1-1h2c.55 0 1 .45 1 1s-.45 1-1 1m0-4h-8c-.55 0-1-.45-1-1s.45-1 1-1h8c.55 0 1 .45 1 1s-.45 1-1 1"
    />
  </svg>
);
export const LoadingIcon: React.FC<Icon> = ({ size, color }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size || 24}
    height={size || 24}
    viewBox="0 0 24 24"
  >
    <path
      fill="none"
      stroke={color || "currentColor"}
      strokeDasharray={15}
      strokeDashoffset={15}
      strokeLinecap="round"
      strokeWidth={2}
      d="M12 3a9 9 0 0 1 9 9"
    >
      <animate
        fill="freeze"
        attributeName="stroke-dashoffset"
        dur="0.3s"
        values="15;0"
      />
      <animateTransform
        attributeName="transform"
        dur="1.5s"
        repeatCount="indefinite"
        type="rotate"
        values="0 12 12;360 12 12"
      />
    </path>
  </svg>
);
export const FullscreenIcon: React.FC<Icon> = ({ size, color }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size || 24}
    height={size || 24}
    viewBox="0 0 24 24"
  >
    <g fill="none">
      <path d="M24 0v24H0V0zM12.593 23.258l-.011.002-.071.035-.02.004-.014-.004-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01z" />
      <path
        fill={color || "currentColor"}
        d="M4 15a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2H5a2 2 0 0 1-2-2v-3a1 1 0 0 1 1-1m16 0a1 1 0 0 1 .993.883L21 16v3a2 2 0 0 1-1.85 1.995L19 21h-3a1 1 0 0 1-.117-1.993L16 19h3v-3a1 1 0 0 1 1-1M19 3a2 2 0 0 1 1.995 1.85L21 5v3a1 1 0 0 1-1.993.117L19 8V5h-3a1 1 0 0 1-.117-1.993L16 3zM8 3a1 1 0 0 1 .117 1.993L8 5H5v3a1 1 0 0 1-1.993.117L3 8V5a2 2 0 0 1 1.85-1.995L5 3z"
      />
    </g>
  </svg>
);
export const FullscreenOff: React.FC<Icon> = ({ size, color }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size || 24}
    height={size || 24}
    viewBox="0 0 24 24"
  >
    <g fill="none" fillRule="evenodd">
      <path d="M24 0v24H0V0zM12.593 23.258l-.011.002-.071.035-.02.004-.014-.004-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01z" />
      <path
        fill={color || "currentColor"}
        d="M20 7h-3V4a1 1 0 1 0-2 0v3a2 2 0 0 0 2 2h3a1 1 0 1 0 0-2M7 9a2 2 0 0 0 2-2V4a1 1 0 1 0-2 0v3H4a1 1 0 1 0 0 2zm0 8H4a1 1 0 1 1 0-2h3a2 2 0 0 1 2 2v3a1 1 0 1 1-2 0zm10-2a2 2 0 0 0-2 2v3a1 1 0 1 0 2 0v-3h3a1 1 0 1 0 0-2z"
      />
    </g>
  </svg>
);
export const BackIcon: React.FC<Icon> = ({ size, color }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size || 24}
    height={size || 24}
    viewBox="0 0 512 512"
  >
    <path
      fill="none"
      stroke={color || "currentColor"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={48}
      d="M244 400 100 256l144-144M120 256h292"
    />
  </svg>
);

export const FolderIcon: React.FC<Icon> = ({ size, color }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size || 24}
    height={size || 24}
    viewBox="0 0 24 24"
  >
    <path
      fill={color || "currentColor"}
      d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8z"
    />
  </svg>
);

export const PlusIcon: React.FC<Icon> = ({ size, color }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size || 24}
    height={size || 24}
    viewBox="0 0 24 24"
  >
    <g fill="none">
      <path d="M24 0v24H0V0zM12.593 23.258l-.011.002-.071.035-.02.004-.014-.004-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01z" />
      <path
        fill={color || "currentColor"}
        d="M10.5 20a1.5 1.5 0 0 0 3 0v-6.5H20a1.5 1.5 0 0 0 0-3h-6.5V4a1.5 1.5 0 0 0-3 0v6.5H4a1.5 1.5 0 0 0 0 3h6.5z"
      />
    </g>
  </svg>
);

export const ErrorIcon: React.FC<Icon> = ({ size, color }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size || 24}
    height={size || 24}
    viewBox="0 0 48 48"
  >
    <path
      fill={color || "currentColor"}
      fillRule="evenodd"
      stroke={color || "currentColor"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={4}
      d="m6 11 5-5 13 13L37 6l5 5-13 13 13 13-5 5-13-13-13 13-5-5 13-13z"
      clipRule="evenodd"
    />
  </svg>
);
export const PlayIcon: React.FC<Icon> = ({ size, color }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size || 24}
    height={size || 24}
    viewBox="0 0 256 256"
  >
    <path
      fill={color || "currentColor"}
      d="M240 128a15.74 15.74 0 0 1-7.6 13.51L88.32 229.65a16 16 0 0 1-16.2.3A15.86 15.86 0 0 1 64 216.13V39.87a15.86 15.86 0 0 1 8.12-13.82 16 16 0 0 1 16.2.3l144.08 88.14A15.74 15.74 0 0 1 240 128"
    />
  </svg>
);
export const PauseIcon: React.FC<Icon> = ({ size, color }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size || 24}
    height={size || 24}
    viewBox="0 0 24 24"
  >
    <rect
      width={4}
      height={14}
      x={6}
      y={5}
      fill={color || "currentColor"}
      rx={1}
    />
    <rect
      width={4}
      height={14}
      x={14}
      y={5}
      fill={color || "currentColor"}
      rx={1}
    />
  </svg>
);

export const RewindIcon: React.FC<Icon> = ({ size, color }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size || 24}
    height={size || 24}
    viewBox="0 0 24 24"
  >
    <path
      fill={color || "currentColor"}
      fillRule="evenodd"
      d="M11.324 1.675A.75.75 0 0 1 12 1.25c5.937 0 10.75 4.813 10.75 10.75S17.937 22.75 12 22.75 1.25 17.937 1.25 12c0-4.41 2.655-8.197 6.45-9.855a.75.75 0 1 1 .6 1.374 9.25 9.25 0 1 0 5.382-.617l.904 1.13a.75.75 0 0 1-1.172.937l-2-2.5a.75.75 0 0 1-.09-.794m-1 6.149a.75.75 0 0 1 .426.676v7a.75.75 0 0 1-1.5 0v-5.44l-1.281 1.026a.75.75 0 0 1-.938-1.172l2.5-2a.75.75 0 0 1 .794-.09m2.35.78a1.25 1.25 0 0 1 1.186-.854h2.64a.75.75 0 0 1 0 1.5h-2.46l-.5 1.5h.96a2.75 2.75 0 1 1 0 5.5h-2a.75.75 0 0 1 0-1.5h2a1.25 1.25 0 1 0 0-2.5h-1.306a1.25 1.25 0 0 1-1.186-1.645zm.757 2.475"
      clipRule="evenodd"
    />
  </svg>
);

interface ArrowIcon extends Icon {
  direction: "up" | "down" | "left" | "right";
}

export const ArrowIcon: React.FC<ArrowIcon> = ({ size, color, direction }) => {
  let rotate = 0;

  switch (direction) {
    case "up":
      rotate = 0;
      break;
    case "down":
      rotate = 180;
      break;
    case "left":
      rotate = 270;
      break;
    case "right":
      rotate = 90;
      break;
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || 24}
      height={size || 24}
      viewBox="0 0 1024 1024"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <path
        fill={color || "currentColor"}
        d="M104.704 685.248a64 64 0 0 0 90.496 0l316.8-316.8 316.8 316.8a64 64 0 0 0 90.496-90.496L557.248 232.704a64 64 0 0 0-90.496 0L104.704 594.752a64 64 0 0 0 0 90.496"
      />
    </svg>
  );
};
export const DoubleArrowIcon: React.FC<ArrowIcon> = ({
  size,
  color,
  direction,
}) => {
  let rotate = 0;

  switch (direction) {
    case "up":
      rotate = 270;
      break;
    case "down":
      rotate = 90;
      break;
    case "left":
      rotate = 180;
      break;
    case "right":
      rotate = 0;
      break;
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || 24}
      height={size || 24}
      viewBox="0 0 56 56"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <path
        fill={color || "currentColor"}
        d="M2.928 44.495c.834 0 1.525-.265 2.339-.753l20.72-12.2c1.118-.65 1.728-1.383 1.952-2.237v11.713c0 2.257 1.342 3.477 2.928 3.477.834 0 1.525-.265 2.339-.753l20.74-12.2c1.424-.854 2.054-1.85 2.054-3.03 0-1.159-.63-2.155-2.054-3.01l-20.74-12.2c-.814-.488-1.505-.752-2.339-.752-1.586 0-2.928 1.22-2.928 3.477V27.74c-.224-.854-.834-1.585-1.952-2.236l-20.72-12.2c-.834-.489-1.505-.753-2.339-.753C1.342 12.55 0 13.77 0 16.027v24.99c0 2.258 1.342 3.478 2.928 3.478"
      />
    </svg>
  );
};

export const ForwardICon: React.FC<Icon> = ({ size, color }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size || 24}
    height={size || 24}
    viewBox="0 0 24 24"
  >
    <g fill={color || "currentColor"} fillRule="evenodd" clipRule="evenodd">
      <path d="M10.325 7.824a.75.75 0 0 1 .425.676v7a.75.75 0 0 1-1.5 0v-5.44l-1.281 1.026a.75.75 0 0 1-.937-1.172l2.5-2a.75.75 0 0 1 .793-.09m2.35.78a1.25 1.25 0 0 1 1.185-.854h2.64a.75.75 0 0 1 0 1.5h-2.46l-.5 1.5h.96a2.75 2.75 0 1 1 0 5.5h-2a.75.75 0 0 1 0-1.5h2a1.25 1.25 0 1 0 0-2.5h-1.306a1.25 1.25 0 0 1-1.186-1.645z" />
      <path d="M12.676 1.675A.75.75 0 0 0 12 1.25c-.735 0-1.454.074-2.15.215-4.906.996-8.6 5.333-8.6 10.535 0 5.937 4.813 10.75 10.75 10.75S22.75 17.937 22.75 12c0-4.41-2.655-8.197-6.45-9.855a.75.75 0 0 0-.6 1.374A9.25 9.25 0 1 1 2.75 12a9.255 9.255 0 0 1 6.5-8.834V4.5a.75.75 0 0 0 1.336.469l2-2.5a.75.75 0 0 0 .09-.794" />
    </g>
  </svg>
);
export const FinishIcon: React.FC<Icon> = ({ size, color }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size || 32}
    height={size || 32}
    viewBox="0 0 32 32"
  >
    <path
      fill="currentColor"
      d="M5 4v24h2v-8h20V4zm2 2h3v3h3V6h3v3h3V6h3v3h3v3h-3v3h3v3h-3v-3h-3v3h-3v-3h-3v3h-3v-3H7v-3h3V9H7zm3 6v3h3v-3zm3 0h3V9h-3zm3 0v3h3v-3zm3 0h3V9h-3z"
    />
  </svg>
);
export const VolumeIcon: React.FC<Icon> = ({ size, color }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size || 24}
    height={size || 24}
    viewBox="0 0 16 16"
  >
    <g fill="none">
      <g clipPath="url(#a)">
        <path
          fill={color || "currentColor"}
          fillRule="evenodd"
          d="M2 5h2l2.482-2.482A1.768 1.768 0 0 1 9.5 3.768v8.464a1.768 1.768 0 0 1-3.018 1.25L4 11H2a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2m12.162 8.103c-.265.319-.743.316-1.036.024-.292-.293-.288-.766-.031-1.09A6.473 6.473 0 0 0 14.5 8a6.473 6.473 0 0 0-1.405-4.037c-.257-.324-.261-.797.031-1.09.293-.292.771-.294 1.036.024A7.967 7.967 0 0 1 16 8c0 1.94-.69 3.718-1.838 5.103m-2.138-2.135c-.246.333-.726.33-1.019.037-.293-.293-.284-.764-.06-1.113A3.484 3.484 0 0 0 11.5 8c0-.697-.204-1.347-.555-1.892-.224-.348-.233-.82.06-1.113.293-.293.773-.296 1.02.037C12.637 5.862 13 6.89 13 8a4.977 4.977 0 0 1-.976 2.968"
          clipRule="evenodd"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path fill={color || "currentColor"} d="M0 0h16v16H0z" />
        </clipPath>
      </defs>
    </g>
  </svg>
);
export const VolumeOffIcon: React.FC<Icon> = ({ size, color }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size || 24}
    height={size || 24}
    viewBox="0 0 14 14"
  >
    <path
      fill={color || "currentColor"}
      fillRule="evenodd"
      d="M6.716 1.779A1.454 1.454 0 0 1 9 3.005v8.006c-.026 1.186-1.403 1.882-2.374 1.21l-.008-.005L2.84 9.5H1.5C.68 9.5 0 8.82 0 8V6c0-.82.68-1.5 1.5-1.5h1.342l3.87-2.72.003-.001Z"
      clipRule="evenodd"
    />
  </svg>
);
