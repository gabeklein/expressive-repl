import Boundary from './Boundary';
import Control from './Control';

const Preview = () => {
  const { set, error, Render } = Control.use();

  flex: 1;
  flexAlign: center;
  border: dashed, 2, 0xccc;
  margin: 3;
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
    <Boundary>
      <Render />
    </Boundary>
}

export default Preview;