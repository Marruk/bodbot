// @ts-expect-error "javascript noob"
import tadej from "../bots/tadej"
import mark from "../bots/mark.ts"
import niels from "../bots/niels"
import jonas from "../bots/jonas"
import daan from "../bots/daan"

import type { Bot } from "../models/auction.models"

export const BOTS: { [key: string]: Bot } = {
  'jonas': {
    key: 'jonas',
    owner: 'Jonas',
    name: 'Hatsiekadee',
    code: tadej
  },
  'tadej': {
    key: 'tadej',
    owner: 'Tadej',
    name: 'Hotseflots',
    code: jonas
  },
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
  'niels': {
    key: 'niels',
    owner: 'Niels',
    name: 'De gezelligstebiedbot',
    code: niels
  }
}