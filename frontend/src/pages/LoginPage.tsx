import React, { useState} from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.css";
import { useAuthStore } from "../store/auth.store";

interface FormInputs {
  email: string;
  password: string;
}

export const LoginPage = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [apiError, setApiError] = useState<string | null>(null);

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
      const response = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.email,
          password: data.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();

        setApiError(errorData.detail || "E-mail ou senha inválidos.");
        return;
      }

      const { access } = await response.json();

      const userResponse = await fetch("http://127.0.0.1:8000/api/users/me/", {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });

      if (!userResponse.ok) {
        throw new Error("Falha ao buscar dados do usuário após o login.");
      }

      const userData = await userResponse.json();

      login(access, userData);

      navigate("/app/dashboard");
    } catch (error) {
      console.error("Falha na requisição:", error);
      setApiError("Não foi possível conectar ao servidor. Tente novamente.");
    }
  };

  if (token) {
    return <div>Redirecionando...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.logo}>FoodBoxd</h1>
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
            <input
              id="password"
              type="password"
              className={styles.input}
              {...register("password", {
                required: "Senha é obrigatória",
                minLength: {
                  value: 6,
                  message: "A senha deve ter pelo menos 6 caracteres",
                },
              })}
            />
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
