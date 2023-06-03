export interface DragEvents {
  start(): void;
  stop(): void;
  move(x: number, y: number): void;
}

export function createRef(...handler: DragEvents[]){
  let unSet: Function | void;

  return (element: HTMLElement) => {
    if(typeof unSet == "function")
      unSet();
    if(element)
      unSet = registerEvents(element, handler);
  }
}

function on(handler: (event: MouseEvent) => void){
  return (e: MouseEvent) => {
    handler(e);
    e.stopPropagation();
    e.preventDefault();
  }
}

function registerEvents(
  element: HTMLElement, handle: DragEvents[]){

  let last: MouseEvent;

  const resize = on(event => {
    handle.forEach(x => x.move(
      event.x - last.x,
      event.y - last.y
    ))
    last = event;
  })
  
  const beginResize = on(event => {
    if(event.button !== 0)
      return;

    handle.forEach(x => x.start());
    last = event;

    document.addEventListener("mousemove", resize);
    document.addEventListener("mouseup", endResize);
  })

  const endResize = on(() => {
    handle.forEach(x => x.stop());
    document.removeEventListener("mousemove", resize);
    document.removeEventListener("mouseup", endResize);
  })

  element.addEventListener("mousedown", beginResize);

  return () => {
    element.removeEventListener("mousedown", beginResize);
  }
}