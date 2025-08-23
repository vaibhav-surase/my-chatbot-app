export type Message = {
  id: number;
  author: string;
  message: string;
  type: "user" | "bot" | "summary";
};
