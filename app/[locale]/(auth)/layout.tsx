import React from "react";

type Props = {
  children: React.ReactNode;
};

const layout = (props: Props) => {
  return <div className="h-full bg-slate-700 text-white">{props.children}</div>;
};

export default layout;
