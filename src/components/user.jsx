import { useState, useEffect } from "react";
import { useOutletContext, useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import ReactModal from "react-modal";
import axios from "axios";

import "../res/user.css";

ReactModal.setAppElement("#root");

export default function User() {
  const navigate = useNavigate();

  const { id } = useParams();
  const { user, removeCookie, setUser } = useOutletContext();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function getUser() {
      try {
        const response = await axios.get(`http://localhost:3000/user/${id}`);

        if (response.data?.user) {
          setUserData(response.data.user);
        } else {
          navigate("/");
        }
      } catch (err) {
        console.error(err);
        navigate("/");
      }
    }

    getUser();
  }, [id, navigate]);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  async function deleteAccount() {
    if (!user?.id || user?.id != id) {
      return;
    }

    const response = await axios.delete(`http://localhost:3000/user/${id}`, {
      withCredentials: true,
    });

    if (response?.status == 200) {
      removeCookie("payload");
      removeCookie("user");

      setUser(null);

      navigate("/", { viewTransition: true });
    }

    closeModal();
  }

  function handleSelfOptions() {
    if (!user?.id || user?.id != id) return null;

    return (
      <button className="negative" type="button" onClick={openModal}>
        Delete Account
      </button>
    );
  }

  function displayUserData() {
    if (!userData) {
      return <p>Fetching...</p>;
    }

    return (
      <div className="userContainer">
        <div className="details">
          <h2 className="username">{userData.username}</h2>
          <p className="email">{userData.email}</p>
        </div>
        <div className="options">{handleSelfOptions()}</div>
      </div>
    );
  }

  const modal = (
    <ReactModal
      className="Modal"
      overlayClassName="Overlay"
      isOpen={modalIsOpen}
      contentLabel="Confirm Account Deletion"
      onRequestClose={closeModal}
    >
      <div className="modalContainer">
        <h2>Delete Account?</h2>
        <p className="noMargin">
          Are you sure you want to delete your Account?
        </p>
        <p className="noMargin">This will also delete all of your comments.</p>
        <p>
          <b>This action is irreversible.</b>
        </p>
        <div className="flex row center actions">
          <button onClick={closeModal}>Cancel</button>
          <button className="negative" type="button" onClick={deleteAccount}>
            Delete Account
          </button>
        </div>
      </div>
    </ReactModal>
  );

  return (
    <>
      {modal}
      <section className="baseSection userSection">{displayUserData()}</section>
    </>
  );
}
