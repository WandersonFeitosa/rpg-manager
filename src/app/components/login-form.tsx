import Image from "next/image";
import styles from "../auth/auth.module.scss";
import discordLogo from "../../../public/assets/img/discord-logo.svg";

export function LoginForm({ setLoginMode }: { setLoginMode: any }) {
  return (
    <div className={styles.auth}>
      <div className={styles.form_wrapper}>
        <div className={styles.form_auth}>
          <h1 className={styles.form_title}>Acesse sua conta</h1>
          <form className={styles.form_body}>
            <input type="text" placeholder="E-mail" />
            <input type="password" placeholder="Senha" />
            <button type="submit">Entrar</button>
          </form>
          <div className={styles.form_footer}>
            Não tem uma conta?{" "}
            <span
              onClick={() => {
                setLoginMode(false);
              }}
            >
              Crie uma conta
            </span>
          </div>
        </div>
        <div>
          <div className={styles.discord_auth}>
            <div className={styles.discord_button}>
              <Image
                src={discordLogo}
                alt="Imagem de autenticação"
                width={30}
                height={30}
              />
              <span>Acessar com Discord</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
