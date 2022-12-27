import { Button, Result } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export type Props = {};

const NotFound = (props: Props) => {
  const navigate = useNavigate();
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
