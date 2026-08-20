import { settingsNamespace } from '@deepseek-ai/dsh-settings'
import z from '@deepseek-ai/schemastery'
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { dirname, extname, resolve, sep } from 'node:path'

export const SETTINGS_NAMESPACE = 'custom-css'
export const SCRIPT_ENDPOINT = '/api/custom-css/user.js'
export const ASSETS_ENDPOINT = '/api/custom-css/assets/'

const NS = settingsNamespace(SETTINGS_NAMESPACE)

function sideImageDefault(side) {
  if (side === 'right') {
    return {
      image: '',
      height: 'clamp(340px, 78vh, 940px)',
      bottom: 'clamp(-24px, -1.6vh, -8px)',
      opacity: '1'
    }
  }
  return {
    image: '',
    height: 'clamp(360px, 80vh, 960px)',
    bottom: 'clamp(-24px, -1.6vh, -8px)',
    opacity: '1'
  }
}

const SideImageSettingsSchema = z.object({
  image: z.string().default(''),
  height: z.string().default('clamp(360px, 80vh, 960px)'),
  bottom: z.string().default('clamp(-24px, -1.6vh, -8px)'),
  opacity: z.string().default('1')
})

export const CustomCssSettingsSchema = z.object({
  enabled: z.boolean().default(true),
  css: z.string().default(''),
  backgroundImage: z.string().default(''),
  backgroundSize: z.string().default('cover'),
  backgroundPosition: z.string().default('center'),
  backgroundRepeat: z.string().default('no-repeat'),
  backgroundOpacity: z.string().default('1'),
  backgroundMode: z.string().default('conversation'),
  sidebarBackgroundImage: z.string().default(''),
  sidebarBackgroundOpacity: z.string().default('1'),
  leftImage: SideImageSettingsSchema.default(sideImageDefault('left')),
  rightImage: SideImageSettingsSchema.default(sideImageDefault('right')),
  assetsPath: z.string().default(defaultAssetsPath()),
  jsEnabled: z.boolean().default(false),
  jsCode: z.string().default(''),
  rules: z.array(z.object({
    selector: z.string().default(''),
    css: z.string().default(''),
    note: z.string().default('')
  })).default([])
})

export function dshCustomCssHome() {
  return resolve(process.env.DSH_HOME || resolve(homedir(), '.dsh'), 'custom-css')
}

export function userScriptPath() {
  return resolve(dshCustomCssHome(), 'user.js')
}

export function defaultAssetsPath() {
  return resolve(dshCustomCssHome(), 'assets')
}

export function currentAssetsPath(scope) {
  try {
    const value = scope && scope.get ? scope.get().assetsPath : ''
    return value ? resolve(String(value)) : defaultAssetsPath()
  } catch {
    return defaultAssetsPath()
  }
}

export function defaultJsCode() {
  return [
    '// dsh-simple-background user script.',
    '// Generated from DSH Web -> Settings -> Custom CSS (JS code).',
    '// You may also edit this file directly; refresh the DSH Web page to reload it.',
    '//',
    '// Helpers:',
    '//   window.dshCustomCss.setCss(cssText)',
    '//   window.dshCustomCss.setRule(selector, { property: "value" })',
    '//   window.dshCustomCss.removeRule(selector)',
    '//   window.dshCustomCss.setBackground({ image: "url-or-gradient", size: "cover", position: "center", repeat: "no-repeat", opacity: "0.5", mode: "conversation" })  // mode: "conversation" | "page"',
    '//   window.dshCustomCss.setSidebarBackground({ image: "/api/custom-css/assets/sidebar.png", opacity: "0.5" })  // 对话界面模式下的左侧工作区背景',
    '//   window.dshCustomCss.setSideImages({ leftImage: { image: "/api/custom-css/assets/left.png", height: "80vh", bottom: "0px", opacity: "1" }, rightImage: { ... } })',
    '//   window.dshCustomCss.reload()',
    '//',
    '// Example:',
    '// window.dshCustomCss.setRule("#root", { fontFamily: "system-ui, sans-serif" })',
    ''
  ].join('\n')
}

function writeScriptFile(code) {
  const path = userScriptPath()
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, code == null ? '' : String(code), 'utf8')
}

