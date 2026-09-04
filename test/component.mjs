import test from 'node:test'
import assert from 'node:assert/strict'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { DeskCrewWidget } from '../index.js'

test('renders one defer script with the widget attributes', () => {
  const html = renderToStaticMarkup(
    createElement(DeskCrewWidget, { widgetKey: 'pub_abc12345', board: 'acme' }),
  )
  assert.match(html, /^<script /)
  assert.match(html, /src="https:\/\/deskcrew\.io\/desk\.js"/)
  assert.match(html, /data-key="pub_abc12345"/)
  assert.match(html, /data-board="acme"/)
  assert.match(html, /\bdefer\b/)
})

test('escapes a hostile greeting', () => {
  const html = renderToStaticMarkup(
    createElement(DeskCrewWidget, { widgetKey: 'pub_abc12345', greeting: '"><img src=x>' }),
  )
  assert.doesNotMatch(html, /<img/)
})

test('invalid key renders nothing', () => {
  assert.equal(renderToStaticMarkup(createElement(DeskCrewWidget, { widgetKey: 'bad' })), '')
})
