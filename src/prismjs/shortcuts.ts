import Model, { ref } from '@expressive/mvc';

const COMMAND_KEYS = {
  "s": "save",
  "=": "increaseFont",
  "-": "decreaseFont"
}

export class Shortcuts extends Model {
  ref = ref(elem => {
    const handle = this.keyPress;

    elem.addEventListener("keydown", handle);
    return () =>
      elem.removeEventListener("keydown", handle);
  });

  keyPress = (e: KeyboardEvent) => {
    const { key, metaKey } = e;
    const name = COMMAND_KEYS[key];

    if(name && metaKey){
      this.update(name);
      e.preventDefault();
    }
  }
}