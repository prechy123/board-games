export default function Tile({
  value,
  handleClick,
}: {
  value: string;
  handleClick: () => void;
}) {
  return (
    <span
      className=" w-16 h-16 bg-white text-red-500 text-3xl flex items-center justify-center"
      onClick={handleClick}
    >
      {value}
    </span>
  );
}
