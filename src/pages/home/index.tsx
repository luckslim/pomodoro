import { HandPalm, Play } from "phosphor-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from 'zod'
import {useContext } from "react";
// import { differenceInSeconds } from 'date-fns'
import {
    HomeContainer,
    StartCountdownButton,
    StopCountDownButton,
} from "./styles";
import { Countdown } from "./components/Countdown";
import { FormProvider } from "react-hook-form";
import { NewCycleForm } from "./components/NewCycleForm";
import { CyclesContext } from "../../contexts/CyclesContext";


const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod
        .number()
        .min(1, 'o ciclo precisa ser no minimo 5 minutos')
        .max(60, 'o ciclo precisa ser no maximo 60 minutos'),
})
type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>


export function Home() {
    const { activeCycle, createNewCycle, interruptCurrentCycle } = useContext(CyclesContext)

    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    });
    const { handleSubmit, watch, reset } = newCycleForm;
    function handleCreateNewCycle(data:NewCycleFormData){
        createNewCycle(data);
        reset();
    }
    const task = watch('task')
    const isSubmitDisabled = !task
    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">

                <FormProvider {...newCycleForm}>
                    <NewCycleForm />
                </FormProvider>
                <Countdown />
                {activeCycle ? (
                    <StopCountDownButton onClick={interruptCurrentCycle} type="button"> <HandPalm size={24} />Interromper</StopCountDownButton>

                ) : (
                    <StartCountdownButton disabled={isSubmitDisabled} type="submit"> <Play size={24} />Começar</StartCountdownButton>
                )}
            </form>
        </HomeContainer>

    );
}