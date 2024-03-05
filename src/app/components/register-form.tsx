import toast from "react-hot-toast";
import styles from "../auth/auth.module.scss";
import { useEffect, useState } from "react";
import { passwordStrenghtValidator } from "@/utils/password-strenght-validator";

export function RegisterForm({ setLoginMode }: { setLoginMode: any }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordStrengthColor, setPasswordStrengthColor] =
    useState("var(--red-500)");
  const [passowordStrengthClass, setPasswordStrengthClass] = useState("");
  const [displayPasswordStrength, setDisplayPasswordStrength] = useState(
    styles.d_none
  );

  const [passwordStrengthText, setPasswordStrengthText] = useState("");

  useEffect(() => {
    const passowrdStrenghtTest = passwordStrenghtValidator(password);
    if (password.length > 0) {
      setDisplayPasswordStrength(styles.password_strength);
      switch (passowrdStrenghtTest) {
        case 1:
          setPasswordStrengthText("fraca");
          setPasswordStrengthClass(styles.weak);
          setPasswordStrengthColor("var(--red-500)");
          setPasswordStrength(1);
          break;
        case 2:
          setPasswordStrengthText("média");
          setPasswordStrengthClass(styles.medium);
          setPasswordStrengthColor("var(--yellow-500)");
          setPasswordStrength(2);
          break;
        case 3:
          setPasswordStrengthText("forte");
          setPasswordStrengthClass(styles.strong);
          setPasswordStrengthColor("var(--green-500)");
          setPasswordStrength(3);
          break;
      }
    } else {
      setDisplayPasswordStrength(styles.d_none);
    }
  }, [password]);

  async function handleSubmit(event: any) {
    event.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      toast.error("Preencha todos os campos!");
      return;
    }
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      toast.error("E-mail inválido!");
      return;
    }
    if (passwordStrength <= 1) {
      toast.error("Senha fraca, tente uma senha mais forte!");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("As senhas não coincidem!");
      return;
    }
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    try {
      const response = await fetch(`${apiUrl}/v1/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      if (response.status !== 201) {
        const error = await response.json();
        throw new Error(error.message);
      }
      toast.success("Conta criada com sucesso!");

      setTimeout(() => {
        setLoginMode(true);
      }, 1500);
    } catch (error: any) {
      if (typeof error.message === "string") toast.error(error.message);
    }
  }
  return (
    <div className={styles.auth}>
      <div className={styles.form_wrapper}>
        <div className={styles.form_auth}>
          <h1 className={styles.form_title}>Registrar conta</h1>
          <form className={styles.form_body}>
            <input
              type="text"
              placeholder="Nome"
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
            <input
              type="text"
              placeholder="E-mail"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Senha"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <div className={displayPasswordStrength}>
              <div
                className={`${styles.strength} ${passowordStrengthClass}`}
              ></div>
              <span>
                Força da senha:{" "}
                <span
                  style={
                    { color: passwordStrengthColor } as React.CSSProperties
                  }
                >
                  {passwordStrengthText}
                </span>
              </span>
            </div>
            <input
              type="password"
              placeholder="Confirme a senha"
              onChange={(event) => {
                setConfirmPassword(event.target.value);
              }}
            />
            <button
              type="submit"
              onClick={(event) => {
                handleSubmit(event);
              }}
            >
              Registrar
            </button>
          </form>
          <div className={styles.form_footer}>
            Já possui uma conta?{" "}
            <span
              onClick={() => {
                setLoginMode(true);
              }}
            >
              Fazer login
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
