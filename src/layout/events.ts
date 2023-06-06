export type DragEvent = () => (x: number, y: number) => void;

export function createRef(...handle: DragEvent[]){
  let unSet: Function | void;

  return (element: HTMLElement) => {
    if(typeof unSet == "function")
      unSet();

    if(!element)
      return;
    
    const beginResize = on(event => {
      if(event.button !== 0)
        return;
      
      const onDidMove = handle.map(x => x());
      let previous = event;

      const resize = on(event => {
        const dX = event.x - previous.x;
        const dY = event.y - previous.y;
        onDidMove.map(cb => cb(dX, dY));
        previous = event;
      })

      const endResize = on(() => {
        document.removeEventListener("mousemove", resize);
        document.removeEventListener("mouseup", endResize);
      })

      document.addEventListener("mousemove", resize);
      document.addEventListener("mouseup", endResize);
    })

    element.addEventListener("mousedown", beginResize);

    unSet = () => {
      element.removeEventListener("mousedown", beginResize);
    }
  }
}

function on(handler: (event: MouseEvent) => void){
  return (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    handler(e);
  }
}