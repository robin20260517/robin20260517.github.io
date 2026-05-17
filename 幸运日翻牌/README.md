# H5 v59 optimized package

## 已做
- Base64 图片已提取到 `assets/`，HTML 不再内嵌这些图片。
- 团队页改为分批渲染：先显示 20 张，滚动到底部继续加载。
- 减少常驻动画：不再让所有卡片一直漂浮，只保留随机诱导卡片动。
- 图片标签增加 lazy loading / async decoding。
- 保留当前 v58 的万花筒+金币洗牌效果。

## 重要
`index.html` 需要和 `assets/` 文件夹一起上传，不能只上传 HTML。

## PGSoft 图压缩成 WebP
当前环境不能联网下载 PGSoft 图片，所以没有直接替你压缩外链图片。
你可以在本地运行：

```bash
pip install pillow requests
python tools/compress_pgsoft_webp.py
```

它会下载 PGSoft 游戏图，裁剪成 200x260 WebP，并生成：
`index.pgsoft_webp.html`
