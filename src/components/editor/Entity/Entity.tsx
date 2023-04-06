import React from "react";

interface EntityProps {
  name: string;
}

const Entity: React.FC<EntityProps> = ({ name }) => {
  return <div className="entity">{name}</div>;
};

export default Entity;
