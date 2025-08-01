interface BookmarkIconProps {
  active: boolean;
  size?: number;
}

export default function FavoriteIcon({ active, size = 32 }: BookmarkIconProps) {
  const color = active ? '#ad1788' : '#f3f3f3';
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill={color}
      color={color}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
    </svg>
  );
}
