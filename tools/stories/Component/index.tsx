import React from "react";

interface ComponentProps {
  /**
   * Set the text of the component. This is a JSDoc of the text property.
   */
  text?: string;
}

/**
 * This is the description of the Component as JSDoc.
 */
const Component = ({ text }: ComponentProps) => {
  return <div>This component text says: {text}</div>;
};

export default Component;
