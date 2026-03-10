import { InterfacePerguntas } from "./interface-perguntas";

export interface Resposta {
  response_code: number,
  results: InterfacePerguntas[]
}
