import { reactive, watch, onMounted } from "vue";

export type FormErrors<T> = {
  [key in keyof T]?: string;
};

export type FormState = {
  isSubmitting: boolean;
  isValid: boolean;
};

export interface Props<T> {
  defaultValues: T;
  onSubmit(values: T): void;
  validate(values: T): FormErrors<T>;
  validateOnType?: boolean;
}

export default function useForm<Values>({
  defaultValues,
  onSubmit,
  validate,
  validateOnType,
}: Props<Values>): {
  values: Values;
  errors: FormErrors<Values>;
  state: FormState;
  handleSubmit(e: HTMLFormElement): void;
} {
  const values = reactive<{ [x: string]: any }>(defaultValues) as Values;
  const errors: FormErrors<Values> = reactive<{ [x: string]: string }>({});
  const state = reactive<FormState>({
    isSubmitting: false,
    isValid: false,
  });

  onMounted(() => {
    const _errors = validate(values);
    if (!Object.keys(_errors).length) {
      state.isValid = true;
    } else {
      state.isValid = false;
    }
  });

  watch(
    () => ({ ...values }),
    (_values, previousValues) => {
      const _errors = validate(_values as Values);

      if (Object.keys(_errors).length) {
        state.isValid = false;
      } else {
        state.isValid = true;
      }

      if (validateOnType) {
        for (const key in _values) {
          const currentValue = _values[key];
          const oldValue = previousValues[key];

          const hasChanged = currentValue !== oldValue;
          if (hasChanged) {
            const _values: unknown = { [key]: currentValue };
            const _errors = validate(_values as Values);
            errors[key] = _errors[key];
          }
        }
      }
    },
    { deep: true }
  );

  function handleSubmit(e: HTMLFormElement) {
    e.preventDefault();
    state.isSubmitting = true;

    const _errors = validate(values);

    for (const error in errors) {
      delete errors[error];
    }

    if (Object.keys(_errors).length) {
      state.isValid = false;
      state.isSubmitting = false;

      for (const key in _errors) {
        errors[key] = _errors[key];
      }

      return;
    }

    state.isValid = true;
    onSubmit(values);
  }

  return {
    values,
    errors,
    state,
    handleSubmit,
  };
}
