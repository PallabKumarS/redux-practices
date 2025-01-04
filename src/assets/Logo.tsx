import logo from "/redux.png";

export default function Logo() {
  return (
    <div className="flex items-center gap-5">
      <img className="max-w-40" src={logo} alt="" />{" "}
      <h1 className="text-xl font-semibold text-purple-800">
        <span className="text-red-400">Practice With</span> Redux
      </h1>
    </div>
  );
}
