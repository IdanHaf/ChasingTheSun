import YCar from "./yellowcar.svg";
import IdTicket from "./idTicket.svg";
export default function Body() {
  return (
    <div className="flex flex-col h-full ">
      <div className="grid grid-cols-10 grid-rows-2">

        <Card
          text="Yellow Car"
          img={YCar}
          description="Find as many as you can!"
          css="col-start-4 col-end-6 row-start-2"
        />
        <Card
          text="Intelligence"
          img={IdTicket}
          description="Find the object!"
          css="col-start-6 col-end-8 row-start-2"
        />
      </div>
    </div>
  );
}

function Card(props) {
  return (
    <div
      className={"flex flex-col m-4 p-10 rounded-3xl bg-slate-800 " + props.css}
    >
      <div className="flex flex-col">
        <h1 className="text-white text-2xl">{props.text}</h1>
        <p className="text-green-200">{props.description}</p>
      </div>
      <img src={props.img} />
      <button className="bg-blue-500 rounded-xl p-1">
        <a>PLAY</a>
      </button>
    </div>
  );
}
