import styles from "../auth/auth.module.scss";

export function RegisterForm({ setLoginMode }: { setLoginMode: any }) {
  return (
    <div className={styles.auth}>
      <div className={styles.form_wrapper}>
        <div className={styles.form_auth}>
          <h1 className={styles.form_title}>Registrar conta</h1>
          <form className={styles.form_body}>
            <input type="text" placeholder="E-mail" />
            <input type="password" placeholder="Senha" />
            <button type="submit">Entrar</button>
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
