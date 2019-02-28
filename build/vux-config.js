'use strict'

const path = require('path')
const fs = require('fs')
const demoPath = path.resolve(__dirname, '../src/demo_list.json')
const glob = require('glob')
const match = path.join(__dirname, '../src/demos/*/*.vue')
const dir = path.join(__dirname, '../src/demos/')
const yaml = require('js-yaml')
const reg = /<demo[^>]*>([\s\S]*?)<\/demo>/g

const argv = require('yargs').argv
argv.simulate = argv.simulate || false

const isInclude = function (name, include) {
  let list = include.split(',')
  for (let i = 0; i < list.length; i++) {
    if (name.includes(list[i])) {
      return true
    }
  }
  return false
}

module.exports = {
  options: {
    vuxDev: !argv.simulate, // true
    vuxSetBabel: argv.simulate, // false
    vuxWriteFile: false,
    env: 'dev'
  },
  plugins: [
    'vux-ui', 'inline-manifest',
    {
      name: 'duplicate-style',
      options: {
        cssProcessorOptions: {
          safe: true,
          zindex: false,
          autoprefixer: {
            add: true,
            "browsers": [
              "iOS >= 7",
              "Android >= 4.1"
            ]
          }
        }
      }
    },
    {
      name: 'progress-bar',
      envs: ['development']
    },
    {
      name: 'js-parser',
      test: /main\.js/,
      fn: function (source) {
        this.addDependency(demoPath)
        let list = fs.readFileSync(demoPath, 'utf-8')
        list = JSON.parse(list)

        let groupList = []
        let dirs = {}
        const listDir = glob.sync(match).filter(one => {
          return !one.includes('_index.vue')
        }).map(one => {
          one = path.normalize(one)
          const component = one.replace(dir, '').replace('.vue', '').replace(path.sep, '/')
          let title = {
            en: 'EXAMPLE',
            'zh-CN': 'EXAMPLE'
          }
          let order = 999
          const urlpath = '/components/' + component
          let name = one.replace(dir, '').split(path.sep)[0]
          if (!Array.isArray(dirs[name])) {
            dirs[name] = []
          }

          const code = fs.readFileSync(path.join(__dirname, `../src/demos/${component}.vue`), 'utf-8')

          const rs = code.match(reg)
          if (rs) {
            let meta = yaml.safeLoad(rs[0].replace('<demo>', '').trim().replace('</demo>', ''))
            if (typeof meta.title === 'string') {
              title.en = meta.title
              title['zh-CN'] = meta.title
            } else if (typeof meta.title === 'object') {
              title.en = meta.title.en
              title['zh-CN'] = meta.title['zh-CN']
            }
            if (meta.order) {
              order = meta.order * 1
            }
          }
          dirs[name].push({
            title,
            path: urlpath,
            order
          })
          return component + '#' + urlpath
        })
        list = list.concat(listDir)

        for (let dir in dirs) {
          dirs[dir].sort((a, b) => {
            return a.order > b.order ? 1 : -1
          })
          const file = `<template>
  <!-- THIS FILE IS AUTO-GENERATED BY build/vux-config.js -->
  <group>
    <cell v-for="demo in list" :key="demo.path" is-link :link="demo.path" :title="demo.title[lang]"></cell>
  </group>
</template>

<script>
/* eslint-disable */
export default {
  created () {
    this.lang = this.$locale.get()
  },
  data () {
    return {
      lang: 'en',
      list: ${JSON.stringify(dirs[dir], null, 2)}
    }
  }
}
</script>
`
          fs.writeFileSync(path.join(__dirname, `../src/demos/${dir}/_index.vue`), file)
          groupList.push(`${dir}/_index#/components/${dir}/home`)

        }
        list = list.concat(groupList)

        if (argv.demo) {
          list = list.filter(item => {
            return item.indexOf(argv.demo) > -1
          })
        }
        let str = []
        list.forEach(one => {
          let filename = one
          let path = `/component/${toDash(one)}`
          if (/#/.test(one)) {
            filename = one.split('#')[0]
            path = one.split('#')[1]
          }

          let shouldIncluded = true

          if (path !== '/demo' && argv.env && argv.env.include) {
            shouldIncluded = isInclude(path, argv.env.include)
          }
          if (shouldIncluded) {
            str.push(`{
path: '${path}',
component: () => import('./demos/${filename}.vue').then(m => m.default)
}`)
          }

        })

        // 404 page
        str.push(`{
path: '*',
component: () => import('./demos/NotFoundComponent.vue').then(m => m.default)
}`)

        str = `[${str.join(',\n')}]`
        source = source.replace('const routes = []', 'const routes = ' + str)
        return source
      }
    },
    {
      name: 'i18n',
      vuxStaticReplace: false,
      staticReplace: false,
      extractToFiles: 'src/locales/components.yml',
      localeList: ['en', 'zh-CN']
    },
    {
      name: 'less-theme',
      path: 'src/theme.less'
    }
  ]
}

function toDash(str) {
  return str.replace(/([A-Z])/g, function (m, w) {
    return '-' + w.toLowerCase();
  }).replace('-', '')
}
