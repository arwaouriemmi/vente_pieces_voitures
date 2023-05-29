
function ErrorPage({
  message
} : {
  message: string
}) {
  return (
    <div style={{marginTop: 100, color: "red"}}>
      <h3>{ message }</h3>
    </div>
  );
}

export default ErrorPage;