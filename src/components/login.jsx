import "../res/login.css";

export default function Login() {
  return (
    <section className="baseSection loginSection flexFill">
      <div className="borderWrapper">
        <form className="login" action="" method="POST">
          <div className="formEntry">
            <label for="username">Username</label>
            <input name="username" id="username" required></input>
          </div>
          <div className="formEntry">
            <label for="username">Password</label>
            <input name="password" id="password" required></input>
          </div>
          <button type="submit" className="submit">
            Login
          </button>
        </form>
      </div>
    </section>
  );
}
