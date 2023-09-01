import defaultUser from "../assets/defaultUser.svg";
import SideBarChat from "../components/SideBarChat";
import fileChat from "../assets/fileClip.png";
import MessageBox from "../components/MessageBox";

export default function Messages() {
  return (
    <div className="grid grid-cols-3 h-[80vh]">
      <div className="friends-messages-container-left">
        <div className="current-user-profile flex items-center gap-5 bg-[#DFDFDF] px-12 py-3">
          <img src={defaultUser} alt="default user" width={45} />
          <p className="text-3xl">Current User</p>
        </div>
        <div className="friends-profiles-container bg-[#161433] py-8 h-[80vh] overflow-y-scroll">
          <form className="px-12">
            <input
              type="text"
              placeholder="search a username"
              className="outline-none px-12 py-3 border rounded-lg bg-[#D9D9D9] text-2xl w-full"
            />
          </form>
          <SideBarChat />
          <SideBarChat />
          <SideBarChat />
          <SideBarChat />
          <SideBarChat />
          <SideBarChat />
          <SideBarChat />
          <SideBarChat />
          <SideBarChat />
          <SideBarChat />
        </div>
      </div>
      <div className="friend-message-container-right col-span-2 bg-[#4C45B3] flex flex-col justify-between">
        <div className="top-container">
          <div className="current-user-profile flex items-center gap-5 bg-[#DFDFDF] px-12 py-3 border">
            <img src={defaultUser} alt="default user" width={45} />
            <p className="text-3xl">Friend</p>
          </div>
        </div>
        <div className="middle-container px-3 h-full">
          <div className="w-full flex flex-col gap-2 py-1">
            <MessageBox />
            <MessageBox />
            <MessageBox />
          </div>
          <div className="w-full flex flex-col gap-2 py-1 content-start">
            <MessageBox />
            <MessageBox />
            <MessageBox />
          </div>
        </div>
        <div className="bottom-container">
          <form className="flex row-reverse w-full">
            <div className="file-container bg-[#DFDFDF] flex items-center px-3">
              <input type="file" className="hidden outline-none" />
              <img
                src={fileChat}
                alt="attach file bg-red-500"
                width={30}
                className="cursor-pointer"
              />
            </div>
            <input
              className="w-full px-4 py-5 border bg-[#DFDFDF] outline-none text-3xl"
              placeholder="Send your message..."
            />
          </form>
        </div>
      </div>
    </div>
  );
}
