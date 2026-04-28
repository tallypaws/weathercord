"use client";

import Modal from "../Modal/Modal";

const SignUpModal = () => {
  const pictures = 10;

  let picture1 = Math.floor(Math.random() * pictures);
  let picture2;
  do {
    picture2 = Math.floor(Math.random() * pictures);
  } while (picture1 === picture2);
  return (
    <>
      <Modal>
        <img className="rounded-2xl absolute z-[-1] -translate-x-1/2 -translate-y-1/2 transition hover:scale-105" src={"/signup/" + picture1 + ".png"} aria-hidden style={{
          top: `calc(55% + ${Math.random() * 10}%)`,
          left: "calc(50% - 15rem)",
          width: `${Math.random() * 7 + 14}rem`
        }} />
        <img className="rounded-2xl absolute z-[-1] -translate-x-1/2 -translate-y-1/2 transition hover:scale-105" src={"/signup/" + picture2 + ".png"} aria-hidden style={{
          top: `calc(35% + ${Math.random() * 10}%)`,
          left: "calc(50% + 15rem)",
          width: `${Math.random() * 7 + 14}rem`
        }} />
        <img className="w-12 m-auto" src="/Weathercord.svg" alt="Weathercord" />
        <h1 className="text-center">Join Weathercord</h1>
        <form>
          <label>
            <div>Username</div>
            <input type="text" />
          </label>
          <label>
            <div>Password</div>
            <input type="password" />
          </label>
          <label>
            <div>Re-type Password</div>
            <input type="password" />
          </label>
          <input type="submit" value="Create Account" />
        </form>
      </Modal>
    </>
  );
};

export default SignUpModal;
