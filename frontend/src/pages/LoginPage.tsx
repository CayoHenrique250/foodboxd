import { useForm, type SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';
import styles from './LoginPage.module.css';

interface FormInputs {
  email: string;
  password: string;
}

export const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Dados do formulário:', data);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.logo}>FoodBoxd</h1>
        <h2 className={styles.subtitle}>Entre na sua conta</h2>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>
              E-mail
            </label>
            <input
              id="email"
              type="email"
              className={styles.input}
              {...register('email', {
                required: 'E-mail é obrigatório',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Por favor, insira um e-mail válido',
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
              {...register('password', {
                required: 'Senha é obrigatória',
                minLength: {
                  value: 6,
                  message: 'A senha deve ter pelo menos 6 caracteres',
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
            {isSubmitting ? 'Entrando...' : 'Entrar'}
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