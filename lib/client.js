window.__ModuleLoader__.load({
  id: 'dsh-simple-background',
  factory: (require) => {
    var module = { exports: {} }
    var exports = module.exports
    Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' })
    var React = require('react')

    var SETTINGS_NAMESPACE = 'custom-css'
    var LOCALE_NS = 'settings.custom-css'
    var SCRIPT_ENDPOINT = '/api/custom-css/user.js'
    var ASSETS_ENDPOINT = '/api/custom-css/assets/'
    var RAW_STYLE_ID = 'dsh-simple-background-raw'
    var BG_STYLE_ID = 'dsh-simple-background-bg'
    var API_STYLE_ID = 'dsh-simple-background-api'
    var UI_STYLE_ID = 'dsh-simple-background-ui'
    var THEME_STYLE_ID = 'dsh-simple-background-theme'
    var LAYOUT_STYLE_ID = 'dsh-simple-background-layout'
    var SIDE_STAGE_ID = 'dsh-simple-background-side-stage'
    var SIDE_STYLE_ID = 'dsh-simple-background-side-style'
    var BG_LAYER_ID = 'dsh-simple-background-bg-layer'
    var SIDEBAR_BG_STYLE_ID = 'dsh-simple-background-sidebar-bg'
    var SCRIPT_TAG_ID = 'dsh-simple-background-user-script'

    var SIDEBAR_COLUMN_SELECTOR = ':is([data-pane="sidebar"], [class*="sidebarCol"])'
    var DETAILS_COLUMN_SELECTOR = ':is([data-pane="details"], [class*="detailsCol"])'

    var DEFAULT_SETTINGS = {
      enabled: true,
      css: '',
      backgroundImage: '',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundOpacity: '1',
      backgroundMode: 'conversation',
      sidebarBackgroundImage: '',
      sidebarBackgroundOpacity: '1',
      leftImage: {
        image: '',
        height: 'clamp(360px, 80vh, 960px)',
        bottom: 'clamp(-24px, -1.6vh, -8px)',
        opacity: '1'
      },
      rightImage: {
        image: '',
        height: 'clamp(340px, 78vh, 940px)',
        bottom: 'clamp(-24px, -1.6vh, -8px)',
        opacity: '1'
      },
      assetsPath: '',
      jsEnabled: false,
      jsCode: '',
      rules: []
    }

    var DEFAULT_RULE_SPECS = [
      { selector: 'body', css: 'font-family: system-ui, -apple-system, "Segoe UI", sans-serif;', noteKey: 'ruleNoteBody' },
      { selector: '[data-slot="sidebar"]', css: 'border-right: 1px solid #e5e7eb;', noteKey: 'ruleNoteSidebar' },
      { selector: '[data-slot="conversation"]', css: 'padding: 0 16px;', noteKey: 'ruleNoteConversation' },
      { selector: '[data-slot="details"]', css: 'border-left: 1px solid #e5e7eb;', noteKey: 'ruleNoteDetails' },
      { selector: '[data-slot="conversation"] [class*="bubble"]', css: 'border-radius: 16px;', noteKey: 'ruleNoteBubble' },
      { selector: '[data-slot="conversation"] [class*="input"]', css: 'border-radius: 12px;', noteKey: 'ruleNoteInput' },
      { selector: '[class*="toolbar"]', css: 'gap: 8px;', noteKey: 'ruleNoteToolbar' }
    ]

    var zh = {
      nav: '自定义样式',
      title: '自定义 CSS / JS',
      description: '动态修改 DSH Web 样式：CSS、背景图片、本地图片与用户 JS 文件，保存后立即生效。',
      enabled: '启用自定义样式',
      css: '全局 CSS',
      cssHint: '直接写入 CSS 文本，可覆盖页面样式；例如 #root { border-radius: 12px; }',
      background: '背景图片',
      backgroundImage: '图片地址',
      backgroundHint: '支持 http(s) URL、data URI、CSS 渐变，以及本地图片地址 /api/custom-css/assets/文件名.png。浏览器不能直接读取 file:// 或 /home/... 绝对路径。',
      backgroundSize: '尺寸',
      backgroundPosition: '位置',
      backgroundRepeat: '重复',
      backgroundOpacity: '不透明度',
      backgroundOpacityHint: '背景图片不透明度，0 到 1，例如 0.5。',
      backgroundMode: '背景范围',
      backgroundModeConversation: '对话界面',
      backgroundModePage: '整个页面',
      backgroundModeHint: '二选一：对话界面背景只显示在中间对话区；整个页面背景覆盖侧边栏与详情面板。',
      sidebarBackground: '左侧工作区背景',
      sidebarBackgroundImage: '图片地址',
      sidebarBackgroundHint: '仅在「背景范围 = 对话界面」时生效，覆盖左侧整个工作区（侧边栏）。支持 http(s) URL、data URI、CSS 渐变与 /api/custom-css/assets/文件名.png。',
      sidebarBackgroundOpacity: '左侧背景不透明度',
      sidebarBackgroundOpacityHint: '左侧工作区背景图片不透明度，0 到 1，例如 0.5。',
      leftImage: '左侧图片',
      leftImageHint: '固定在中间对话区域左下角的装饰图片：左边缘贴合侧边栏右边界。支持 http(s) URL、data URI 与 /api/custom-css/assets/文件名.png。',
      rightImage: '右侧图片',
      rightImageHint: '固定在中间对话区域右下角的装饰图片：右边缘贴合详情面板左边界。支持 http(s) URL、data URI 与 /api/custom-css/assets/文件名.png。',
      sideImageHeight: '高度',
      sideImageHeightHint: '图片显示高度，例如 clamp(360px, 80vh, 960px) 或 80vh。',
      sideImageBottom: '底部偏移',
      sideImageBottomHint: '相对对话区域底部的偏移，例如 clamp(-24px, -1.6vh, -8px) 或 0px。',
      sideImageOpacity: '不透明度',
      sideImageOpacityHint: '0 到 1，例如 0.9。',
      assetsPath: '本地图片目录',
      assetsPathHint: '把本地图片放到这个目录，再用 /api/custom-css/assets/文件名.png 作为背景地址。默认目录：$DSH_HOME/custom-css/assets',
      rules: 'CSS 规则',
      addRule: '新增规则',
      addDefaultRules: '插入默认规则',
      rulesHint: '备注用来标注这条规则影响哪个区域；点「插入默认规则」生成一份带说明的常用模板。',
      selector: '选择器',
      ruleCss: '样式声明',
      ruleNote: '备注（用到哪里）',
      ruleNoteBody: '整个页面：全局字体/背景',
      ruleNoteSidebar: '左侧边栏容器（整体背景、边框、内边距）',
      ruleNoteConversation: '中间对话主区域（内边距、最大宽度、背景）',
      ruleNoteDetails: '右侧详情面板（打开会话详情时出现）',
      ruleNoteBubble: '聊天气泡（用户与助手消息）',
      ruleNoteInput: '输入/编辑器区域（按需调整选择器）',
      ruleNoteToolbar: '工具栏（页面各处工具条）',
      remove: '删除',
      jsEnabled: '启用用户 JS 文件',
      jsCode: 'JS 代码',
      jsHint: '保存后会写入 $DSH_HOME/custom-css/user.js，并由页面加载执行。可使用 window.dshCustomCss 帮助函数。',
      save: '保存',
      saved: '已保存',
      saveError: '保存失败'
    }

    var en = {
      nav: 'Custom CSS',
      title: 'Custom CSS / JS',
      description: 'Change DSH Web styles at runtime: CSS, backgrounds (including local images), and a user JS file.',
      enabled: 'Enable custom styles',
      css: 'Global CSS',
      cssHint: 'Raw CSS text; e.g. #root { border-radius: 12px; }',
      background: 'Background image',
      backgroundImage: 'Image URL',
      backgroundHint: 'Supports http(s) URLs, data URIs, CSS gradients, and local images via /api/custom-css/assets/filename.png. Browsers cannot read file:// or absolute local paths directly.',
      backgroundSize: 'Size',
      backgroundPosition: 'Position',
      backgroundRepeat: 'Repeat',
      backgroundOpacity: 'Opacity',
      backgroundOpacityHint: 'Background image opacity, 0 to 1, e.g. 0.5.',
      backgroundMode: 'Background scope',
      backgroundModeConversation: 'Conversation area',
      backgroundModePage: 'Whole page',
      backgroundModeHint: 'Pick one: conversation-area background shows only behind the chat; whole-page background covers the sidebar and details panel too.',
      sidebarBackground: 'Left workspace background',
      sidebarBackgroundImage: 'Image URL',
      sidebarBackgroundHint: 'Only applies when background scope is "Conversation area". Covers the entire left workspace (sidebar). Supports http(s) URLs, data URIs, CSS gradients, and /api/custom-css/assets/filename.png.',
      sidebarBackgroundOpacity: 'Sidebar opacity',
      sidebarBackgroundOpacityHint: 'Left workspace background image opacity, 0 to 1, e.g. 0.5.',
      leftImage: 'Left image',
      leftImageHint: 'Decorative image at the bottom-left of the conversation area: its left edge hugs the sidebar right edge. Supports http(s) URLs, data URIs, and /api/custom-css/assets/filename.png.',
      rightImage: 'Right image',
      rightImageHint: 'Decorative image at the bottom-right of the conversation area: its right edge hugs the details panel left edge. Supports http(s) URLs, data URIs, and /api/custom-css/assets/filename.png.',
      sideImageHeight: 'Height',
      sideImageHeightHint: 'Display height, e.g. clamp(360px, 80vh, 960px) or 80vh.',
      sideImageBottom: 'Bottom offset',
      sideImageBottomHint: 'Offset from the bottom of the conversation area, e.g. clamp(-24px, -1.6vh, -8px) or 0px.',
      sideImageOpacity: 'Opacity',
      sideImageOpacityHint: '0 to 1, e.g. 0.9.',
      assetsPath: 'Local image directory',
      assetsPathHint: 'Put local images in this directory, then use /api/custom-css/assets/filename.png as the image URL. Default: $DSH_HOME/custom-css/assets',
      rules: 'CSS rules',
      addRule: 'Add rule',
      addDefaultRules: 'Insert default rules',
      rulesHint: 'The note marks which area a rule affects. Use "Insert default rules" for an annotated starter set.',
      selector: 'Selector',
      ruleCss: 'Declarations',
      ruleNote: 'Note (where it applies)',
      ruleNoteBody: 'Whole page: global font/background',
      ruleNoteSidebar: 'Left sidebar container (background, border, padding)',
      ruleNoteConversation: 'Main conversation area (padding, max-width, background)',
      ruleNoteDetails: 'Right details panel (visible when a session detail is open)',
      ruleNoteBubble: 'Chat bubbles (user and assistant messages)',
      ruleNoteInput: 'Input/editor area (adjust the selector as needed)',
      ruleNoteToolbar: 'Toolbars across the page',
      remove: 'Remove',
      jsEnabled: 'Enable user JS file',
      jsCode: 'JS code',
      jsHint: 'Saved to $DSH_HOME/custom-css/user.js and loaded by the page. Use window.dshCustomCss helpers.',
      save: 'Save',
      saved: 'Saved',
      saveError: 'Save failed'
    }

    var UI_CSS = [
      '.dsh-cc-section{display:flex;flex-direction:column;gap:16px;padding:4px 0;color:var(--dsw-alias-label-primary)}',
      '.dsh-cc-title{font-size:16px;font-weight:600;line-height:24px}',
      '.dsh-cc-desc{color:var(--dsw-alias-label-secondary);font-size:13px;line-height:20px}',
      '.dsh-cc-field{display:flex;flex-direction:column;gap:6px}',
      '.dsh-cc-row{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:12px}',
      '.dsh-cc-label{font-size:13px;line-height:20px;color:var(--dsw-alias-label-primary)}',
      '.dsh-cc-hint{font-size:12px;line-height:18px;color:var(--dsw-alias-label-secondary)}',
      '.dsh-cc-input,.dsh-cc-textarea{box-sizing:border-box;width:100%;border:1px solid var(--dsw-alias-border-l2);border-radius:10px;background:var(--dsw-alias-bg-module-platform);color:var(--dsw-alias-label-primary);font:inherit;font-size:13px;line-height:20px;padding:8px 10px;outline:none}',
      '.dsh-cc-input:focus,.dsh-cc-textarea:focus{border-color:var(--dsw-static-neutral-bluish-400)}',
      '.dsh-cc-textarea{min-height:140px;resize:vertical;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}',
      '.dsh-cc-checkbox{display:flex;align-items:center;gap:8px;font-size:13px}',
      '.dsh-cc-checkbox input{width:16px;height:16px}',
      '.dsh-cc-button{cursor:pointer;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-interactive-bg);color:var(--dsw-alias-label-primary);border-radius:10px;padding:8px 14px;font:inherit;font-size:13px}',
      '.dsh-cc-button:hover{background:var(--dsw-alias-interactive-bg-hover)}',
      '.dsh-cc-button-group{display:flex;gap:8px;flex-wrap:wrap}',
      '.dsh-cc-legend,.dsh-cc-rule{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,2fr) minmax(0,1fr) auto;gap:8px;align-items:start}',
      '.dsh-cc-legend{font-size:12px;color:var(--dsw-alias-label-secondary);padding:0 2px}',
      '.dsh-cc-rule{padding:10px;border:1px solid var(--dsw-alias-border-l2);border-radius:10px;background:var(--dsw-alias-bg-module-platform)}',
      '.dsh-cc-rule .dsh-cc-textarea{min-height:64px}',
      '.dsh-cc-message{font-size:12px;color:var(--dsw-alias-state-success-primary)}',
      '.dsh-cc-save{align-self:flex-start}'
    ].join('\n')

    var SIDE_CSS = [
      '[data-dsh-simple-background-side-stage]{position:fixed;inset:0;z-index:0;pointer-events:none;overflow:hidden;contain:strict}',
      '[data-dsh-simple-background-side]{position:absolute;display:block;object-fit:contain;object-position:center bottom;width:auto;max-width:none;filter:drop-shadow(0 18px 26px rgba(15,23,35,.28));transition:opacity .2s}',
      '[data-dsh-simple-background-side="left"]{left:var(--dsh-cc-sidebar-width, 0px)}',
      '[data-dsh-simple-background-side="right"]{right:var(--dsh-cc-details-width, 0px)}',
      'body[data-ds-dark-theme] [data-dsh-simple-background-side]{filter:brightness(.86) saturate(.92) drop-shadow(0 20px 28px rgba(0,0,0,.32))}'
    ].join('\n')

    var LAYOUT_VAR_RULE = ':root { --dsh-cc-sidebar-width: 0px; --dsh-cc-details-width: 0px; }'

    function ensureStyle(id) {
      if (typeof document === 'undefined') return { textContent: '' }
      var el = document.getElementById(id)
      if (!el) {
        el = document.createElement('style')
        el.id = id
        el.setAttribute('data-plugin', 'dsh-simple-background')
        document.head.appendChild(el)
      }
      return el
    }

    function ensureUiStyle() {
      if (typeof document === 'undefined') return
      var el = document.getElementById(UI_STYLE_ID)
      if (!el) {
        el = document.createElement('style')
        el.id = UI_STYLE_ID
        el.setAttribute('data-plugin', 'dsh-simple-background')
        el.textContent = UI_CSS
        document.head.appendChild(el)
      }
    }

    function ensureSideStyle() {
      if (typeof document === 'undefined') return
      var el = document.getElementById(SIDE_STYLE_ID)
      if (!el) {
        el = document.createElement('style')
        el.id = SIDE_STYLE_ID
        el.setAttribute('data-plugin', 'dsh-simple-background')
        el.textContent = SIDE_CSS
        document.head.appendChild(el)
      }
    }

    function ensureThemeStyle() {
      if (typeof document === 'undefined') return
      var el = document.getElementById(THEME_STYLE_ID)
      if (!el) {
        el = document.createElement('style')
        el.id = THEME_STYLE_ID
        el.setAttribute('data-plugin', 'dsh-simple-background')
        document.head.appendChild(el)
      }
      return el
    }

    function ensureLayoutStyle() {
      if (typeof document === 'undefined') return
      var el = document.getElementById(LAYOUT_STYLE_ID)
      if (!el) {
        el = document.createElement('style')
        el.id = LAYOUT_STYLE_ID
        el.setAttribute('data-plugin', 'dsh-simple-background')
        document.head.appendChild(el)
      }
      try {
        if (el.sheet) {
          if (!el.sheet.cssRules || el.sheet.cssRules.length === 0) {
            el.sheet.insertRule(LAYOUT_VAR_RULE, 0)
          }
          layoutRule = el.sheet.cssRules[0]
        }
      } catch (error) {
        layoutRule = null
      }
      return el
    }

    function sideImageUrl(value) {
      var v = (value || '').trim()
      if (!v) return ''
      var match = v.match(/^url\(\s*["']?([^"']*)["']?\s*\)$/i)
      if (match) return match[1]
      return v
    }

    function ensureSideStage() {
      if (typeof document === 'undefined') return null
      ensureSideStyle()
      var el = document.getElementById(SIDE_STAGE_ID)
      if (!el) {
        el = document.createElement('div')
        el.id = SIDE_STAGE_ID
        el.setAttribute('data-plugin', 'dsh-simple-background')
        el.setAttribute('aria-hidden', 'true')
        var parent = document.body || document.documentElement
        if (parent) parent.insertBefore(el, parent.firstChild)
      }
      return el
    }

    function removeSideStage() {
      if (typeof document === 'undefined') return
      var el = document.getElementById(SIDE_STAGE_ID)
      if (el) el.remove()
    }

    function removeSideStyle() {
      if (typeof document === 'undefined') return
      var el = document.getElementById(SIDE_STYLE_ID)
      if (el) el.remove()
    }

    function ensureBgLayer() {
      if (typeof document === 'undefined') return null
      var el = document.getElementById(BG_LAYER_ID)
      if (!el) {
        el = document.createElement('div')
        el.id = BG_LAYER_ID
        el.setAttribute('data-plugin', 'dsh-simple-background')
        el.setAttribute('aria-hidden', 'true')
        el.style.position = 'fixed'
        el.style.inset = '0'
        el.style.zIndex = '-3'
        el.style.pointerEvents = 'none'
        var parent = document.body || document.documentElement
        if (parent) parent.insertBefore(el, parent.firstChild)
      }
      return el
    }

    function removeBgLayer() {
      if (typeof document === 'undefined') return
      var el = document.getElementById(BG_LAYER_ID)
      if (el) el.remove()
    }

    function sideImageConfig(value, side) {
      var fallback = side === 'right' ? DEFAULT_SETTINGS.rightImage : DEFAULT_SETTINGS.leftImage
      var cfg = value || {}
      function pick(field) {
        return cfg[field] === undefined || cfg[field] === null || cfg[field] === '' ? fallback[field] : cfg[field]
      }
      return {
        image: pick('image'),
        height: pick('height'),
        bottom: pick('bottom'),
        opacity: pick('opacity')
      }
    }

    function applySideImage(stage, side, cfg) {
      var url = sideImageUrl(cfg.image)
      var selector = '[data-dsh-simple-background-side="' + side + '"]'
      var img = stage.querySelector(selector)
      if (!url) {
        if (img) img.remove()
        return
      }
      if (!img) {
        img = document.createElement('img')
        img.setAttribute('data-dsh-simple-background-side', side)
        img.alt = ''
        stage.appendChild(img)
      }
      img.src = url
      img.style.height = cfg.height || 'auto'
      img.style.bottom = cfg.bottom || '0px'
      img.style.opacity = cfg.opacity === undefined || cfg.opacity === null ? '1' : String(cfg.opacity)
    }

    var layoutRule = null
    var layoutResizeObserver = null
    var layoutMutationObserver = null
    var layoutRaf = null
    var observedSidebar = null
    var observedDetails = null

    function setLayoutVar(name, value) {
      if (layoutRule && layoutRule.style) {
        layoutRule.style.setProperty(name, value)
        return
      }
      if (typeof document !== 'undefined' && document.documentElement) {
        document.documentElement.style.setProperty(name, value)
      }
    }

    function measureColumn(selector) {
      if (typeof document === 'undefined') return 0
      var el = document.querySelector(selector)
      if (!el) return 0
      var rect = el.getBoundingClientRect()
      var width = rect && typeof rect.width === 'number' ? rect.width : 0
      return Math.max(0, Math.round(width))
    }

    function ensureLayoutObservers() {
      if (typeof document === 'undefined' || typeof ResizeObserver === 'undefined') return
      if (!layoutResizeObserver) {
        layoutResizeObserver = new ResizeObserver(function () {
          setLayoutVar('--dsh-cc-sidebar-width', measureColumn(SIDEBAR_COLUMN_SELECTOR) + 'px')
          setLayoutVar('--dsh-cc-details-width', measureColumn(DETAILS_COLUMN_SELECTOR) + 'px')
        })
      }
      var sidebar = document.querySelector(SIDEBAR_COLUMN_SELECTOR)
      var details = document.querySelector(DETAILS_COLUMN_SELECTOR)
      if (sidebar !== observedSidebar) {
        if (observedSidebar) layoutResizeObserver.unobserve(observedSidebar)
        if (sidebar) layoutResizeObserver.observe(sidebar)
        observedSidebar = sidebar
      }
      if (details !== observedDetails) {
        if (observedDetails) layoutResizeObserver.unobserve(observedDetails)
        if (details) layoutResizeObserver.observe(details)
        observedDetails = details
      }
    }

    function syncLayout() {
      ensureLayoutStyle()
      setLayoutVar('--dsh-cc-sidebar-width', measureColumn(SIDEBAR_COLUMN_SELECTOR) + 'px')
      setLayoutVar('--dsh-cc-details-width', measureColumn(DETAILS_COLUMN_SELECTOR) + 'px')
      ensureLayoutObservers()
    }

    function scheduleLayoutSync() {
      if (layoutRaf) return
      layoutRaf = requestAnimationFrame(function () {
        layoutRaf = null
        syncLayout()
      })
    }

    function nodeTouchesLayoutColumns(node) {
      if (!node || node.nodeType !== 1) return false
      if (node.getAttribute && node.getAttribute('data-plugin') === 'dsh-simple-background') return false
      if (node.matches && (node.matches(SIDEBAR_COLUMN_SELECTOR) || node.matches(DETAILS_COLUMN_SELECTOR))) return true
      if (node.querySelector && (node.querySelector(SIDEBAR_COLUMN_SELECTOR) || node.querySelector(DETAILS_COLUMN_SELECTOR))) return true
      return false
    }

    function hasLayoutColumns(nodes) {
      for (var i = 0; i < nodes.length; i++) {
        if (nodeTouchesLayoutColumns(nodes[i])) return true
      }
      return false
    }

    function startLayoutObserver() {
      if (typeof document === 'undefined' || typeof MutationObserver === 'undefined' || layoutMutationObserver) return
      layoutMutationObserver = new MutationObserver(function (records) {
        for (var i = 0; i < records.length; i++) {
          if (hasLayoutColumns(records[i].addedNodes) || hasLayoutColumns(records[i].removedNodes)) {
            scheduleLayoutSync()
            return
          }
        }
      })
      layoutMutationObserver.observe(document.body, { childList: true, subtree: true })
    }

    function resetLayoutVars() {
      if (typeof document === 'undefined' || !document.documentElement) return
      document.documentElement.style.removeProperty('--dsh-cc-sidebar-width')
      document.documentElement.style.removeProperty('--dsh-cc-details-width')
    }

    function teardownLayout() {
      if (layoutResizeObserver) {
        layoutResizeObserver.disconnect()
        layoutResizeObserver = null
      }
      if (layoutMutationObserver) {
        layoutMutationObserver.disconnect()
        layoutMutationObserver = null
      }
      if (layoutRaf) {
        cancelAnimationFrame(layoutRaf)
        layoutRaf = null
      }
      observedSidebar = null
      observedDetails = null
      resetLayoutVars()
    }

    function hasSideImages(s) {
      var left = sideImageConfig(s && s.leftImage, 'left')
      var right = sideImageConfig(s && s.rightImage, 'right')
      return !!(left.image || right.image)
    }

    function applyTheme(s) {
      if (typeof document === 'undefined') return
      var el = ensureThemeStyle()
      var hasBackground = !!(s.enabled && s.backgroundImage)
      var hasSidebarBackground = !!(s.enabled && s.backgroundMode === 'conversation' && s.sidebarBackgroundImage)
      var active = hasBackground || hasSidebarBackground || hasSideImages(s)
      if (!active) {
        el.textContent = ''
        return
      }
      var rules = [
        ':root { --dsw-alias-bg-base: transparent !important; }',
        'body { --dsw-alias-bg-base: transparent !important; }',
        'body[data-ds-dark-theme] { --dsw-alias-bg-base: transparent !important; }',
        '[id="root"] { background: none !important; position: relative; }'
      ]
      if ((hasBackground && s.backgroundMode === 'page') || hasSidebarBackground) {
        rules.push(
          ':root { --dsw-specific-sidebar-fill: transparent !important; }',
          'body { --dsw-specific-sidebar-fill: transparent !important; }',
          'body[data-ds-dark-theme] { --dsw-specific-sidebar-fill: transparent !important; }'
        )
      }
      el.textContent = rules.join('\n')
    }

    function backgroundOpacityValue(s) {
      var value = parseFloat(s && s.backgroundOpacity)
      if (!Number.isFinite(value)) return 1
      return Math.max(0, Math.min(1, value))
    }

    function sidebarOpacityValue(s) {
      var value = parseFloat(s && s.sidebarBackgroundOpacity)
      if (!Number.isFinite(value)) return 1
      return Math.max(0, Math.min(1, value))
    }

    function applyBackground(s) {
      if (typeof document === 'undefined') return
      var styleEl = ensureStyle(BG_STYLE_ID)
      styleEl.textContent = ''
      var active = !!(s.enabled && s.backgroundImage)
      if (!active) {
        removeBgLayer()
        return
      }
      var opacity = backgroundOpacityValue(s)
      if (opacity < 1) {
        var layer = ensureBgLayer()
        if (!layer) return
        layer.style.backgroundImage = normalizeImage(s.backgroundImage)
        layer.style.backgroundSize = s.backgroundSize || 'cover'
        layer.style.backgroundPosition = s.backgroundPosition || 'center'
        layer.style.backgroundRepeat = s.backgroundRepeat || 'no-repeat'
        layer.style.opacity = String(opacity)
        return
      }
      removeBgLayer()
      var image = normalizeImage(s.backgroundImage)
      var size = s.backgroundSize || 'cover'
      var position = s.backgroundPosition || 'center'
      var repeat = s.backgroundRepeat || 'no-repeat'
      styleEl.textContent = [
        'body {',
        '  background-image: ' + image + ' !important;',
        '  background-size: ' + size + ' !important;',
        '  background-position: ' + position + ' !important;',
        '  background-repeat: ' + repeat + ' !important;',
        '  background-attachment: scroll !important;',
        '}'
      ].join('\n')
    }

    function applySidebarBackground(s) {
      if (typeof document === 'undefined') return
      var el = ensureStyle(SIDEBAR_BG_STYLE_ID)
      var active = !!(s.enabled && s.backgroundMode === 'conversation' && s.sidebarBackgroundImage)
      if (!active) {
        el.textContent = ''
        return
      }
      var image = normalizeImage(s.sidebarBackgroundImage)
      var size = s.backgroundSize || 'cover'
      var position = s.backgroundPosition || 'center'
      var repeat = s.backgroundRepeat || 'no-repeat'
      var opacity = sidebarOpacityValue(s)
      if (opacity >= 1) {
        el.textContent = [
          SIDEBAR_COLUMN_SELECTOR + ' {',
          '  background-image: ' + image + ' !important;',
          '  background-size: ' + size + ' !important;',
          '  background-position: ' + position + ' !important;',
          '  background-repeat: ' + repeat + ' !important;',
          '}'
        ].join('\n')
        return
      }
      var veil = String(Math.max(0, 1 - opacity))
      el.textContent = [
        SIDEBAR_COLUMN_SELECTOR + ' {',
        '  background-image: linear-gradient(rgba(255,255,255,' + veil + '), rgba(255,255,255,' + veil + ')), ' + image + ' !important;',
        '  background-size: 100% 100%, ' + size + ' !important;',
        '  background-position: center, ' + position + ' !important;',
        '  background-repeat: no-repeat, ' + repeat + ' !important;',
        '}'
      ].join('\n')
    }

    function applySideImages(s) {
      var left = sideImageConfig(s && s.leftImage, 'left')
      var right = sideImageConfig(s && s.rightImage, 'right')
      if (typeof document === 'undefined') return
      if (!left.image && !right.image) {
        removeSideStage()
        removeSideStyle()
        teardownLayout()
        return
      }
      var stage = ensureSideStage()
      if (!stage) return
      applySideImage(stage, 'left', left)
      applySideImage(stage, 'right', right)
      if (!stage.querySelector('[data-dsh-simple-background-side]')) {
        removeSideStage()
        teardownLayout()
        return
      }
      startLayoutObserver()
      syncLayout()
    }

    function same(a, b) {
      return JSON.stringify(a) === JSON.stringify(b)
    }

    function normalizeSettings(value) {
      var base = JSON.parse(JSON.stringify(DEFAULT_SETTINGS))
      if (!value) return base
      Object.keys(base).forEach(function (key) {
        if (key === 'leftImage' || key === 'rightImage') return
        if (value[key] !== undefined) base[key] = value[key]
      })
      base.leftImage = sideImageConfig(value.leftImage, 'left')
      base.rightImage = sideImageConfig(value.rightImage, 'right')
      return base
    }

    function normalizeImage(value) {
      var v = (value || '').trim()
      if (!v) return 'none'
      if (/^(url\(|linear-gradient\(|radial-gradient\(|conic-gradient\(|repeating-linear-gradient\(|repeating-radial-gradient\(|repeating-conic-gradient\()/i.test(v)) return v
      return 'url("' + v.replace(/"/g, '\\"') + '")'
    }

    function rulesToCss(rules) {
      return (rules || []).map(function (rule) {
        var selector = (rule.selector || '').trim()
        var css = (rule.css || '').trim()
        if (!selector || !css) return ''
        return selector + ' {\n' + css + '\n}'
      }).filter(Boolean).join('\n')
    }

    var dynamicRules = new Map()
    function renderApiRules() {
      var el = ensureStyle(API_STYLE_ID)
      var css = []
      dynamicRules.forEach(function (block, selector) {
        css.push(selector + ' {' + block + '}')
      })
      el.textContent = css.join('\n')
    }

    function declarationsToText(declarations) {
      if (typeof declarations === 'string') return declarations
      var parts = []
      Object.keys(declarations || {}).forEach(function (prop) {
        parts.push(prop + ': ' + declarations[prop] + ';')
      })
      return parts.join(' ')
    }

    function setRule(selector, declarations) {
      if (!selector) throw new Error('selector is required')
      dynamicRules.set(selector, declarationsToText(declarations))
      renderApiRules()
    }

    function setBackground(bg) {
      bg = bg || {}
      var s = {
        enabled: true,
        backgroundImage: bg.image || '',
        backgroundSize: bg.size || 'cover',
        backgroundPosition: bg.position || 'center',
        backgroundRepeat: bg.repeat || 'no-repeat',
        backgroundOpacity: bg.opacity !== undefined ? String(bg.opacity) : '1',
        backgroundMode: bg.mode === 'page' ? 'page' : 'conversation',
        sidebarBackgroundImage: currentSettings.sidebarBackgroundImage,
        sidebarBackgroundOpacity: currentSettings.sidebarBackgroundOpacity,
        leftImage: currentSettings.leftImage,
        rightImage: currentSettings.rightImage
      }
      applyTheme(s)
      applyBackground(s)
      applySidebarBackground(s)
    }

    function setSidebarBackground(bg) {
      bg = bg || {}
      var s = {
        enabled: true,
        backgroundImage: currentSettings.backgroundImage,
        backgroundSize: currentSettings.backgroundSize || 'cover',
        backgroundPosition: currentSettings.backgroundPosition || 'center',
        backgroundRepeat: currentSettings.backgroundRepeat || 'no-repeat',
        backgroundOpacity: currentSettings.backgroundOpacity || '1',
        backgroundMode: 'conversation',
        sidebarBackgroundImage: bg.image || '',
        sidebarBackgroundOpacity: bg.opacity !== undefined ? String(bg.opacity) : currentSettings.sidebarBackgroundOpacity,
        leftImage: currentSettings.leftImage,
        rightImage: currentSettings.rightImage
      }
      applyTheme(s)
      applyBackground(s)
      applySidebarBackground(s)
    }

    var lastScriptKey = ''
    function removeUserScript() {
      if (typeof document === 'undefined') return
      var old = document.getElementById(SCRIPT_TAG_ID)
      if (old) old.remove()
      lastScriptKey = ''
    }

    function loadUserScript(enabled) {
      if (typeof document === 'undefined') return
      if (!enabled) {
        removeUserScript()
        return
      }
      var url = SCRIPT_ENDPOINT + '?ts=' + Date.now()
      if (url === lastScriptKey) return
      var old = document.getElementById(SCRIPT_TAG_ID)
      if (old) old.remove()
      var script = document.createElement('script')
      script.id = SCRIPT_TAG_ID
      script.src = url
      script.async = false
      script.onerror = function () {
        var el = document.getElementById(SCRIPT_TAG_ID)
        if (el) el.remove()
      }
      document.head.appendChild(script)
      lastScriptKey = url
    }

    var currentSettings = DEFAULT_SETTINGS
    var currentScope = null

    var api = {
      setCss: function (css) {
        ensureStyle(RAW_STYLE_ID).textContent = css || ''
      },
      setRule: setRule,
      removeRule: function (selector) {
        dynamicRules.delete(selector)
        renderApiRules()
      },
      setBackground: setBackground,
      setSidebarBackground: setSidebarBackground,
      setSideImages: function (sides) {
        sides = sides || {}
        var s = {
          enabled: true,
          backgroundImage: currentSettings.backgroundImage,
          leftImage: sides.leftImage !== undefined ? sides.leftImage : currentSettings.leftImage,
          rightImage: sides.rightImage !== undefined ? sides.rightImage : currentSettings.rightImage
        }
        applyTheme(s)
        applySideImages(s)
      },
      setSideImage: function (side, cfg) {
        var sides = {}
        sides[side + 'Image'] = cfg || {}
        api.setSideImages(sides)
      },
      reload: function () {
        lastScriptKey = ''
        loadUserScript(currentSettings.enabled && currentSettings.jsEnabled)
      }
    }

    function applySettings(s) {
      s = s || DEFAULT_SETTINGS
      var raw = ensureStyle(RAW_STYLE_ID)
      if (s.enabled) {
        raw.textContent = (s.css || '') + '\n' + rulesToCss(s.rules)
        applyTheme(s)
        applyBackground(s)
        applySidebarBackground(s)
        applySideImages(s)
        loadUserScript(s.jsEnabled)
      } else {
        raw.textContent = ''
        applyTheme(s)
        applyBackground(s)
        applySidebarBackground(s)
        removeSideStage()
        removeSideStyle()
        teardownLayout()
        removeUserScript()
      }
    }

    function makeDefaultRules(t) {
      return DEFAULT_RULE_SPECS.map(function (spec) {
        return { selector: spec.selector, css: spec.css, note: t(spec.noteKey) }
      })
    }

    function CustomCssSection(props) {
      var scope = props.scope
      var t = props.t
      var subscribe = React.useCallback(function (listener) { return scope.subscribe(listener) }, [scope])
      var getSnapshot = React.useCallback(function () { return scope.getSnapshot() }, [scope])
      var snap = React.useSyncExternalStore(subscribe, getSnapshot)
      var value = snap && snap.status === 'ready' && snap.value ? normalizeSettings(snap.value) : normalizeSettings(DEFAULT_SETTINGS)
      var initialDraft = React.useMemo(function () { return value }, [snap])
      var draftState = React.useState(initialDraft)
      var draft = draftState[0]
      var setDraft = draftState[1]
      React.useEffect(function () { setDraft(value) }, [snap])
      var messageState = React.useState('')
      var message = messageState[0]
      var setMessage = messageState[1]
      var ready = snap && snap.status === 'ready'
      var writable = ready && snap.writable !== false

      function update(key, next) {
        setDraft(function (prev) {
          var nextDraft = Object.assign({}, prev)
          nextDraft[key] = next
          return nextDraft
        })
      }

      function updateSide(side, key, next) {
        var settingKey = side === 'left' ? 'leftImage' : 'rightImage'
        setDraft(function (prev) {
          var fallback = side === 'left' ? DEFAULT_SETTINGS.leftImage : DEFAULT_SETTINGS.rightImage
          var current = Object.assign({}, fallback, prev[settingKey] || {})
          current[key] = next
          var nextDraft = Object.assign({}, prev)
          nextDraft[settingKey] = current
          return nextDraft
        })
      }

      function updateRule(index, key, next) {
        setDraft(function (prev) {
          var rules = (prev.rules || []).map(function (rule, i) {
            if (i !== index) return rule
            var nextRule = Object.assign({}, rule)
            nextRule[key] = next
            return nextRule
          })
          return Object.assign({}, prev, { rules: rules })
        })
      }

      function addRule() {
        setDraft(function (prev) {
          return Object.assign({}, prev, { rules: (prev.rules || []).concat([{ selector: '', css: '', note: '' }]) })
        })
      }

      function addDefaultRules() {
        setDraft(function (prev) {
          var existing = new Set((prev.rules || []).map(function (rule) { return (rule.selector || '').trim() }))
          var additions = makeDefaultRules(t).filter(function (rule) { return rule.selector && !existing.has(rule.selector) })
          return Object.assign({}, prev, { rules: (prev.rules || []).concat(additions) })
        })
      }

      function removeRule(index) {
        setDraft(function (prev) {
          return Object.assign({}, prev, { rules: (prev.rules || []).filter(function (_, i) { return i !== index }) })
        })
      }

      function save() {
        var keys = ['enabled', 'css', 'backgroundImage', 'backgroundSize', 'backgroundPosition', 'backgroundRepeat', 'backgroundOpacity', 'backgroundMode', 'sidebarBackgroundImage', 'sidebarBackgroundOpacity', 'leftImage', 'rightImage', 'assetsPath', 'jsEnabled', 'jsCode']
        var patch = {}
        keys.forEach(function (key) {
          if (!same(draft[key], value[key])) patch[key] = draft[key]
        })
        if (!same(draft.rules, value.rules)) patch.rules = draft.rules
        if (Object.keys(patch).length === 0) {
          setMessage(t('saved'))
          return
        }
        Promise.all(Object.keys(patch).map(function (key) {
          return scope.set(key, patch[key])
        })).then(function () {
          setMessage(t('saved'))
          setTimeout(function () { setMessage('') }, 2000)
        }).catch(function () {
          setMessage(t('saveError'))
        })
      }

      function input(props2) {
        return React.createElement('input', Object.assign({}, props2, { className: 'dsh-cc-input' }))
      }
      function textarea(props2) {
        return React.createElement('textarea', Object.assign({}, props2, { className: 'dsh-cc-textarea' }))
      }
      function checkbox(props2) {
        return React.createElement('input', Object.assign({}, props2, { type: 'checkbox', className: '' }))
      }
      function label(text) {
        return React.createElement('div', { className: 'dsh-cc-label' }, text)
      }
      function hint(text) {
        return React.createElement('div', { className: 'dsh-cc-hint' }, text)
      }

      function sideImageSection(side) {
        var labelKey = side === 'left' ? 'leftImage' : 'rightImage'
        var hintKey = side === 'left' ? 'leftImageHint' : 'rightImageHint'
        var settingKey = side === 'left' ? 'leftImage' : 'rightImage'
        var fallback = side === 'left' ? DEFAULT_SETTINGS.leftImage : DEFAULT_SETTINGS.rightImage
        var cfg = Object.assign({}, fallback, draft[settingKey] || {})
        return React.createElement('div', { key: settingKey, className: 'dsh-cc-field' },
          label(t(labelKey)),
          input({ value: cfg.image || '', placeholder: '/api/custom-css/assets/' + side + '.png', onChange: function (e) { updateSide(side, 'image', e.target.value) } }),
          React.createElement('div', { className: 'dsh-cc-row' },
            React.createElement('div', { className: 'dsh-cc-field' },
              label(t('sideImageHeight')),
              input({ value: cfg.height || '', onChange: function (e) { updateSide(side, 'height', e.target.value) } })
            ),
            React.createElement('div', { className: 'dsh-cc-field' },
              label(t('sideImageBottom')),
              input({ value: cfg.bottom || '', onChange: function (e) { updateSide(side, 'bottom', e.target.value) } })
            )
          ),
          React.createElement('div', { className: 'dsh-cc-field' },
            label(t('sideImageOpacity')),
            input({ value: cfg.opacity || '', onChange: function (e) { updateSide(side, 'opacity', e.target.value) } })
          ),
          hint(t(hintKey))
        )
      }

      var children = [
        React.createElement('div', { key: 'title', className: 'dsh-cc-title' }, t('title')),
        React.createElement('div', { key: 'desc', className: 'dsh-cc-desc' }, t('description')),

        React.createElement('div', { key: 'enabled', className: 'dsh-cc-field' },
          React.createElement('label', { className: 'dsh-cc-checkbox' },
            checkbox({ checked: !!draft.enabled, onChange: function (e) { update('enabled', e.target.checked) } }),
            t('enabled')
          )
        ),

        React.createElement('div', { key: 'css', className: 'dsh-cc-field' },
          label(t('css')),
          textarea({ value: draft.css || '', onChange: function (e) { update('css', e.target.value) }, spellCheck: false }),
          hint(t('cssHint'))
        ),

        React.createElement('div', { key: 'background', className: 'dsh-cc-field' },
          label(t('background')),
          React.createElement('div', { className: 'dsh-cc-field' },
            label(t('backgroundMode')),
            React.createElement('select', { className: 'dsh-cc-input', value: draft.backgroundMode || 'conversation', onChange: function (e) { update('backgroundMode', e.target.value) } },
              React.createElement('option', { value: 'conversation' }, t('backgroundModeConversation')),
              React.createElement('option', { value: 'page' }, t('backgroundModePage'))
            ),
            hint(t('backgroundModeHint'))
          ),
          draft.backgroundMode !== 'page' && React.createElement('div', { key: 'sidebarBackground', className: 'dsh-cc-field' },
            label(t('sidebarBackground')),
            input({ value: draft.sidebarBackgroundImage || '', onChange: function (e) { update('sidebarBackgroundImage', e.target.value) }, placeholder: '/api/custom-css/assets/sidebar.png' }),
            React.createElement('div', { className: 'dsh-cc-field' },
              label(t('sidebarBackgroundOpacity')),
              input({ value: draft.sidebarBackgroundOpacity || '1', onChange: function (e) { update('sidebarBackgroundOpacity', e.target.value) }, placeholder: '0.5' }),
              hint(t('sidebarBackgroundOpacityHint'))
            ),
            hint(t('sidebarBackgroundHint'))
          ),
          React.createElement('div', { className: 'dsh-cc-row' },
            React.createElement('div', { className: 'dsh-cc-field' },
              label(t('backgroundImage')),
              input({ value: draft.backgroundImage || '', onChange: function (e) { update('backgroundImage', e.target.value) }, placeholder: '/api/custom-css/assets/bg.png' })
            ),
            React.createElement('div', { className: 'dsh-cc-field' },
              label(t('backgroundSize')),
              input({ value: draft.backgroundSize || 'cover', onChange: function (e) { update('backgroundSize', e.target.value) } })
            )
          ),
          React.createElement('div', { className: 'dsh-cc-row' },
            React.createElement('div', { className: 'dsh-cc-field' },
              label(t('backgroundPosition')),
              input({ value: draft.backgroundPosition || 'center', onChange: function (e) { update('backgroundPosition', e.target.value) } })
            ),
            React.createElement('div', { className: 'dsh-cc-field' },
              label(t('backgroundRepeat')),
              input({ value: draft.backgroundRepeat || 'no-repeat', onChange: function (e) { update('backgroundRepeat', e.target.value) } })
            )
          ),
          React.createElement('div', { className: 'dsh-cc-field' },
            label(t('backgroundOpacity')),
            input({ value: draft.backgroundOpacity || '1', onChange: function (e) { update('backgroundOpacity', e.target.value) }, placeholder: '0.5' }),
            hint(t('backgroundOpacityHint'))
          ),
          hint(t('backgroundHint'))
        ),

        sideImageSection('left'),
        sideImageSection('right'),

        React.createElement('div', { key: 'assetsPath', className: 'dsh-cc-field' },
          label(t('assetsPath')),
          input({ value: draft.assetsPath || '', onChange: function (e) { update('assetsPath', e.target.value) }, placeholder: '$DSH_HOME/custom-css/assets' }),
          hint(t('assetsPathHint'))
        ),

        React.createElement('div', { key: 'rules', className: 'dsh-cc-field' },
          label(t('rules')),
          draft.rules.length > 0 && React.createElement('div', { className: 'dsh-cc-legend' },
            React.createElement('span', null, t('selector')),
            React.createElement('span', null, t('ruleCss')),
            React.createElement('span', null, t('ruleNote')),
            React.createElement('span', null, '')
          ),
          draft.rules.map(function (rule, index) {
            return React.createElement('div', { key: 'rule-' + index, className: 'dsh-cc-rule' },
              input({ value: rule.selector || '', placeholder: t('selector'), onChange: function (e) { updateRule(index, 'selector', e.target.value) } }),
              textarea({ value: rule.css || '', placeholder: t('ruleCss'), onChange: function (e) { updateRule(index, 'css', e.target.value) } }),
              input({ value: rule.note || '', placeholder: t('ruleNote'), onChange: function (e) { updateRule(index, 'note', e.target.value) } }),
              React.createElement('button', { type: 'button', className: 'dsh-cc-button', onClick: function () { removeRule(index) } }, t('remove'))
            )
          }),
          React.createElement('div', { className: 'dsh-cc-button-group' },
            React.createElement('button', { type: 'button', className: 'dsh-cc-button', onClick: addRule }, t('addRule')),
            React.createElement('button', { type: 'button', className: 'dsh-cc-button', onClick: addDefaultRules }, t('addDefaultRules'))
          ),
          hint(t('rulesHint'))
        ),

        React.createElement('div', { key: 'jsEnabled', className: 'dsh-cc-field' },
          React.createElement('label', { className: 'dsh-cc-checkbox' },
            checkbox({ checked: !!draft.jsEnabled, onChange: function (e) { update('jsEnabled', e.target.checked) } }),
            t('jsEnabled')
          )
        ),
        React.createElement('div', { key: 'js', className: 'dsh-cc-field' },
          label(t('jsCode')),
          textarea({ value: draft.jsCode || '', onChange: function (e) { update('jsCode', e.target.value) }, spellCheck: false }),
          hint(t('jsHint'))
        ),

        React.createElement('button', { key: 'save', type: 'button', className: 'dsh-cc-button dsh-cc-save', disabled: !writable, onClick: save }, t('save')),
        message ? React.createElement('div', { key: 'message', className: 'dsh-cc-message' }, message) : null
      ]

      return React.createElement('div', { className: 'dsh-cc-section' }, children)
    }

    var inject = ['slots', 'locale', 'connection', 'remote', 'settingsScope']

    function apply(ctx) {
      if (typeof document !== 'undefined') ensureUiStyle()
      ctx.effect(function () { return ctx.locale.register(LOCALE_NS, { zh: zh, en: en }) }, 'dsh-simple-background: dictionaries')
      var t = ctx.locale.bind(LOCALE_NS)
      currentScope = ctx.settingsScope.bind({ namespace: SETTINGS_NAMESPACE })
      function sync() {
        var snap = currentScope.getSnapshot()
        var s = snap && snap.status === 'ready' && snap.value ? normalizeSettings(snap.value) : normalizeSettings(DEFAULT_SETTINGS)
        if (!same(s, currentSettings)) {
          currentSettings = s
          applySettings(s)
        }
      }
      ctx.effect(function () { return currentScope.subscribe(sync) }, 'dsh-simple-background: settings sync')
      sync()
      ctx.slots.inject('settings.section', function () {
        return ctx.slots.register({
          name: 'settings.section',
          id: 'custom-css',
          order: 100,
          label: function () { return t('nav') },
          locale: LOCALE_NS,
          inject: function () { return { scope: currentScope, t: t } }
        }, CustomCssSection)
      })
      if (typeof window !== 'undefined') window.dshCustomCss = api
    }

    exports.apply = apply
    exports.inject = inject
    exports.api = api
    return module.exports
  }
})
