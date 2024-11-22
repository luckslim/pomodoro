import { FormContainer, MinuteAmountInput, TaskInput } from "./styles";
import {useFormContext } from "react-hook-form";
import { useContext } from "react";
import { CyclesContext } from "../../../../contexts/CyclesContext";

export function NewCycleForm() {
    const {activeCycle}= useContext(CyclesContext);
    const {register} = useFormContext();

    return (
        <FormContainer>
            <label htmlFor="task">vou trabalhar em </label>
            <TaskInput
                id="task"
                list="task-suggestions"
                placeholder="Dê um nome para seu projeto..."
                {...register('task')}
                disabled={!!activeCycle}
            />
            <datalist id="task-suggestions">
                <option value="Projeto 1"></option>
                <option value="Projeto 2"></option>
                <option value="Projeto 3"></option>
                <option value="Projeto 4"></option>
                <option value="Banana"></option>
            </datalist>
            <label htmlFor="minutesAmount">durante</label>
            <MinuteAmountInput
                type="number"
                id="minutesAmount"
                placeholder="00"
                step={5} min={1} max={60}
                {...register('minutesAmount', { valueAsNumber: true })}
                disabled={!!activeCycle}
            />
            <span>minutos.</span>
        </FormContainer>
    );
}