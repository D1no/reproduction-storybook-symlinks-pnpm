import React, { ReactNode } from "react";

// -----------------------------------------------------------------------------
// Some View specific higher order components
// -----------------------------------------------------------------------------

interface SampleContainerProps {
  /**
   * Set the text of the SampleContainer. This is a JSDoc of the text property.
   */
  children?: ReactNode;
}

/**
 * This is the description of the SampleContainer as JSDoc. It take a UI Component
 * as a child and would be in reality a layout or app shell for a micro frontend.
 */
export const SampleContainer = ({ children }: SampleContainerProps) => {
  return (
    <>
      <div>This SampleContainer wraps the following UI Component:</div>
      <br />
      {children}
    </>
  );
};

// -----------------------------------------------------------------------------
// The View (publishable Micro Frontend)
// -----------------------------------------------------------------------------

import Component, { ComponentProps } from "@repo/ui/Component";

interface SampleViewProps extends ComponentProps {}

/**
 * This is the description of the SampleView as JSDoc. It inherits / extends up
 * stream interfaces (here ComponentProps) and is a self standing publishable
 * module.
 */
const SampleView = ({ text }: SampleViewProps) => {
  return (
    <>
      <h1>This is the SampleView</h1>
      <br />
      <SampleContainer>
        <Component text={text} />
      </SampleContainer>
    </>
  );
};

export default SampleView;
