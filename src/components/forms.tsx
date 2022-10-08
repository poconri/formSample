import { Box, Input, NumberInput, NumberInputField } from "@chakra-ui/react";
import React, { useReducer } from "react";

export interface State {
  load: string;
  pickUp: string;
  dropOff: string;
  distance: number;
  weight: number;
  length: number;
  width: number;
  height: number;
  trailer: string;
  DepositPerState: number;
  trailerPortion: string;
  pickUpDays: number;
}

enum ActionKind {
  update = "UPDATE",
  clean = "CLEAN",
}

type Action = {
  type: ActionKind;
  payload: number | String;
  key?: string;
};

type TupleEntry<
  T extends readonly unknown[],
  I extends unknown[] = [],
  R = never
> = T extends readonly [infer Head, ...infer Tail]
  ? TupleEntry<Tail, [...I, unknown], R | [`${I["length"]}`, Head]>
  : R;

type ObjectEntry<T extends {}> = T extends object
  ? { [K in keyof T]: [K, Required<T>[K]] }[keyof T] extends infer E
    ? E extends [infer K, infer V]
      ? K extends string | number
        ? [`${K}`, V]
        : never
      : never
    : never
  : never;

export type Entry<T extends {}> = T extends readonly [unknown, ...unknown[]]
  ? TupleEntry<T>
  : T extends ReadonlyArray<infer U>
  ? [`${number}`, U]
  : ObjectEntry<T>;

export function typedEntries<T extends {}>(object: T): ReadonlyArray<Entry<T>> {
  return Object.entries(object) as unknown as ReadonlyArray<Entry<T>>;
}

export function Forms() {
  const initialState: State = {
    load: "",
    pickUp: "",
    dropOff: "",
    distance: 0,
    weight: 0,
    length: 0,
    width: 0,
    height: 0,
    trailer: "",
    DepositPerState: 0,
    trailerPortion: "",
    pickUpDays: 0,
  };

  const reducerObject = (
    state: State,
    payload?: String | number,
    key?: string
  ): { [key in ActionKind]: State } => ({
    UPDATE: {
      ...state,
      [key || ""]: payload,
    },
    CLEAN: {
      ...initialState,
    },
  });

  const reducer = (state: State, action: Action) => {
    return reducerObject(state)[action.type]
      ? reducerObject(state, action.payload, action.key)[action.type]
      : state;
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const stateKeys = Object.keys(state) as Array<keyof typeof state>;
  return (
    <Box>
      {stateKeys.map((key) => {
        if (typeof state[key] === "number") {
          return (
            <Box display={"flex"} paddingBottom={"10px"}>
              <Box w={"150px"} textAlign={"right"} paddingRight={"20px"}>
                {key}
              </Box>
              <NumberInput
                step={0.2}
                key={key}
                w={"100px"}
                errorBorderColor={"bloodRed"}
                focusBorderColor={"burntOrange"}
                onChange={(value) =>
                  dispatch({
                    type: ActionKind.update,
                    payload: +value,
                    key: key,
                  })
                }
              >
                <NumberInputField />
              </NumberInput>
            </Box>
          );
        } else {
          return (
            <Box display={"flex"} paddingBottom={"10px"}>
              <Box w={"150px"} textAlign={"right"} paddingRight={"20px"}>
                {key}
              </Box>
              <Input
                defaultValue={state[key]}
                key={key}
                w={"100px"}
                focusBorderColor={"burntOrange"}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: ActionKind.update,
                    payload: event.target.value,
                    key: key,
                  })
                }
              ></Input>
            </Box>
          );
        }
      })}
      <Box
        position={"absolute"}
        top={"20%"}
        right={10}
        fontSize={24}
        w={"150px"}
      >
        {`Total $${state.distance}`}
      </Box>
    </Box>
  );
}
