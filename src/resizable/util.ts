import React from "react";

type ReactChildArray = ReturnType<typeof React.Children.toArray>;

export function flattenChildren(children: React.ReactNode): ReactChildArray {
  const array = React.Children.toArray(children);

  return array.reduce((flatChildren: ReactChildArray, child) => {
    const item = child as React.ReactElement<any>;

    if(item.type === React.Fragment)
      return flatChildren.concat(
        flattenChildren(item.props.children)
      );
      
    flatChildren.push(child);
    return flatChildren;
  }, []);
}