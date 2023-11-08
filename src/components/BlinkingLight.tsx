import { useEffect, useState } from 'react';

export const BlinkingLight = (): JSX.Element => {
  const [isOn, setOn] = useState<boolean>(true);

  const blink = () => {
    setOn(!isOn);
  };

  useEffect(() => {
    const intervalId = setInterval(blink, 1000);

    return () => clearInterval(intervalId);
  }, [isOn]);

  return (
    <div
      id="statusCircle"
      style={
        isOn
          ? { backgroundColor: 'red', boxShadow: '0 0 10px 10px #A53' }
          : {
              backgroundColor: 'darkred',
            }
      }
    >
      <div id="highlightL"></div>
      <div id="highlightS"></div>
    </div>
  );
};
export default BlinkingLight;
