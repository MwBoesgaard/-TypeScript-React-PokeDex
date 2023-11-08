export function Speechbubble({ children }): JSX.Element {
  return (
    <div id="speechbubble">
      <div className="speech-1"></div>
      <div className="speech-2"></div>
      <div className="speech-3"></div>
      <div className="bubble">{children}</div>
    </div>
  );
}
export default Speechbubble;
