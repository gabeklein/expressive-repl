import Controller, { ref } from 'deep-state';

export class Shortcuts extends Controller {
  define: any = {
    "s": "save",
    "=": "increaseFont",
    "-": "decreaseFont"
  }

  ref = ref(elem => {
    const handle = this.keyPress;
    elem.addEventListener("keydown", handle);
    () => elem.removeEventListener("keydown", handle);
  });

  keyPress = (e: KeyboardEvent) => {
    const { key, metaKey } = e;

    if(key == "Meta" || !metaKey)
      return;

    const name = this.define[key];

    if(name){
      this.update(name);
      e.preventDefault();
    }
  }
}