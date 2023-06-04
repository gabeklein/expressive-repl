import { Editor } from './InputEditor';

/**
 * @type {React.FC<{
 *   type: typeof Editor;
 *   className?: string;
 * }>}
 **/
export const View = ({ type }) => {
  const {
    element,
    main: {
      fontSize
    }
  } = type.use();

  forward: className;
  fontSize: `${fontSize}px`;
  overflow: hidden;
  margin: 3;

  <this ref={element} />
}