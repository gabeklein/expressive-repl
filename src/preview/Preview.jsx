import Sandbox from './Sandbox';
import Control from './Control';

const Preview = () => {
  const {
    error,
    key,
    onError,
    component,
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
  else if(!component)
    <issue>Waiting for exports...</issue>
  else
    <Sandbox key={key} onError={onError} component={component} />
}

export default Preview;