import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { LOGIN_MODE, REGISTER_MODE } from "../../helpers/common";
import { LOGIN_FIELDS, REGISTER_FIELDS } from "../../helpers/fields";
import {
  getUserData,
  handleLogin,
  passwordMatchInLogin,
  updateUserList,
  userAlreadyExists,
} from "../../helpers/general";
import "./auth.scss";

type FormData = {
  [key: string]: string;
};

const Auth = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<string>(LOGIN_MODE);
  const [formData, setFormData] = useState<FormData>({});

  const onFormDataChange = (dataKey: string, value: string) => {
    setFormData({ ...formData, [dataKey]: value });
  };

  const fields = useMemo(() => {
    return mode === LOGIN_MODE ? LOGIN_FIELDS : REGISTER_FIELDS;
  }, [mode]);

  const handleAuth = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    let emptyField = fields.find((field) => !formData[field.key]);

    if (emptyField) {
      return toast.error(`${emptyField.label} is empty`);
    }

    if (mode === REGISTER_MODE) {
      if (userAlreadyExists(formData?.email)) {
        return toast.error("User Already Exists");
      }
      if (formData?.password !== formData?.confirmPassword) {
        return toast.error("Password Don't Match");
      }
      updateUserList({
        email: formData?.email,
        password: formData?.password,
      });
      navigate("/", { state: { welcome: true } });
    }
    if (mode === LOGIN_MODE) {
      if (!userAlreadyExists(formData?.email)) {
        return toast.error("User Is Not Available. Please Regsiter");
      }
      if (!passwordMatchInLogin(formData?.email, formData?.password)) {
        return toast.error("Password Don't Match.");
      }
      handleLogin(formData?.email);
      navigate("/", { state: { welcome: true } });
    }
  };

  useEffect(() => {
    setFormData({});
  }, [mode]);

  useLayoutEffect(() => {
    const user = getUserData();
    if (user) {
      navigate("/");
    }
  });

  return (
    <div className="login">
      <div className="left">
        <h3>
          {mode === LOGIN_MODE
            ? "Log in to your account"
            : "Register to continue"}
        </h3>
        <form action="" className="login-form">
          {fields.map(({ key, label, type }) => {
            return (
              <label key={key} className="input-label">
                <span>{label}</span>
                <input
                  type={key}
                  value={formData?.[key] ?? ""}
                  className="input-field"
                  onChange={(e) => onFormDataChange(key, e.target.value)}
                />
              </label>
            );
          })}

          <button
            type="submit"
            className="continue"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleAuth(e)}
          >
            Continue
          </button>

          <div className="left-footer">
            <span>
              {mode === LOGIN_MODE ? "Don’t" : "Already"} have an account?{" "}
            </span>
            <a
              className="sign"
              onClick={() => {
                setMode(mode === LOGIN_MODE ? REGISTER_MODE : LOGIN_MODE);
              }}
            >
              Sign {mode === LOGIN_MODE ? "up" : "in"}
            </a>
          </div>
        </form>
      </div>
      <div className="right">
        <h5>Star Wars Online Archive</h5>
      </div>
    </div>
  );
};

export default Auth;
