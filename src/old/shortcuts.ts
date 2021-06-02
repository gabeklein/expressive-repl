// import Controller, { ref } from 'deep-state';

// const COMMAND_KEYS = {
//   "s": "save",
//   "=": "increaseFont",
//   "-": "decreaseFont"
// }

// export class Shortcuts extends Controller {
//   ref = ref(elem => {
//     const handle = this.keyPress;
//     elem.addEventListener("keydown", handle);
//     () => elem.removeEventListener("keydown", handle);
//   });

//   keyPress = (e: KeyboardEvent) => {
//     const { key, metaKey } = e;
//     const name = COMMAND_KEYS[key];

//     if(name && metaKey){
//       this.update(name);
//       e.preventDefault();
//     }
//   }
// }