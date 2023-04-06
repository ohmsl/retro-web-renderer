import { Button, ButtonGroup, Card, Elevation } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import React from "react";
import Entity from "../Entity/Entity";
import Inspector from "../Inspector/Inspector";
import "./ObjectExplorer.css";

interface ObjectExplorerProps {
  entities: { id: number; name: string }[];
  onAddShape: (shapeType: string) => void;
}

const ObjectExplorer: React.FC<ObjectExplorerProps> = ({
  entities,
  onAddShape,
}) => {
  return (
    <div className="object-explorer">
      <ButtonGroup vertical className="object-explorer-buttons">
        <Button
          icon={IconNames.CUBE_ADD}
          text="Add Cube"
          onClick={() => onAddShape("cube")}
        />
      </ButtonGroup>
      <div className="entities">
        {entities.map((entity) => (
          <Entity key={entity.id} name={entity.name} />
        ))}
      </div>
      <Card className="inspector" elevation={Elevation.TWO}>
        <Inspector />
      </Card>
    </div>
  );
};

export default ObjectExplorer;
