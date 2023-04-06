import { Alignment, Button, Card, Elevation, Navbar } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import Scene from "../Scene";
import Inspector from "./Inspector";
import "./editor.css";

const Editor = () => {
  return (
    <div className="editor">
      <Navbar className="bp3-dark">
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>3D Editor</Navbar.Heading>
          <Navbar.Divider />
          <Button
            className="bp3-minimal"
            icon={IconNames.CUBE_ADD}
            text="Add Cube"
          />
        </Navbar.Group>
      </Navbar>
      <div className="viewport">
        <Scene />
      </div>
      <Card className="bottom-instructions" elevation={Elevation.TWO}>
        To transform object, double click it.
      </Card>
      <Card className="inspector" elevation={Elevation.TWO}>
        <Inspector />
      </Card>
    </div>
  );
};

export default Editor;
