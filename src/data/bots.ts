// @ts-expect-error "javascript noob"
import tadej from "../bots/tadej"
// @ts-expect-error "javascript noob"
import mark from "../bots/mark"
import jonas from "../bots/jonas"
import daan from "../bots/daan"

import type { Bot } from "../models/auction.models"

export const BOTS: { [key: string]: Bot } = {
  'jonas': {
    key: 'jonas',
    owner: 'Jonas',
    name: 'Hatsiekadee',
    type: 'script',
    code: tadej
  },
  'tadej': {
    key: 'tadej',
    owner: 'Tadej',
    name: 'Hotseflots',
    type: 'script',
    code: jonas
  },
  'daan': {
    key: 'daan',
    owner: 'Daan',
    name: 'De ultieme veiler',
    type: 'script',
    code: daan
  },
  'mark': {
    key: 'mark',
    owner: 'Mark',
    name: 'Lekker Fietsen',
    type: 'script',
    code: mark
  },
  'niels': {
    key: 'niels',
    owner: 'Niels',
    name: 'De gezelligstebiedbot',
    type: 'server',
    endpoint: 'https://wielrenbots.beljaartmc.nl/bid'
  }
}