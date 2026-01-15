import Login from "../forms/Login";
import Signup from "../forms/Signup";

export default function Auth() {
  return (
    <div>
      <>
        <div className="flex">
          <div className="w-100 p-3">
            <Login />
          </div>
          <div className="w-100 p-3">
            <Signup />
          </div>
        </div>
      </>
    </div>
  );
}
