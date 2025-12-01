import React, { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.css";
import { useAuthStore } from "../store/auth.store";
import { apiUrl } from "../config/api";

interface FormInputs {
  email: string;
  password: string;
}

export const LoginPage = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [apiError, setApiError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const { token } = useAuthStore();

  React.useEffect(() => {
    if (token) {
      navigate("/app/dashboard", { replace: true });
    }
  }, [token, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setApiError(null);

    try {
      const response = await fetch(apiUrl("login/"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: data.email,
          password: data.password,
        }),
      });

      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          setApiError(errorData.detail || "E-mail ou senha inválidos.");
        } else {
          const errorText = await response.text();
          console.error("Resposta não-JSON do servidor:", errorText.substring(0, 200));
          setApiError(
            `Erro do servidor (${response.status}). Verifique se o backend está configurado corretamente.`
          );
        }
        return;
      }

      const { access } = await response.json();

      const userResponse = await fetch(apiUrl("users/me/"), {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });

      if (!userResponse.ok) {
        const contentType = userResponse.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const errorData = await userResponse.json();
          throw new Error(errorData.detail || "Falha ao buscar dados do usuário após o login.");
        } else {
          throw new Error(`Erro do servidor (${userResponse.status}). Verifique se o backend está configurado corretamente.`);
        }
      }

      const userData = await userResponse.json();

      login(access, userData);

      navigate("/app/dashboard");
    } catch (error) {
      console.error("Falha na requisição:", error);
      const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
      console.error("Detalhes do erro:", errorMessage);
      console.error("URL tentada:", apiUrl("login/"));
      setApiError(
        `Não foi possível conectar ao servidor. Verifique se o backend está rodando e acessível. Erro: ${errorMessage}`
      );
    }
  };

  if (token) {
    return <div>Redirecionando...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img
          className={styles.logo}
          src="/logo-backGray-horizontal.png?url"
          alt=""
        />
        <h2 className={styles.subtitle}>Entre na sua conta</h2>

        {apiError && <div className={styles.apiError}>{apiError}</div>}

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
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
                    value: 6,
                    message: "A senha deve ter pelo menos 6 caracteres",
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

          <button
            type="submit"
            className={styles.button}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <div className={styles.footerLink}>
          <Link to="/cadastro" className={styles.link}>
            Não tem uma conta? Cadastre-se
          </Link>
        </div>
      </div>
    </div>
  );
};
