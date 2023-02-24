import React from "react";
import { INode } from "../models/INode";

const NodeComponent: React.FC<INode> = ({ node, nodes }) => {
  const { value, left, right } = node;
  const leftNodes = React.useMemo(
    () =>
      nodes.filter(
        (n) =>
          (left && n.value === left.value) || (right && n.value === right.value)
      ),
    [left, right, nodes]
  );

  return (
    <li>
      {value}
      {left || right ? (
        <ul>
          {left && <NodeComponent node={left} nodes={leftNodes} />}
          {right && <NodeComponent node={right} nodes={leftNodes} />}
        </ul>
      ) : null}
    </li>
  );
};

export default NodeComponent;
