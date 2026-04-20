import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import Select, { StylesConfig } from "react-select";
import { customStyles } from "../formats/formatTime";

type OptionType = {
  value: number | string;
  label: string;
};

type FormInputProps<T extends FieldValues, D = unknown> = {
  name: Path<T>;
  control: Control<T>;
  label: string;
  type?: string;
  placeholder?: string;
  data?: D[];
  valueKey?: keyof D;
  labelKey?: keyof D;
};

export function FormInput<T extends FieldValues, D = unknown>({
  name,
  control,
  label,
  type = "text",
  placeholder,
  data,
  valueKey,
  labelKey,
}: FormInputProps<T, D>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        let inputElement;

        switch (type) {
          case "number":
            inputElement = (
              <Input
                {...field}
                type="number"
                placeholder={placeholder}
                onChange={(e) => field.onChange(Number(e.target.value))}
                aria-invalid={fieldState.invalid}
              />
            );
            break;

          case "textarea":
            inputElement = (
              <Textarea
                {...field}
                placeholder={placeholder}
                className="w-full border rounded p-2"
                rows={3}
                aria-invalid={fieldState.invalid}
              />
            );
            break;

          case "select": {
            const options =
              data?.map((item) => ({
                value: item[valueKey as keyof typeof item] as string | number,
                label: String(item[labelKey as keyof typeof item]),
              })) ?? [];

            inputElement = (
              <Select
                options={options}
                placeholder={placeholder}
                value={options.find((o) => o.value === field.value) || null}
                onChange={(option) =>
                  field.onChange((option as OptionType)?.value)
                }
                isSearchable
                styles={customStyles}
              />
            );
            break;
          }

          case "multi-select": {
            const options =
              data?.map((item) => ({
                value: item[valueKey as keyof typeof item] as string | number,
                label: String(item[labelKey as keyof typeof item]),
              })) ?? [];

            const selectedValues = (field.value as (number | string)[]) ?? [];
            const selectedOptions = options.filter((o) =>
              selectedValues.includes(o.value),
            );

            inputElement = (
              <Select
                isMulti
                options={options}
                placeholder={placeholder}
                value={selectedOptions}
                onChange={(selected) => {
                  field.onChange(
                    (selected as OptionType[]).map((o) => o.value),
                  );
                }}
                isSearchable
                styles={customStyles as StylesConfig<OptionType, true>}
              />
            );
            break;
          }

          default:
            inputElement = (
              <Input
                {...field}
                type={type}
                placeholder={placeholder}
                aria-invalid={fieldState.invalid}
              />
            );
            break;
        }

        return (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>{label}</FieldLabel>
            {inputElement}
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
}
