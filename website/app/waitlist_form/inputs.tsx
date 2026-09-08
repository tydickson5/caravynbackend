type Props = {
  email?: string;
  onEmailChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  password?: string;
  onPasswordChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function Inputs({ email, onEmailChange, password, onPasswordChange }: Props) {
  return (
    <div>
      <input
        type="email"
        value={email ?? ''}
        onChange={onEmailChange}
        placeholder="Enter email"
      />
      <input
        type="password"
        value={password ?? ''}
        onChange={onPasswordChange}
        placeholder="Enter password"
      />
    </div>
  );
}