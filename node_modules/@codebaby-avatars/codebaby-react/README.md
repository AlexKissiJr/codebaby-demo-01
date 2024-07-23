# [Codebaby Avatar](https://codebaby.com/)
## A Codebaby Avatar library
A library to run codebaby on ___React___. That's come with _hooks_ and `AvatarProvider`.

### Installing codebaby-react
```bash
npm install @codebaby-avatars/codebaby-react
```

## Provider
Add our provider surrounding your components

```jsx
"use client";
import { useRef } from 'react';
import { AvatarProvider } from '@codebaby-avatars/codebaby-react';

const App = () => {
    const aProviderRef = useRef(null);
	return (
	    <AvatarProvider
	        id="react-avatar"
	        // on ref will provide you an events handler instance
	        // with listener (on, off) and emitter method
	        ref={aProviderRef}
	        // You could listen all codebaby events here
	        // using lowerCamelCase like 'initialized' should be 'onInitialized'
	        onInitialized={() => {
                console.log('onInitialized');
            }}
	    >
	       {
	        // Your components and/or page(s) goes here
	        // all components that will use useCodebabyEvents, should go here
	       }
	    </AvatarProvider>
	);
};
```
> Replace "react-avatar" with your avatarId from [Codebaby portal](https://portal.codebaby.com).


## Hooks

### useCodebabyEvents

You can use this hook to access the Event handler instace and set or remove event listeners or dispatch a event too.

> The Event handler instace is the same on ref for AvatarProvider and in useCodebabyEvents, with `on` to set [event listener](#Listened_Events), and `off` to unset, and with `trigger` to [dispatch event](#Triggered_Events)

#### Sending a message to avatar

```jsx
    import { useCodebabyEvents } from '@codebaby-avatars/codebaby-react';
    const MyComp = () => {
        /* ... */
        const { trigger } = useCodebabyEvents();
        
        function handleEvent() {
            trigger('ask', 'Why is the sky blue?')
        };
        /* ... */
    };
```

### useIsInitialized

You can use this hook to verify if codebaby was initialized and do something like set a new event listener.

```jsx
    import { useEffect } from 'react';
    import { useCodebabyEvents, useIsInitialized } from '@codebaby-avatars/codebaby-react';
    const MyComp = () => {
        /* ... */
        const { on, off } = useCodebabyEvents();
        const isInitialized = useIsInitialized();
        
        useEffect(() => {
            if(isInitialized) {
                const onResponse = (e, responseData) => {
                    // do something
                }
                on('response', onResponse);
                return () => {
                    off('response', onResponse);
                };
            }
        }, [isInitialized]);
        /* ... */
    }
```

## Codebaby Events

This document lists all the `events` supported by the Codebaby library. The events are divided into two categories: triggered events that your application can trigger, and listened events that your application can listen for to respond to specific actions or state changes.

# Triggered_Events
These events can be triggered by your application using ref from `AvatarProvider` or `useCodebabyEvents().trigger`:
```jsx
    const avatarProviderRef = useRef(null);
    function handleDispatch() {
        avatarProviderRef.current.trigger('<event_name>', '<event_data>')
    }
    /* ... */
    <AvatarProvider id="react-avatar" ref={avatarProviderRef}>
        {/* ... */}
```
Replace <event_name> with the event name from the list below, and optional <event_data> with any relevant data for that event.
List of Triggered Events

- ask: Trigger a question or query.
- microphoneStop: Stop the microphone from recording.
- play: Start media playback.
- pause: Pause media playback.
- mute: Mute media playback.
- unmute: Unmute media playback.
- record-start: Start video recording.
- record-stop: Stop video recording.
- video-cancel: Cancel video recording or conversion.
- camChange: Change the camera input source.

# Listened_Events
Your application can listen for these events and respond to specific actions or state changes. To listen for an event, you can use ref from `AvatarProvider`, the event on AvatarProvider with 'on' and first letter of event in uppercase or using `useCodebabyEvents().on`:
```jsx
    /* ... */
    <AvatarProvider onUnmute={() => {
        // do something
    }}>
        {/* ... */}
```
> Don't forget, you should use with 'on' and first character on uppercase, like 'camChange' should be 'onCamChange' and in case like 'record-start' should be 'onRecordStart'

---
# Events
List of Listened Events

- initialized: Triggered when the library has completed its initialization process.
- playResponseData: Triggered when response data is ready to be played.
- response: Triggered when the library receives a response from the server.
- playResponse: Triggered when a response starts playing.
- microphoneStarted: Triggered when the microphone starts recording.
- microphoneAudio: Triggered when new microphone audio data is available.
- microphoneData: Triggered when the microphone data is processed and ready.
- microphoneStopped: Triggered when the microphone has stopped recording.
- playerBuilt: Triggered when the media player has been built and initialized.
- unPark: Triggered when the parked state is removed.
- segmentEnded: Triggered when a media segment has ended.
- clientData: Triggered when the library receives new client data.
- extractedEntity: Triggered when an entity is extracted from the user's input.
- player:state: Triggered when the player's state changes.
- preRender: Triggered before rendering a new UI element.
- interimPlayResponse: Triggered when an interim response starts playing.
- interimResponse: Triggered when the library receives an interim response from the server.
- interimSegmentEnded: Triggered when an interim media segment has ended.
- playerLoadingAssets: Triggered when the media player is loading new assets.
- video-progress: Triggered when the video conversion process makes progress.
- video-converted: Triggered when the video conversion process is completed.
- video-ready: Triggered when the video is ready for playback.
- glbLoaded: Triggered when a 3D model (GLB file) is loaded.

> Remember to replace the event name and data with the appropriate values for your use case.