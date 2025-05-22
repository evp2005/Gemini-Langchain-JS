// Este código es para usar el modelo Gemini con LangChain
// Requiere el paquete @langchain/google-vertexai
// y el paquete dotenv para cargar variables de entorno

import "dotenv/config";
import { ChatVertexAI } from "@langchain/google-vertexai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

// Cargar variables de entorno del archivo .env
process.env.GOOGLE_APPLICATION_CREDENTIALS;

// Configurar el modelo con los parámetros deseados
const model = new ChatVertexAI({
  model: "gemini-2.0-flash",
  temperature: 0,
});

// Configurar el prompt de sistema y el prompt de usuario
const promptSystem = "You are a virtual assistant which analyzes the images sent by the user.";

// Definir el documento a analizar
const Document = {
  type: "image_url",
  image_url: { url: "https://images.theconversation.com/files/625049/original/file-20241010-15-95v3ha.jpg?ixlib=rb-4.1.0&rect=12%2C96%2C2671%2C1335&q=45&auto=format&w=1356&h=668&fit=crop" },
};

// Definir el prompt de usuario
const userPrompt = "What do you see in the image?";

// Crear el array de mensajes con los mensajes de sistema y de usuario
// El mensaje de usuario incluye el documento a analizar
const messages = [
  new SystemMessage(promptSystem),
  new HumanMessage({ content: [Document, { type: "text", text: userPrompt }] }),
];

// Invocar el modelo con los mensajes
const response = await model.invoke(messages);

// Registrar el contenido de la respuesta
console.log(response.content);

// Descomente las siguientes líneas para utilizar el mode streaming(respuesta en tiempo real)
// const stream = await model.stream(messages);
// const chunks = [];
// for await (const chunk of stream) {
//   chunks.push(chunk);
//   console.log(`${chunk.content}`);
// }
