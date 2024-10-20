import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormFields = {
  email: string;
  password: string;
};

const Form = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    mode: "onChange",
    defaultValues: {
      email: "test@email.com",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await new Promise((res) => setTimeout(res, 2000));

      console.log(data);
    } catch (err) {
      setError("email", { message: "This email is already taken" });
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="email" {...register("email")} />
      {errors.email && <span>{errors.email.message}</span>}
      <br />
      <input type="password" {...register("password")} />
      {errors.password && <span>{errors.password.message}</span>}
      <br />
      <button type="submit">{isSubmitting ? "Loading..." : "Submit"}</button>
    </form>
  );
};

export default Form;
