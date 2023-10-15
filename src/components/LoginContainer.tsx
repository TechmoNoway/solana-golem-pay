import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const LoginContainer: FC<Props> = ({ children }) => {
  return (
    <>
      <div>{children}</div>
    </>
  );
};
