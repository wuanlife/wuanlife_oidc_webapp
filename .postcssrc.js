// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
      "postcss-import": {},
      "postcss-url": {},
      "postcss-aspect-ratio-mini": {},
      "postcss-write-svg": {
          utf8: false
      },
      "postcss-cssnext": {},
      "postcss-px-to-viewport": {
          // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
          viewportWidth: 720,     // (Number) The width of the viewport.
          // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
          viewportHeight: 1280,    // (Number) The height of the viewport.
          // 指定`px`转换为视窗单位值的小数位数
          unitPrecision: 3,       // (Number) The decimal numbers to allow the REM units to grow to.
          // 指定需要转换成的视窗单位，建议使用vw
          viewportUnit: 'vw',     // (String) Expected units.
          // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
          selectorBlackList: ['.ignore', '.hairlines'],  // (Array) The selectors to ignore and leave as px.
          // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
          minPixelValue: 1,       // (Number) Set the minimum pixel value to replace.
          // 允许在媒体查询中转换`px`
          mediaQuery: false       // (Boolean) Allow px to be converted in media queries.
      },
      "postcss-viewport-units":{},
      "cssnano": {
          preset: "advanced",
          autoprefixer: false,
          "postcss-zindex": false
      }
  }
}
