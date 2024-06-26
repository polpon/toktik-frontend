import { reactive } from "vue";
import { io } from "socket.io-client";

export const state = reactive({
  connected: false,
  fooEvents: [],
  barEvents: []
});

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === "production" ? "ws://ws.localhost" : "ws://toktik-socket:3030";

export const socket = io(URL, {
  // secure: true,
  // withCredentials: true,
  transports: [ "websocket" ],
});

export const setSocket = (socketname) => {
    console.log("Now listening on: ", socketname);
    socket.on(socketname, (...args) => {
        console.log("recieved", args)
        return args;
    });
};

export const deleteSocket = (socketname) => {
    socket.off(socketname);
};

socket.on("connect", () => {
  state.connected = true;
  console.log("I am now connected")
});

socket.on("disconnect", () => {
  state.connected = false;
  console.log("I am now g o n")
});