import { Alignment, Card, Elevation, Navbar } from "@blueprintjs/core";
import { useState } from "react";
import Scene, { ShapeType } from "../Scene";
import ObjectExplorer from "./ObjectExplorer/ObjectExplorer";
import "./editor.css";

const Editor = () => {
  const [entities, setEntities] = useState([
    { id: 1, name: "Cube 1" },
    { id: 2, name: "Cube 2" },
  ]);

  const handleAddShape = (shapeType: ShapeType) => {
    // Create the new shape in the scene
    Scene.addShape(shapeType);

    // Create a new entity object with a unique id and a name based on the shape type
    const newEntity = {
      id: entities.length + 1,
      name: `${shapeType.charAt(0).toUpperCase() + shapeType.slice(1)} ${entities.length + 1}`,
    };
  
    // Update the entities state with the new entity
    setEntities([...entities, newEntity]);
  };
  

  return (
    <div className="editor">
      <Navbar className="bp3-dark">
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>3D Editor</Navbar.Heading>
        </Navbar.Group>
      </Navbar>
      <div className="editor-container">
        <ObjectExplorer entities={entities} onAddShape={handleAddShape} />
        <div className="viewport">
          <Scene />
        </div>
      </div>
      <Card className="bottom-instructions" elevation={Elevation.TWO}>
        To transform object, double click it.
      </Card>
    </div>
  );
};

export default Editor;
