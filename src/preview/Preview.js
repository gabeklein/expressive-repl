import Boundary from './Boundary';
import Control from './Control';

const Preview = () => {
  const {
    error,
    key,
    onError,
    Render,
  } = Control.use();

  flex: 1;
  flexAlign: center;
  border: dashed, 2, 0xccc;
  radius: 8;
  position: relative;
  overflow: hidden;
  
  issue: {
    color: 0xd47878;
    fontSize: 0.7, em;
  }

  if(error)
    <issue>{error}</issue>
  else if(!Render)
    <issue>Waiting for exports...</issue>
  else
    <Boundary key={key} onError={onError}>
      <Render />
    </Boundary>
}

export default Preview;