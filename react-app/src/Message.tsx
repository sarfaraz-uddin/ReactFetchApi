//PascalCasing
function Message() {
  //JSX:JavaScript XML
  const name = "Sarfaraz";
  if (name)
    return (
      <div className="d-flex justify-content-center align-items-center text-center vh-100">
        <h1>Hello {name}</h1>
      </div>
    );
  return <h1>Hello World</h1>;
}

export default Message;
