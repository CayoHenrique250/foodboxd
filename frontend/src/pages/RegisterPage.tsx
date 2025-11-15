import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styles from "./RegisterPage.module.css";

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

    try {
      const response = await fetch("http://127.0.0.1:8000/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const firstErrorKey = Object.keys(errorData)[0];
        const firstErrorMessage = errorData[firstErrorKey][0];

        setApiError(
          firstErrorMessage || "Falha ao cadastrar. Verifique os dados."
        );
        return;
      }

      navigate("/login");
    } catch (error) {
      console.error("Falha na requisição:", error);
      setApiError("Não foi possível conectar ao servidor. Tente novamente.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.logo}>FoodBoxd</h1>
        <h2 className={styles.subtitle}>Crie sua conta</h2>

        {apiError && <div className={styles.apiError}>{apiError}</div>}

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
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
            <input
              id="password"
              type="password"
              className={styles.input}
              {...register("password", {
                required: "Senha é obrigatória",
                minLength: {
                  value: 8,
                  message: "A senha deve ter pelo menos 8 caracteres",
                },
              })}
            />
            {errors.password && (
              <span className={styles.error}>{errors.password.message}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password2" className={styles.label}>
              Confirme sua Senha
            </label>
            <input
              id="password2"
              type="password"
              className={styles.input}
              {...register("password2", {
                required: "Confirmação de senha é obrigatória",
                validate: (value) =>
                  value === passwordValue || "As senhas não coincidem",
              })}
            />
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
