import React from "react";
import { TreeMap } from "react-google-charts";

const Tree = ({ item }) => {
  const treeData = [{
        id: item.name,
        parent: null,
        value: item.cost,
        title: item.name,
    }];

  const createTreeData = (item, parent) => {
    if (item.componentItems) {
        item.componentItems.forEach((child) => {
        treeData.push({
            id: child.name,
            parent: parent,
            value: child.cost,
            title: child.name,
        });
        createTreeData(child, child.name)
    })}
  }

  createTreeData(item, item.name);

  return (
    <TreeMap
      data={treeData}
      columns={[
        {
          type: "string",
          id: "id",
        },
        {
          type: "string",
          id: "parent",
        },
        {
          type: "number",
          id: "value",
        },
        {
          type: "string",
          role: "tooltip",
          id: "title",
        },
      ]}
      options={{
        minColor: "#ffffff",
        midColor: "#7f7f7f",
        maxColor: "#000000",
        headerHeight: 15,
        fontColor: "black",
        showScale: true,
      }}
      height="300px"
      width="100%"
    />
  );
};

export default Tree;
