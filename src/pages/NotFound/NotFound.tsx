import {  Result } from "antd";

export type Props = {};

const NotFound = (props: Props) => {
  return (
    <div className={"flex-center h100"}>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={null}
      />
    </div>
  );
};

export default NotFound;
