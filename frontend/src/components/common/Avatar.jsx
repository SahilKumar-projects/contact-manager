export default function Avatar({ name }) {
  return (
    <div className="w-10 h-10 rounded-full bg-rose-500 text-white flex items-center justify-center font-semibold">
      {name[0]}
    </div>
  );
}
