// @ts-expect-error-start "voor de javascript noobjes"
import { bot as tadej } from "../bots/tadej"
import { bot as jonas } from "../bots/jonas"
import { bot as daan } from "../bots/daan"
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
  }
}