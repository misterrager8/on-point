import { useContext, useState } from "react";
import { MultiContext } from "../../Context";
import Input from "../atoms/Input";
import Button from "../atoms/Button";

export default function Signup() {
  const multiCtx = useContext(MultiContext);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const onChangeUsername = (e) => setUsername(e.target.value);
  const onChangeEmail = (e) => setEmail(e.target.value);
  const onChangePassword = (e) => setPassword(e.target.value);
  const onChangePasswordConfirm = (e) => setPasswordConfirm(e.target.value);

  return (
    <form
      onSubmit={(e) =>
        multiCtx.signup(e, email, username, password, passwordConfirm)
      }>
      <Input
        className="mb-2"
        required
        value={email}
        onChange={onChangeEmail}
        placeholder="E-Mail"
      />
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
      <Input
        type_="password"
        className="mb-2"
        required
        value={passwordConfirm}
        onChange={onChangePasswordConfirm}
        placeholder="Confirm Password"
      />
      <Button className="w-100" type_="submit" text="Sign Up" />
    </form>
  );
}
