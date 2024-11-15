import { Play } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeContainer, MinuteAmountInput, Separator, StartCountdownButton, TaskInput } from "./styles";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from 'zod'
const newCycleFormValidationSchema= zod.object({
    task: zod.string().min(1,'Informe a tarefa'),
    minutesAmount: zod.number()
    .min(5, 'o ciclo precisa ser no minimo 5 minutos')
    .max(60, 'o ciclo precisa ser no maximo 60 minutos'),
})
export function Home() {
    const { register, handleSubmit, watch, formState }= useForm({
        resolver:zodResolver(newCycleFormValidationSchema),
    });
    function handleCreateNewCycle(data:any){
        console.log(data);
        
    }
    
    const task = watch('task')
    const isSubmitDisabled= !task
    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
                <FormContainer>
                    <label htmlFor="task">vou trabalhar em </label>
                    <TaskInput 
                    id="task" 
                    list="task-suggestions"  
                    placeholder="Dê um nome para seu projeto..."
                    {...register('task')}
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
                    step={5} /*min={5} /*max={60}*/ 
                    {...register('minutesAmount', {valueAsNumber:true})}
                    />
                    <span>minutos.</span>
                </FormContainer>
                <CountdownContainer>
                    <span>0</span>
                    <span>0</span>
                    <Separator>:</Separator>
                    <span>0</span>
                    <span>0</span>
                </CountdownContainer>
                <StartCountdownButton disabled={isSubmitDisabled} type="submit"> <Play size={24}/> Começar</StartCountdownButton>
            </form>


        </HomeContainer>

    );
}