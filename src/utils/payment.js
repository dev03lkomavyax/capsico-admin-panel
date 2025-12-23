import { axiosInstance } from "./axiosInstance";



export const createOrder = (data) => axiosInstance.post("/payment/make-payment", data);

export const verifyPayment = (data) =>
  axiosInstance.post("/payment/verify-payment", data);
