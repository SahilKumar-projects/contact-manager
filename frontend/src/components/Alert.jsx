const Alert = ({ message }) => {
  if (!message) return null;
  return <div className="alert-success">{message}</div>;
};

export default Alert;
