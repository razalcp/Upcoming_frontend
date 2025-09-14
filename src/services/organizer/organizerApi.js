import { organizerApi } from "../../utils/axios/axios";

const register = async (values) => {
  try {

    return await organizerApi.post('/register', values);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const login = async (values) => {
  try {
    return await organizerApi.post("/login", values);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getEvents = async () => {
  const { data } = await organizerApi.get("/events");
  return data;
}

const createEvent = async (input) => {
  const payload = { ...input, organizerId: "000000000000000000000001" };
  const { data } = await organizerApi.post("/events", payload);
  return data;
}

const getAttendees = async () => {
  const { data } = await organizerApi.get("/attendees");
  return data;
};
const listTicketsForEvent = async (eventId) => {
  const { data } = await organizerApi.get(`/tickets/event/${eventId}`);
  return data;
};
const validateTicket = async (qrCode) => {
  const { data } = await organizerApi.post("/tickets/validate", { qrCode });
  return data;
}

const issueTicket = async (input) => {
  const { data } = await organizerApi.post("/tickets/issue", input);
  return data;
};



const createAttendee = async (input) => {
  const { data } = await organizerApi.post("/attendees", input);
  return data;
}


export { register, login, getEvents, createEvent, getAttendees, listTicketsForEvent, validateTicket, issueTicket, createAttendee }