function ensureScriptFile(code) {
  const path = userScriptPath()
  if (existsSync(path)) return
  writeScriptFile(code || defaultJsCode())
}

function send(res, status, body, contentType) {
  res.writeHead(status, {
    'Content-Type': contentType,
    'Cache-Control': 'no-store'
  })
  res.end(body)
}

const ASSET_MIME = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.bmp': 'image/bmp',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf'
}

function mimeFor(filePath) {
  const ext = extname(filePath).toLowerCase()
  return ASSET_MIME[ext] || 'application/octet-stream'
}

function serveAsset(req, res, filePath, scope) {
  const method = (req.method || 'GET').toUpperCase()
  if (method !== 'GET' && method !== 'HEAD') {
    return send(res, 405, 'method not allowed', 'text/plain; charset=utf-8')
  }
  if (filePath.indexOf('\0') !== -1) {
    return send(res, 400, 'bad request', 'text/plain; charset=utf-8')
  }
  const root = resolve(currentAssetsPath(scope))
  const target = resolve(root, ...filePath.split('/').filter(Boolean))
  if (target !== root && !target.startsWith(root + sep)) {
    return send(res, 403, 'forbidden', 'text/plain; charset=utf-8')
  }
  let stat
  try {
    stat = statSync(target)
  } catch {
    return send(res, 404, 'not found', 'text/plain; charset=utf-8')
  }
  if (!stat.isFile()) {
    return send(res, 404, 'not found', 'text/plain; charset=utf-8')
  }
  let data
  try {
    data = readFileSync(target)
  } catch {
    return send(res, 500, 'read error', 'text/plain; charset=utf-8')
  }
  if (method === 'HEAD') {
    res.writeHead(200, {
      'Content-Type': mimeFor(target),
      'Content-Length': data.length,
      'Cache-Control': 'no-store'
    })
    return res.end()
  }
  return send(res, 200, data, mimeFor(target))
}

export function apply(ctx) {
  let scope

  ctx.inject(['settings'], (settingsCtx) => {
    scope = settingsCtx.settings.register(NS, CustomCssSettingsSchema, { applies: 'live' })
    ensureScriptFile(scope.get().jsCode)
    try { mkdirSync(defaultAssetsPath(), { recursive: true }) } catch {}
    settingsCtx.effect(() => scope.watch((next) => {
      try {
        writeScriptFile(next.jsCode)
      } catch (error) {
        const message = error && error.message ? error.message : String(error)
        settingsCtx.logger?.warn?.('dsh-simple-background: failed to write user script: ' + message)
      }
    }), 'dsh-simple-background: write user script')
  })

  ctx.inject(['webServer'], (httpCtx) => {
    httpCtx.effect(() => httpCtx.webServer.register({
      kind: 'prefix',
      path: '/api/custom-css',
      handler(req, res) {
        const method = (req.method || 'GET').toUpperCase()
        const url = new URL(req.url || '/', 'http://localhost')
        const raw = url.pathname.slice('/api/custom-css'.length).replace(/^\//, '')
        let sub
        try {
          sub = decodeURIComponent(raw)
        } catch {
          return send(res, 400, 'bad request', 'text/plain; charset=utf-8')
        }
        if (method === 'GET' && (sub === 'user.js' || sub === 'script.js')) {
          let code = defaultJsCode()
          if (scope) code = scope.get().jsCode
          try {
            code = readFileSync(userScriptPath(), 'utf8')
          } catch {}
          return send(res, 200, code, 'text/javascript; charset=utf-8')
        }
        if (method === 'GET' && sub === '') {
          return send(res, 200, JSON.stringify({
            ok: true,
            namespace: SETTINGS_NAMESPACE,
            script: SCRIPT_ENDPOINT,
            assets: ASSETS_ENDPOINT,
            assetsDir: currentAssetsPath(scope)
          }), 'application/json; charset=utf-8')
        }
        if (sub === 'assets' || sub.startsWith('assets/')) {
          return serveAsset(req, res, sub === 'assets' ? '' : sub.slice('assets/'.length), scope)
        }
        return send(res, 405, 'method or path not allowed', 'text/plain; charset=utf-8')
      }
    }), 'dsh-simple-background: user script route')
  })
}
