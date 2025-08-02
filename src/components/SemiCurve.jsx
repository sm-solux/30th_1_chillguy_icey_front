const SemiCurve = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="32"
      viewBox="0 0 363 32"
      fill="none"
      preserveAspectRatio="none"
    >
      <g filter="url(#filter0_df)">
        <path
          d="M357 2C357 26.1034 278.426 21.6814 181.5 21.6814C84.574 21.6814 6 24.3928 6 2"
          stroke="#E4F0FF"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>
      <defs>
        <filter
          id="filter0_df"
          x="0.5"
          y="0"
          width="362"
          height="31.5"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
          <feGaussianBlur stdDeviation="1" result="effect2_foregroundBlur" />
        </filter>
      </defs>
    </svg>
  );
};

export default SemiCurve;
