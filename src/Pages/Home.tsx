export const Home = ({ account }: { account: Taccount }) => {
  console.log(account);

  return (
    <div>
      <h2>Hello , Welcome to the Home page, your account {account ?? "-"}</h2>
    </div>
  );
};
