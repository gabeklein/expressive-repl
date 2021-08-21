const SaveOverlay = ({ active, retry }) => do {
  transition: "opacity 0.1s ease-in";
  bg: 0xf7f7f7bb;
  radius: 10;
  absolute: fill;
  flexAlign: center;
  zIndex: 20;
  shadow: inset, 0x3;
  color: 0x2181BD;

  if(!active){
    pointerEvents: none;
    opacity: 0;
  }
  
  code: {
    display: inline-block;
    verticalAlign: middle;
    background: 0x1;
    padding: ".1em", ".4em";
    margin: 0, "0.2em"
    radius: 5;
    fontSize: "1.4em";
    color: 0x999;
  }
  
  <this>
    <div propmt>
      Press or click
      <code onClick={retry}>⌘-S</code>
      to rebuild
    </div>
  </this>
}

export default SaveOverlay;