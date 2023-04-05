import Scene from "../Scene";

const Editor = () => {
  return (
    <div className="editor">
      <div className="viewport">
        <Scene />
      </div>
      <p style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        color: "white",
        fontSize: "1rem",
        
      }}>To transform object, double click it.</p>
      <div className="sidebar">
        <h1>Editor</h1>
        <p>Welcome to the editor!</p>
      </div>
    </div>
  );
};

export default Editor;
