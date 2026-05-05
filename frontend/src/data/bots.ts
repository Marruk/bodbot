/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-expect-error "javascript noob"
import tadej from "../bots/tadej"
import mark from "../bots/mark.ts"
// import niels from "../bots/niels"
import jonas from "../bots/jonas"
import eddyMerckx from "../bots/eddyMerckx.ts";
// import daan from "../bots/daan"
import lucas from "../bots/lucas"
// import hannah from "../bots/hannah/hannah.ts"
// import joran from "../bots/joran"
import wout from "../bots/wout"

import type { Bot } from "../models/auction.models"

export const BOTS: { [key: string]: Bot } = {
  'jonas': {
    key: 'jonas',
    owner: 'Jonas',
    name: 'Hatsiekadee',
    code: jonas
  },
  'tadej': {
    key: 'tadej',
    owner: 'Tadej',
    name: 'Hotseflots',
    code: tadej
  },
  'wout': {
    key: 'wout',
    owner: 'Wout',
    name: 'Gezellig',
    code: wout
  },
  'mark': {
    key: 'mark',
    owner: 'Mark',
    name: 'Lekker Fietsen',
    code: mark
  },
  daan: {
    key: "daan",
    owner: "Daan",
    name: "De ultieme veiler",
    code: eddyMerckx,
  },
  // 'niels': {
  //   key: 'niels',
  //   owner: 'Niels',
  //   name: 'De gezelligstebiedbot',
  //   code: niels
  // },
  'lucas': {
    key: 'lucas',
    owner: 'Lucas',
    name: 'Lucadance 100rpm',
    code: lucas
  },
  // 'hannah': {
  //   key: 'hannah',
  //   owner: 'Hannah',
  //   name: 'Hoi',
  //   code: hannah
  // },
  // 'joran': {
  //   key: 'joran',
  //   owner: 'Joran',
  //   name: 'Hallo',
  //   code: joran
  // },
}
