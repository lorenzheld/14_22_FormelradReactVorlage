import {useState} from "react";
import '../css/mvp.css';
import formelrad from "../image/formelradelektronik.gif";
import InputField from "../formular/InputField";

export default function Formelrad() {
    const [values, setValues] = useState({
        u: 10,
        i: 2,
        r: "",
        p: "",
        message: ""
    });

    const [colors, setColors] = useState({
        u: "black",
        i: "black",
        r: "black",
        p: "black",
        message: "red"
    });

    function resetColors() {
        setColors(c => ({ ...c, u: "black", i: "black", r: "black", p: "black" }));
    }

    const handleClear = event => {
        event.preventDefault();
        setValues({ u: "", i: "", r: "", p: "", message: "" });
        resetColors();
    };

    const handleSubmit = event => {
        event.preventDefault();
        resetColors();

        if (values.u === "" && values.i === "") {
            setValues(v => ({ ...v, u: Math.sqrt(v.p * v.r) }));
            setValues(v => ({ ...v, i: Math.sqrt(v.p / v.r) }));
            setColors(c => ({ ...c, u: "red", i: "red" }));
            setValues(v => ({ ...v, message: "Spannung und Stromstärke berechnet" }));
        } else if (values.u === "" && values.r === "") {
            setValues(v => ({ ...v, u: v.p / v.i }));
            setValues(v => ({ ...v, r: v.p / (v.i * v.i) }));
            setColors(c => ({ ...c, u: "red", r: "red" }));
            setValues(v => ({ ...v, message: "Spannung und Widerstand berechnet" }));
        } else if (values.u === "" && values.p === "") {
            setValues(v => ({ ...v, u: v.i * v.r }));
            setValues(v => ({ ...v, p: v.i * v.i * v.r }));
            setColors(c => ({ ...c, u: "red", p: "red" }));
            setValues(v => ({ ...v, message: "Spannung und Leistung berechnet" }));
        } else if (values.i === "" && values.r === "") {
            setValues(v => ({ ...v, i: v.p / v.u }));
            setValues(v => ({ ...v, r: (v.u * v.u) / v.p }));
            setColors(c => ({ ...c, i: "red", r: "red" }));
            setValues(v => ({ ...v, message: "Stromstärke und Widerstand berechnet" }));
        } else if (values.i === "" && values.p === "") {
            setValues(v => ({ ...v, i: v.u / v.r }));
            setValues(v => ({ ...v, p: (v.u * v.u) / v.r }));
            setColors(c => ({ ...c, i: "red", p: "red" }));
            setValues(v => ({ ...v, message: "Stromstärke und Leistung berechnet" }));
        } else {
            setValues(v => ({ ...v, r: v.u / v.i }));
            setValues(v => ({ ...v, p: v.u * v.i }));
            setColors(c => ({ ...c, r: "red", p: "red" }));
            setValues(v => ({ ...v, message: "Widerstand und Leistung berechnet" }));
        }
    };

    return (
        <>
            <section>
                <header>
                    <h2>Formelrad</h2>
                    <img src={formelrad} width="200" alt="Formelrad" />
                    <p>Zwei Werte eingeben, die anderen werden berechnet.</p>
                </header>
                <form onSubmit={handleSubmit}>
                    <InputField
                        color={colors.u}
                        value={values.u}
                        label="Spannung"
                        handleChange={e => setValues(v => ({ ...v, u: e.target.value }))}
                    />
                    <InputField
                        color={colors.i}
                        value={values.i}
                        label="Stromstärke"
                        handleChange={e => setValues(v => ({ ...v, i: e.target.value }))}
                    />
                    <InputField
                        color={colors.r}
                        value={values.r}
                        label="Widerstand"
                        handleChange={e => setValues(v => ({ ...v, r: e.target.value }))}
                    />
                    <InputField
                        color={colors.p}
                        value={values.p}
                        label="Leistung"
                        handleChange={e => setValues(v => ({ ...v, p: e.target.value }))}
                    />
                    <button type="submit">Calculate</button>
                    <button style={{ margin: 10 }} onClick={handleClear}>Clear</button>
                    <p style={{ color: colors.message }}>{values.message}</p>
                </form>
            </section>
        </>
    );
}
