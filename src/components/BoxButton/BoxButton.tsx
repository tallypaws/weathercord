import { ReactNode } from "react";

const BoxButton = (props: Record<string, any> & {
  children: ReactNode
}) => {
  return (
    <div {...props} className={"rounded-[0.4rem] p-[0.3rem] h-fit cursor-pointer transition hover:bg-(--box-button-active) hover:backdrop-blur-[0.2rem] " + props.className}>{props.children}</div>
  );
};

export default BoxButton;

