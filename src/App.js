import React, { useRef, useEffect, useCallback, useState } from 'react';
import { AvatarProvider } from '@codebaby-avatars/codebaby-react';

function App() {
  const aProviderRef = useRef(null);
  const [isInitialized, setIsInitialized] = useState(false);
  // You could set and unset codebaby events
  // usign 'on' and 'off' methods by ref
  // but it could not work as expected
  // until the codebaby is fully initialized
  // you could use by <AvatarProvider on'EventName'={...} />

  const handleAvatarClick = useCallback(async () => {
    console.log('Avatar touched');
    // Resume AudioContext if it's suspended
    const audioContext = (aProviderRef.current)?.audioContext;
    if (audioContext && audioContext.state === 'suspended') {
      await audioContext.resume();
      console.log('AudioContext resumed');
    }

    if (aProviderRef.current) {
      aProviderRef.current.trigger('na-microphoneStarted.vidbaby', {});
      aProviderRef.current.trigger('na-microphoneToggle.vidbaby', {});
      console.log('Microphone enabled');
    }
  }, []);

  useEffect(() => {
    if(!isInitialized) return;
    const onResponse = (e, responseData) => {
      console.log('ResponseMessage', responseData);
    };
    const aProvider = aProviderRef.current;

    const button = document.getElementById('avatar-button');
    if (button) {
      button.addEventListener('touchstart', handleAvatarClick);
    }
    if(aProvider){
      aProvider.on('response', onResponse);
    }
    return () => {
      if (button) {
        button.removeEventListener('touchstart', handleAvatarClick);
      }
      aProvider.off('response', onResponse);

    };
   
  }, [aProviderRef, isInitialized, handleAvatarClick]);

  // you can use ref to trigger the events too
  const handleHello = useCallback(() =>  {
    if(aProviderRef.current) {
      console.log('Triggering playResponse')
      aProviderRef.current.trigger('playResponse', { answer: 'Hey! Just tap the screen to get started?' });
      aProviderRef.current.trigger('ask', { text: 'Hello' });
    }
  }, []);

  return (
    <AvatarProvider
      // on ref will provide you an events handler instance
      // with listener (on, off) and emitter method
      ref={aProviderRef}
      // You could listen all codebaby events here
      // using lowerCamelCase like 'initialized' should be 'onInitialized'
      onInitialized={() => {
        console.log('onInitialized')
        setIsInitialized(true);
        handleHello();
      }}
      id="EngagedMedia-Anthony">
        <div id="codebaby-container" className="w-full h-full"></div>
        <button id="avatar-button"></button>
    </AvatarProvider>
  );
}

export default App;
