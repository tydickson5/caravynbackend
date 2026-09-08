type Props = {
  email: string;
};

export function Submit({ email }: Props) {
  async function join() {
    await fetch('/api/waitlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        betaTesting: true,
      }),
    });
  }

  return (
    <div>
      <button onClick={join}>Join</button>
    </div>
  );
}