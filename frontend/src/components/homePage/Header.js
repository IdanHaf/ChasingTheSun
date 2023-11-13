export default function Header() {
  return (
    <nav className="fixed flex flex-row items-center w-full text-white p-4">
      <h1 className="flex flex-1 flex-col text-2xl">Project Name </h1>
      <div className="flex flex-row gap-4">
        <Button href="/Panorama" name="panorama" />
        <Button href="/keymap" name="keymap" />
        <Button href="/intelligenceMode" name="intelligenceMode" />
        <Button href="/clues" name="clues" />
      </div>
    </nav>
  );
}

function Button(props) {
  return (
    <button>
      <a href={props.href} className="capitalize">
        {props.name}
      </a>
    </button>
  );
}
