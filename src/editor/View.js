import { Editor } from './Editor';

/**
 * @type {React.FC<{
 *   type: typeof Editor;
 *   className?: string;
 * }>}
 **/
export const View = ({ type }) => {
  const {
    element,
    parent: {
      fontSize
    }
  } = type.use();

  forward: className;
  fontSize: `${fontSize}px`;
  overflow: hidden;
  margin: 3;

  <this ref={element} />
}