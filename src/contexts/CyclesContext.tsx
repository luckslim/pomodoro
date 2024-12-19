import { createContext, ReactNode, useEffect, useReducer, useState } from "react";
import {  Cycle, cyclesReducers } from "../reducers/cycles/reducer";
import { ActionTypes, addNewCycleAction, interruptCurrentCycleAction, markCurrentCycleAsFinishedAction } from "../reducers/cycles/actions";


interface CreateCycleData{
    task:string;
    minutesAmount:number;
}
interface CyclesContextType {
    cycles: Cycle[]
    activeCycle: Cycle | undefined
    activeCycleId: string | null
    amountSecondsPassed: number
    markCurrentCycleAsFinished: () => void
    setSecondsPassed: (seconds: number) => void
    createNewCycle: (data:CreateCycleData) => void 
    interruptCurrentCycle:() => void
}
interface  CyclesContextProviderProps{
    children:ReactNode
}



export const CyclesContext = createContext({} as CyclesContextType)
export function CyclesContextProvider({ children, }:CyclesContextProviderProps) {
    const [CyclesState, dispatch] = useReducer(cyclesReducers, 
    {
        cycles:[],
        activeCycleId: null,
    }, ()=>{
        const storedStateAsJSON = localStorage.getItem('@ignite-timer:cycles-state')
        if(storedStateAsJSON){
            return JSON.parse(storedStateAsJSON)
        }
    })

    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

    useEffect(()=>{
        const stateJSON = JSON.stringify(CyclesState)
        localStorage.setItem('@ignite-timer:cycles-state',stateJSON)
    },[CyclesState])

    const {cycles, activeCycleId}= CyclesState;


    const activeCycle = cycles.find((cycle) => cycle.id == activeCycleId);

    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds)
    }

    function markCurrentCycleAsFinished() {

        dispatch(markCurrentCycleAsFinishedAction())

    }
    function createNewCycle(data: CreateCycleData) {
        const newCycle: Cycle = {
            id: String(new Date().getTime()),
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date()
        }
        dispatch(addNewCycleAction(newCycle))
        // setCycles((state) => [...state, newCycle]);
       
        setAmountSecondsPassed(0)
    }
    function interruptCurrentCycle() {
        // setCycles(
        //     cycles.map((cycle) => {
        //         if (cycle.id == activeCycleId) {
        //             return { ...cycle, interruptedDate: new Date() }
        //         } else {
        //             return cycle
        //         }
        //     }),
        // )
        dispatch(interruptCurrentCycleAction())
        

    }
    return (
        <CyclesContext.Provider value={{
            cycles,
            activeCycle,
            activeCycleId,
            markCurrentCycleAsFinished,
            amountSecondsPassed,
            setSecondsPassed,
            createNewCycle,
            interruptCurrentCycle,
        }}>
            {children}
        </CyclesContext.Provider>
    );
}