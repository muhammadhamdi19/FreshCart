const ProtectedRoute = ({ children }) => {
  if (localStorage.getItem("tkn") == null) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="font-bold text-green-700 text-center text-7xl ">
          Login First
        </h2>
      </div>
    );
  }
  return <>{children}</>;
};

export default ProtectedRoute;
