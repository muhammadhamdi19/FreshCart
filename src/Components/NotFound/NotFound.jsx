import { Helmet } from "react-helmet";
import error from "../../assets/images/error.svg";

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>FreshCart - Not Found</title>
      </Helmet>
      <img src={error} className="h-[85vh] w-full mt-24" alt="" />
    </>
  );
};

export default NotFound;
