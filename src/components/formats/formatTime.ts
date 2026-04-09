import { StylesConfig } from "react-select";

export function formatDate(dateStr: string | null | undefined) {
    if (!dateStr) return "—";
    return new Intl.DateTimeFormat("es-BO", {
        dateStyle: "short",
        timeStyle: "short",
    }).format(new Date(dateStr));
}

type OptionType = {
    value: number | string;
    label: string;
};


export const customStyles: StylesConfig<OptionType, boolean> = {
    control: (provided) => ({
        ...provided,
        backgroundColor: "#ffffff",
        color: "#000000",
    }),
    menu: (provided) => ({
        ...provided,
        backgroundColor: "#ffffff",
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected
            ? "#02040a"
            : state.isFocused
                ? "#87e064"
                : "#ffffff",
        color: state.isSelected ? "#ffffff" : "#000000",
    }),
};

type OptionTypeNumber = {
    value: number;
    label: string;
};


export const customStylesSelect: StylesConfig<OptionTypeNumber, false> = {
    control: (provided) => ({
        ...provided,
        backgroundColor: "#ffffff",
        color: "#000000",
    }),
    menu: (provided) => ({
        ...provided,
        backgroundColor: "#ffffff",
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected
            ? "#02040a"
            : state.isFocused
                ? "#87e064"
                : "#ffffff",
        color: state.isSelected ? "#ffffff" : "#000000",
    }),
};