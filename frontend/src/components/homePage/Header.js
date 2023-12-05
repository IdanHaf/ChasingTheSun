import { twMerge } from "tailwind-merge";

export default function Header() {
  return (
    <nav className="fixed flex flex-row items-center w-full text-white p-4 z-10">
      <h1 className="flex flex-1 flex-col text-2xl">Project Name </h1>
      <div className="flex flex-row gap-6 items-center">
        <Button href="/" name="Home" />
        <Button href="/yellowCarMode" name="yellowCar" />
        <Button href="/intelligenceMode" name="intelligenceMode" />
        <Button href="/login" name="Login"/>
      </div>
    </nav>
  );
}

function Button(props) {
  return (
    <button className={props.name === "Login"? "flex flex-col items-center hover:border-b-4 hover:border-pink-500"
        :"flex flex-col items-center hover:border-b-2 hover:border-white"}
    >
      <a href={props.href} className={"capitalize"}>
        {props.name}
      </a>
    </button>
  );
}
