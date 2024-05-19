type AlertconProps = {
  outlineColor?: string;
  width?: number;
  height?: number;
};

function AlertIcon(props: AlertconProps) {
  const { outlineColor = 'none', width = 30, height = 30 } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={outlineColor}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <circle
        cx="12"
        cy="12"
        r="10"
      />
      <line
        x1="12"
        y1="8"
        x2="12"
        y2="12"
      />
      <line
        x1="12"
        y1="16"
        x2="12.01"
        y2="16"
      />
    </svg>
  );
}

export { AlertIcon };
