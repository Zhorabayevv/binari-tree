import React from "react";
import "./App.css";
import { ITree } from "./models/ITree";
import NodeComponent from "./components/NodeComponent";

const App: React.FC = () => {
  const [nodes, setNodes] = React.useState<ITree[]>([]);
  const [root, setRoot] = React.useState<ITree>({
    value: 50,
    x: window.innerWidth / 2,
    y: 50,
  });

  const insertNode = React.useCallback(
    (value: number, node: ITree) => {
      if (value < node.value) {
        if (!node.left) {
          const newNode = { value, x: node.x - 50, y: node.y + 50 };
          node.left = newNode;
          setNodes([...nodes, newNode]);
        } else {
          insertNode(value, node.left);
        }
      } else {
        if (!node.right) {
          const newNode = { value, x: node.x + 50, y: node.y + 50 };
          node.right = newNode;
          setNodes([...nodes, newNode]);
        } else {
          insertNode(value, node.right);
        }
      }
    },
    [nodes]
  );

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === " ") {
        const value = Math.floor(Math.random() * 201) - 100;
        insertNode(value, root);
      }
    },
    [insertNode, root]
  );

  return (
    <div onKeyDown={handleKeyDown} tabIndex={0}>
      <ul>
        <NodeComponent node={root} nodes={nodes} />
      </ul>
    </div>
  );
};

export default App;
