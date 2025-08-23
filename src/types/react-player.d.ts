// src/types/react-player.d.ts

// This declares a module for 'react-player' to provide basic type definitions
// when the official types might not be correctly picked up by the TypeScript compiler.
declare module 'react-player' {
    import * as React from 'react';
  
    interface ReactPlayerProps {
      url: string | string[];
      playing?: boolean;
      loop?: boolean;
      controls?: boolean;
      light?: boolean | string; // Can be a boolean or a URL to an image
      width?: string | number;
      height?: string | number;
      className?: string;
      style?: React.CSSProperties;
      progressInterval?: number;
      playsinline?: boolean;
      playIcon?: React.ReactNode; // For custom play icons when 'light' is true
      fallback?: React.ReactNode; // Fallback content for when the player fails
      wrapper?: React.ComponentType<any>; // Custom wrapper component
  
      // Callbacks
      onReady?: (player: any) => void;
      onStart?: () => void;
      onPlay?: () => void;
      onPause?: () => void;
      onBuffer?: () => void;
      onBufferEnd?: () => void;
      onEnded?: () => void;
      onError?: (error: any, data?: any) => void;
      onProgress?: (state: { playedSeconds: number; played: number; loadedSeconds: number; loaded: number; }) => void;
      onDuration?: (duration: number) => void;
      onSeek?: (seconds: number) => void;
    }
  
    interface ReactPlayerState {
      playing: boolean;
    }
  
    export default class ReactPlayer extends React.Component<ReactPlayerProps, ReactPlayerState> {
      seekTo(amount: number, type?: 'seconds' | 'fraction'): void;
      getDuration(): number;
      getCurrentTime(): number;
      getInternalPlayer(key?: string): object;
    }
  }
  