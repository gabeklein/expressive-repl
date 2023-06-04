import { EditorView, KeyBinding, keymap } from '@codemirror/view';

type KeyBindings = KeyBinding | readonly KeyBinding[];

/** Register keymap helper */
export function keyBind(...args: KeyBindings[]){
  return keymap.of([].concat(...args as any[]));
}

/** Callback on specified keyboard event. */
export function onKey<T extends string>(
  key: T, action: (key: T) => boolean | void){

  return keyBind({
    key,
    run(){
      return action(key) !== false;
    }
  });
}

/** Callback on specified (Cmd / Control) key event. */
export function metaKey(
  key: string, action: (key: string) => boolean | void){

  return [
    onKey(`Meta-${key}`, action),
    onKey(`Ctrl-${key}`, action)
  ]
}

/** Callback on document update. */
export function onUpdate(callback: () => void){
  return EditorView.updateListener.of((update) => {
    if(update.docChanged)
      callback();
  })
}