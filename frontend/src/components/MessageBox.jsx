export default function MessageBox({ side }) {
  return (
    <div
      className={`message-box bg-[#DFDFDF] px-2 py-5 inline-flex justify-end flex-col items-end ${
        side === "right" ? "ml-auto" : "mr-auto"
      } mt-auto`}
    >
      <p>Hey, How are you doing today?</p>
      <p>4:50pm</p>
    </div>
  );
}
