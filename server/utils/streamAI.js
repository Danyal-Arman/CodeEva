export const streamAI = async ({
  stream,
  socket,
  streamId,
  eventName,
  endEventName,
}) => {
  const reader = stream.getReader();
  const decoder = new TextDecoder("utf-8");

  let fullResponse = "";
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });

    const lines = buffer.split("\n");
    buffer = lines.pop();

    for (let line of lines) {
      line = line.trim();

      if (!line || line === "data: [DONE]") continue;

      if (line.startsWith("data: ")) {
        try {
          const json = JSON.parse(line.replace("data: ", ""));
          const token = json.choices?.[0]?.delta?.content;

          if (token) {
            fullResponse += token;

            io.to(socket.id).emit(eventName, {
              token,
              streamId,
            });
          }
        } catch (err) {
          console.log("Skipping invalid JSON chunk");
        }
      }
    }
  }

  return fullResponse;
};