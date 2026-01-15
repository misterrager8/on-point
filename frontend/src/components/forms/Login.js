import { useContext, useState } from "react";
import { MultiContext } from "../../Context";
import Input from "../atoms/Input";
import Button from "../atoms/Button";

export default function Login() {
  const multiCtx = useContext(MultiContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onChangeUsername = (e) => setUsername(e.target.value);
  const onChangePassword = (e) => setPassword(e.target.value);

  return (
    <form onSubmit={(e) => multiCtx.login(e, username, password)}>
      <Input
        className="mb-2"
        required
        value={username}
        onChange={onChangeUsername}
        placeholder="Username"
      />
      <Input
        type_="password"
        className="mb-2"
        required
        value={password}
        onChange={onChangePassword}
        placeholder="Password"
      />
      <Button className="w-100" type_="submit" text="Log In" />
    </form>
  );
}
