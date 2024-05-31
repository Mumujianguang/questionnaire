# Score App

## 二维码模块
```html
<div class="root"></div>
```

```js
const qrCode = new QRCodeModule(
    document.querySelector('.root'),
    {
      value: 'https://www.wenjuan.com/s/UZBZJvOIMcP/#'
    }
)

qrCode.render()
```