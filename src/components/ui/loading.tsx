const Loading = ({ className = "" }) => {
  return (
    <div
      className={`loading-container d-flex justify-content-center align-items-center ${className}`}
    >
      <div className="loading-spinner">
        {/* Outer ring */}
        <div className="loading-ring loading-ring-outer" />

        {/* Inner ring */}
        <div className="loading-ring loading-ring-inner" />

        {/* Center dot */}
        <div className="loading-dot" />
      </div>
    </div>
  );
};

export default Loading;
