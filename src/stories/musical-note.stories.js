import React from 'react';
import MusicNote from '../baseUI/musical-note';

export default {
  title: 'BaseUI/MusicNote',
  component: MusicNote,
};

const Template = (args) => {
  const musicNoteRef = React.useRef(null);

  const handleAnimationEnd = () => {
    setTimeout(() => {
      musicNoteRef.current.startAnimation({ x: 100, y: 100 });
    }, 20);
  };

  return (
    <div>
      <button onClick={handleAnimationEnd}>
        <span>点击触发</span>
      </button>
      <MusicNote {...args} ref={musicNoteRef} />
    </div>
  );
};

export const Default = Template.bind({});
