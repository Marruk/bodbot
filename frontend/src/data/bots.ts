/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-expect-error "javascript noob"
import tadej from "../bots/tadej";
import mark from "../bots/mark.ts";
import jonas from "../bots/jonas";
import joran from "../bots/joran";
import wout from "../bots/wout";

import type { Bot } from "../models/auction.models";

export const BOTS: { [key: string]: Bot } = {
  jonas: {
    key: "jonas",
    owner: "Jonas",
    name: "Hatsiekadee",
    code: jonas,
  },
  tadej: {
    key: "tadej",
    owner: "Tadej",
    name: "Hotseflots",
    code: tadej,
  },
  wout: {
    key: "wout",
    owner: "Wout",
    name: "Gezellig",
    code: wout,
  },
  mark: {
    key: "mark",
    owner: "Mark",
    name: "Lekker Fietsen",
    code: mark,
  },
  joran: {
    key: "joran",
    owner: "Joran",
    name: "Lekker veilen",
    code: joran,
  },
};
