export const ManualIcon = ({
  className,
  width = 40,
  height = 40,
}: {
  className?: string;
  width?: number;
  height?: number;
}) => {
  return (
    <svg width={width} height={height} viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="0.514771" width="37" height="37" rx="8.5" fill="#CEEEEE" />
      <rect x="1" y="0.514771" width="37" height="37" rx="8.5" stroke="url(#paint0_linear_5015_10521)" />
      <g clip-path="url(#clip0_5015_10521)">
        <path
          d="M9.28516 24.8699V12.988L14.8587 9.95074L20.6081 13.2087V17.643H18.4485V14.3851L14.9462 12.3028L11.118 14.3851V25.9473L9.28516 24.8699Z"
          fill="#01A8AB"
        />
        <path
          d="M13.6533 15.683V27.3684L19.1262 30.6264L21.3106 29.4999L15.6611 26.2661V16.9327L13.6533 15.683Z"
          fill="#01A8AB"
        />
        <path
          d="M29.5085 13.1596V25.0414L23.9349 28.0787L18.1855 24.8208V20.3864H20.3443V23.6452L23.8466 25.7275L27.6757 23.6452V12.0822L29.5085 13.1596Z"
          fill="#01A8AB"
        />
        <path
          d="M25.1397 22.3463V10.6609L19.6668 7.40298L17.4824 8.52949L23.1311 11.7633V21.0974L25.1397 22.3463Z"
          fill="#01A8AB"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_5015_10521"
          x1="1.70542"
          y1="1.01477"
          x2="37.2946"
          y2="37.0148"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#6AFBFE" />
          <stop offset="1" stop-color="#99B0B0" />
        </linearGradient>
        <clipPath id="clip0_5015_10521">
          <rect width="22" height="23" fill="white" transform="translate(8.5 7.51477)" />
        </clipPath>
      </defs>
    </svg>
  );
};
