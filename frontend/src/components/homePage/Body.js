import YCar from "./yellowcar.svg";
import IdTicket from "./idTicket.svg";
import Labels from "./labels.png";
import { twMerge } from "tailwind-merge";

export default function Body() {
  return (
    <>
      <Home />
      <Modes />
    </>
  );
}

function Home() {
  return (
    <div id="home" className="flex items-center justify-center h-screen gap-8">
      <img src={Labels} className="h-60 w-80" />
      <div className="flex flex-col items-center">
        <p className="text-white flex-col flex gap-5 text-xl font-mono h-60  justify-center">
          <span>We will give you the target.</span>

          <span>You will have to find it on your own.</span>

          <span>You have 5 minutes.</span>
        </p>
        <a
          className="bg-[#10645C] text-[#FBE5D6] p-2 rounded-lg font-semibold mr-8 hover:-translate-y-1"
          href="#modes"
        >
          Start the game
        </a>
      </div>
    </div>
  );
}
function Modes() {
  return (
    <>
      <div id="modes" className="flex items-center justify-center h-screen">
        <Card
          text="Intelligence"
          img={IdTicket}
          description="Find the object!"
          className="h-96 w-72"
        />
        <Card
          text="Yellow Car"
          img={YCar}
          description="Find as many as you can!"
          className="h-96 w-72"
        />
      </div>
    </>
  );
}

function Card(props) {
  return (
    <div
      className={twMerge(
        "flex flex-col m-4 p-8 rounded-3xl bg-[#243731] relative items-center font-mono",
        props.className
      )}
    >
      <div className="flex flex-col gap-2 items-center">
        <h1 className="text-white text-3xl font-semibold">{props.text}</h1>
        <p className="text-green-200">{props.description}</p>

        <img src={props.img} className="h-40 w-40" />
        <button className="rounded-xl p-1 w-20 bg-green-gray-600">
          <a>PLAY</a>
        </button>
      </div>

      <div className="w-full bg-white/40 rounded-b-3xl absolute bottom-0 h-10 left-0"></div>
    </div>
  );
}
