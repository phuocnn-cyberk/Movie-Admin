export const USHDIcon = ({
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
      <rect x="1" y="0.514771" width="37" height="37" rx="8.5" fill="#01A8AB" />
      <rect x="1" y="0.514771" width="37" height="37" rx="8.5" stroke="#CEEEEE" />
      <g clip-path="url(#clip0_5062_6354)">
        <path d="M11.7055 8.96599V28.229H9.88721V10.0155L11.7055 8.96599Z" fill="white" />
        <path d="M25.7345 10.044V17.8379H13.2646V8.06403L15.083 7.01454V16.0186H23.9162V10.044H25.7345Z" fill="white" />
        <path
          d="M25.7345 19.3969V29.965L23.9162 31.0145V21.2152H14.8236V27.9697H13.2646V19.3969H25.7345Z"
          fill="white"
        />
        <path d="M29.1128 10.0439V28.0134L27.2935 29.0629V10.0439H29.1128Z" fill="white" />
      </g>
      <defs>
        <clipPath id="clip0_5062_6354">
          <rect width="19.2254" height="24" fill="white" transform="translate(9.88721 7.01477)" />
        </clipPath>
      </defs>
    </svg>
  );
};
