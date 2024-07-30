export async function GET(req: Request): Promise<Response> {
  const { searchParams } = new URL(req.url);
  const message = searchParams.get("message");
  
  if (!message) {
    return new Response(JSON.stringify({ error: "メッセージがありません" }), { status: 400 });
  }

  const url = `https://sc-test-api.azurewebsites.net/root`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Failed to fetch Message");
    }
    const result = await res.json();
    return new Response(JSON.stringify({ result }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), { status: 500 });
  }
}
