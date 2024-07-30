import { useState } from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Home = () => {
  const { data, error, mutate } = useSWR('/api/messages', fetcher);
  const [message, setMessage] = useState("");

  if (error) return <div>Failed to load messages</div>;
  if (!data) return <div>Loading...</div>;

  const sendMessage = async () => {
    await fetch('/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    setMessage("");
    mutate();  // Revalidate the data
  };

  return (
    <div>
      <h1>Chat App</h1>
      <div>
        {data.messages.map((msg: string, index: number) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Home;
