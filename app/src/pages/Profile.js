import { useState } from "react";
import { useAuth } from "../hooks/AuthProvider";
import { toast } from "react-toastify";

const Profile = () => {
  const auth = useAuth();

  const [contactEmail, setContactEmail] = useState(auth.user.contactEmail);
  const [contactPhone, setContactPhone] = useState(auth.user.contactPhone);
  const [contactMessenger, setContactMessenger] = useState(
    auth.user.contactMessenger
  );

  return (
    <div className="container">
      <h2 className="mb-4 mt-5">Profile</h2>
      <form
        className="col-5"
        onSubmit={(e) => {
          e.preventDefault();

          toast.promise(
            async () => {
              try {
                await auth.update({
                  contactEmail,
                  contactPhone,
                  contactMessenger,
                });
              } catch (error) {
                console.error(error);
                throw error;
              }
            },
            {
              pending: "Updating profile",
              error: "Error while updating profile",
              success: "Profile was updated",
            }
          );
        }}
      >
        <div className="mb-2">
          <label className="form-label" htmlFor="profileUsernameInput">
            Username
          </label>
          <input
            className="form-control"
            id="profileUsernameInput"
            readOnly
            value={auth.user.username}
          />
        </div>
        <div className="mb-2">
          <label className="form-label" htmlFor="profileEmailInput">
            Email
          </label>
          <input
            className="form-control"
            id="profileEmailInput"
            readOnly
            value={auth.user.email}
          />
        </div>
        <div className="mb-2">
          <label className="form-label" htmlFor="profileContactEmailInput">
            Contact Email
          </label>
          <input
            className="form-control"
            id="profileContactEmailInput"
            type="email"
            defaultValue={auth.user.contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
          />
        </div>
        <div className="mb-2">
          <label className="form-label" htmlFor="profileContactPhoneInput">
            Contact Phone
          </label>
          <input
            className="form-control"
            id="profileContactPhoneInput"
            defaultValue={auth.user.contactPhone}
            onChange={(e) => setContactPhone(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="profileContactMessengerInput">
            Contact Messenger
          </label>
          <input
            className="form-control"
            id="profileContactMessengerInput"
            defaultValue={auth.user.contactMessenger}
            onChange={(e) => setContactMessenger(e.target.value)}
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Save
        </button>
      </form>
    </div>
  );
};

export default Profile;
