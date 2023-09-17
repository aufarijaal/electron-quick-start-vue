export default async function backendCall(
  channelName: string,
  ...args: unknown[]
) {
  const result = await window.api.call(channelName, ...args);
  return result;
}
