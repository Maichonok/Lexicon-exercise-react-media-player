import { useEffect, useMemo, useRef, useState } from "react";
import { CiPlay1, CiPause1 } from "react-icons/ci";
import { VscMute, VscUnmute } from "react-icons/vsc";
import { ImLoop } from "react-icons/im";
import { Duration } from "./Duration";
import "./PlayControl.css";

type Props = {
  playerRef: React.RefObject<HTMLMediaElement>;
  playing: boolean;
  loop: boolean;
  volume: number;
  muted: boolean;
  progress: number;
  duration: number;

  handlePlay: () => void;
  toggleMute: () => void;
  toggleLoop: () => void;
  handlePause: () => void;
  handleVolumeChange: (newVolume: number) => void;
};
export const PlayerControls = ({
  playerRef,
  loop,
  playing,
  volume,
  muted,
  progress,
  duration,
  handlePlay,
  toggleLoop,
  handlePause,
  handleVolumeChange,
  toggleMute,
}: Props) => {
  const [played, setPlayed] = useState<number>(0);
  const [seeking, setSeeking] = useState<boolean>(false);
  const playPauseButtonRef = useRef<HTMLButtonElement>(null);

  const togglePlayAndPause = () => {
    if (playing) {
      handlePause();
    } else {
      handlePlay();
    }
  };

  const handleSeekMouseDown = () => {
    setSeeking(true);
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayed(parseFloat(e.target.value));
  };

  const handleSeekMouseUp = (e: React.ChangeEvent<HTMLInputElement>) => {
    playerRef.current?.seekTo(parseFloat(e.target.value));
    setSeeking(false);
  };

  const handleChangeInVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleVolumeChange(Number(e.target.value));
  };

  useMemo(() => {
    setPlayed((prevPlayed) => {
      if (!seeking && prevPlayed !== progress) {
        return progress;
      }
      return prevPlayed;
    });
  }, [progress, seeking]);

  // shifts focus to play button on component mount
  useEffect(() => {
    playPauseButtonRef.current?.focus();
  }, []);

  return (
    <div className="wrapper">
      <div className="content">
        {/* duration: time played  */}
        <div className="duration">
          <Duration seconds={duration * played} />
        </div>

        {/* progress bar */}
        <div className="progress">
          <input
            type="range"
            min={0}
            max={0.999999}
            step="any"
            value={played}
            onMouseDown={handleSeekMouseDown}
            onChange={handleSeekChange}
            onMouseUp={handleSeekMouseUp}
            className="input"
          />
        </div>
        {/* duration: time left */}
        <div className="time">
          <Duration seconds={duration * (1 - played)} />
        </div>
      </div>

      <div className="container ">
        {/* loop button */}
        <div className="loop-button">
          <button
            className="button"
            onClick={toggleLoop}
          >
            <ImLoop />
          </button>
        </div>

        {/* play/pause button */}
        <div className="container-button">
          <button
            ref={playPauseButtonRef}
            className="play-button"
            onClick={togglePlayAndPause}
          >
            {playing ? <CiPause1 /> : <CiPlay1 />}
          </button>
        </div>

        {/* volume control */}
        <div className="volume-control">
          {/* mute button */}
          <button
            // className="focus:outline focus:outline-cyan-500"
            onClick={toggleMute}
          >
            {muted ? <VscMute /> : <VscUnmute />}
          </button>

          {/* volume slider */}
          <input
            type="range"
            className="slider"
            min={0}
            max={1}
            step={0.1}
            value={volume}
            onChange={handleChangeInVolume}
          />
        </div>
      </div>
    </div>
  );
};
