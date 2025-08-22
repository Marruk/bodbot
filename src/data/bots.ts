// @ts-expect-error "javascript noob"
import tadej from "../bots/tadej"
import mark from "../bots/mark.ts"
import niels from "../bots/niels"
import jonas from "../bots/jonas"
import daan from "../bots/daan"
import lucas from "../bots/lucas"
import hannah from "../bots/hannah"
import joran from "../bots/joran"

import type { Bot } from "../models/auction.models"

export const BOTS: { [key: string]: Bot } = {
  // 'jonas': {
  //   key: 'jonas',
  //   owner: 'Jonas',
  //   name: 'Hatsiekadee',
  //   code: jonas
  // },
  // 'tadej': {
  //   key: 'tadej',
  //   owner: 'Tadej',
  //   name: 'Hotseflots',
  //   code: tadej
  // },
  'daan': {
    key: 'daan',
    owner: 'Daan',
    name: 'De ultieme veiler',
    code: daan
  },
  'mark': {
    key: 'mark',
    owner: 'Mark',
    name: 'Lekker Fietsen',
    code: mark
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
  'hannah': {
    key: 'hannah',
    owner: 'Hannah',
    name: 'Hoi',
    code: hannah
  },
  'joran': {
    key: 'joran',
    owner: 'Joran',
    name: 'Hallo',
    code: joran
  }
}