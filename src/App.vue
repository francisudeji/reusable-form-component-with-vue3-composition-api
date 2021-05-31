<template>
  <h1>Sign up</h1>
  <form @submit="form.handleSubmit">
    <div>
      <label for="firstname" style="display: block">First Name</label>
      <input
        type="text"
        id="firstname"
        v-model="form.values.firstname"
        placeholder="First name"
        style="padding: 10px"
      />
      <p style="color: red; font-size: 16px">{{ form.errors.firstname }}</p>
    </div>
    <div>
      <label for="lastname" style="display: block">Last Name</label>
      <input
        type="text"
        id="lastname"
        v-model="form.values.lastname"
        placeholder="Last name"
        style="padding: 10px"
      />
      <p style="color: red; font-size: 16px">{{ form.errors.lastname }}</p>
    </div>

    <div>
      <label for="email" style="display: block">Email Address</label>
      <input
        type="email"
        id="email"
        v-model="form.values.email"
        placeholder="Email address"
        style="padding: 10px"
      />
      <p style="color: red; font-size: 16px">{{ form.errors.email }}</p>
    </div>

    <div>
      <label for="password" style="display: block">Password</label>
      <input
        type="password"
        id="password"
        v-model="form.values.password"
        placeholder="Password"
        style="padding: 10px"
      />
      <p style="color: red; font-size: 16px">{{ form.errors.password }}</p>
    </div>

    <div>
      <div style="">
        <label for="tos" style="display: flex; align-items: center">
          <input
            type="checkbox"
            id="tos"
            v-model="form.values.tos"
            :checked="form.values.tos"
            style="padding: 10px"
          />
          <span
            >By signing up, you agree to the
            <a href="#">Terms of service</a></span
          >
        </label>
      </div>
      <p style="color: red; font-size: 16px">{{ form.errors.tos }}</p>
    </div>

    <button type="submit" style="padding: 10px">Sign Up</button>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useForm, { FormErrors } from "@/composables/use-form";

export interface FormValues {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  tos: boolean;
}

export default defineComponent({
  name: "App",
  setup() {
    const defaultValues: FormValues = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      tos: false,
    };

    const form = useForm<FormValues>({
      defaultValues,
      onSubmit(values) {
        console.log(values);
        console.log(form.state);
      },
      validate(values) {
        const errors: FormErrors<FormValues> = {};

        if (!values.firstname) {
          errors.firstname = "First name is required";
        }

        if (!values.lastname) {
          errors.lastname = "Last name is required";
        }

        if (!values.email) {
          errors.email = "Email is required";
        }

        const regex = /\S+@\S+\.\S+/;

        if (!regex.test(values.email)) {
          errors.email = "Invalid email address";
        }

        if (!values.password) {
          errors.password = "Email is required";
        }

        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

        if (!passwordRegex.test(values.password)) {
          errors.password = "Password must contain letters and numbers";
        }

        if (!values.tos) {
          errors.tos = "You must agree to the terms of service";
        }

        return errors;
      },
      validateOnType: true,
    });

    return { form };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 60px auto 0 auto;
  width: 70%;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
