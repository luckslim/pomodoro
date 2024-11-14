import { Play } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeContainer, MinuteAmountInput, StartCountdownButton, TaskInput } from "./styles";

export function Home() {
    return (
        <HomeContainer>
            <form action="">
                <FormContainer>
                    <label htmlFor="task">vou trabalhar em </label>
                    <TaskInput id="task" list="task-suggestions"  placeholder="Dê um nome para seu projeto..." />
                    <datalist id="task-suggestions">
                        <option value="Projeto 1"></option>
                        <option value="Projeto 2"></option>
                        <option value="Projeto 3"></option>
                        <option value="Projeto 4"></option>
                        <option value="Banana"></option>
                    </datalist>
                    <label htmlFor="minutesAmount">durante</label>
                    <MinuteAmountInput type="number" id="minutesAmount" placeholder="00" step={5} min={5} max={60} />
                    <span>minutos.</span>
                </FormContainer>
                <CountdownContainer>
                    <span>0</span>
                    <span>0</span>
                    <span>:</span>
                    <span>0</span>
                    <span>0</span>
                </CountdownContainer>
                <StartCountdownButton disabled type="submit"><Play size={24}/> Começar</StartCountdownButton>
            </form>


        </HomeContainer>

    );
}