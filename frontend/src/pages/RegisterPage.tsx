import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styles from "./RegisterPage.module.css";
import { apiUrl } from "../config/api";

interface FormInputs {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password2: string;
}

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormInputs>();

  // eslint-disable-next-line react-hooks/incompatible-library
  const passwordValue = watch("password");

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setApiError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch(apiUrl("register/"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          const firstErrorKey = Object.keys(errorData)[0];
          const firstErrorMessage = errorData[firstErrorKey][0];

          setApiError(
            firstErrorMessage || "Falha ao cadastrar. Verifique os dados."
          );
        } else {
          const errorText = await response.text();
          console.error("Resposta não-JSON do servidor:", errorText.substring(0, 200));
          setApiError(
            `Erro do servidor (${response.status}). Verifique se o backend está configurado corretamente.`
          );
        }
        return;
      }

      setSuccessMessage("Conta criada com sucesso! Redirecionando para o login...");
      
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("Falha na requisição:", error);
      const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
      console.error("Detalhes do erro:", errorMessage);
      console.error("URL tentada:", apiUrl("register/"));
      setApiError(
        `Não foi possível conectar ao servidor. Verifique se o backend está rodando e acessível. Erro: ${errorMessage}`
      );
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img
          className={styles.logo}
          src="/logo-backGray-horizontal.png?url"
          alt=""
        />
        <h2 className={styles.subtitle}>Crie sua conta</h2>

        {apiError && <div className={styles.apiError}>{apiError}</div>}
        {successMessage && <div className={styles.successMessage}>{successMessage}</div>}

        <form noValidate onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="first_name" className={styles.label}>
              Nome
            </label>
            <input
              id="first_name"
              type="text"
              className={styles.input}
              {...register("first_name", {
                required: "Nome é obrigatório",
              })}
            />
            {errors.first_name && (
              <span className={styles.error}>{errors.first_name.message}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="last_name" className={styles.label}>
              Sobrenome (Opcional)
            </label>
            <input
              id="last_name"
              type="text"
              className={styles.input}
              {...register("last_name")}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>
              E-mail
            </label>
            <input
              id="email"
              type="email"
              className={styles.input}
              {...register("email", {
                required: "E-mail é obrigatório",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Por favor, insira um e-mail válido",
                },
              })}
            />
            {errors.email && (
              <span className={styles.error}>{errors.email.message}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              Senha
            </label>
            <div className={styles.passwordWrapper}>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className={styles.input}
                {...register("password", {
                  required: "Senha é obrigatória",
                  minLength: {
                    value: 8,
                    message: "A senha deve ter pelo menos 8 caracteres",
                  },
                })}
              />
              <button
                type="button"
                className={styles.togglePassword}
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              >
                {showPassword ? (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <span className={styles.error}>{errors.password.message}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password2" className={styles.label}>
              Confirme sua Senha
            </label>
            <div className={styles.passwordWrapper}>
              <input
                id="password2"
                type={showPassword2 ? "text" : "password"}
                className={styles.input}
                {...register("password2", {
                  required: "Confirmação de senha é obrigatória",
                  validate: (value) =>
                    value === passwordValue || "As senhas não coincidem",
                })}
              />
              <button
                type="button"
                className={styles.togglePassword}
                onClick={() => setShowPassword2(!showPassword2)}
                aria-label={showPassword2 ? "Ocultar senha" : "Mostrar senha"}
              >
                {showPassword2 ? (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
            {errors.password2 && (
              <span className={styles.error}>{errors.password2.message}</span>
            )}
          </div>

          <button
            type="submit"
            className={styles.button}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Criando conta..." : "Cadastrar"}
          </button>
        </form>

        <div className={styles.footerLink}>
          <Link to="/login" className={styles.link}>
            Já tem uma conta? Faça login
          </Link>
        </div>
      </div>
    </div>
  );
};
