import defaultUser from "../assets/defaultUser.svg";

export default function SideBarChat() {
  return (
    <>
      <div className="profile-container px-12 py-5 flex items-center gap-5">
        <img
          src={defaultUser}
          alt="default user"
          className="border rounded-full"
        />
        <div className="profile-mini-info text-white w-full">
          <div className="flex items-center justify-between">
            <h6 className="text-3xl">DON LONDON</h6>
            <p>4:30pm</p>
          </div>
          <p>Hello, How are you?...</p>
        </div>
      </div>
      <div className="horizontal-line w-[90%] mx-auto h-1 bg-white"></div>
    </>
  );
}
