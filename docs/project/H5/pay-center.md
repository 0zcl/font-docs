:::tip
STAR：Situation（情景），Task（任务），Action（行动）和 Result（结果）

XXX 项目出现 XXX 问题，我作为 XXX，负责其中的 XXX 部分，我通过 XXX 方式（或技术方案）成功解决了该问题，使 XXX 提高了 XXX，XXX 增长了 XXX

在项目经历描述中，通过交代清楚你在团队中的位置，以及大略描述你在团队中起到的作用
:::

## 场景
2020年前，公司内支付收费来自线下，线下收费，保存家长支付截图，再由老师到B端后台填写学员信息，上传支付截图。效率低下。随着公司从几百到几千的发展，支付成为公司发展瓶颈，一个内部使用，基建性质的支付平台应运而生。
1. 正式课报名需要支付。最初支付的开发设计是在正式课报名H5中，目的是让家长在报课时交费。2020年初左右，我参与支付H5的开发，主要接入<code>微信支付</code>，<code>支付宝支付</code>，<code>通联快捷支付</code>(即绑定银行卡 --> 输验证码 --> 支付)
2. 抽离支付业务。随着H5业务快速发展，部分H5也有接入支付业务的需求。因此，把支付业务抽离出来，独立维护支付中心H5。

## 业务
1. 微信支付。微信下支付流程简单。实现上和[wxSdk-微信分享](./h5-sdk.html#二、wxsdk)一致：调接口获取微信签名信息 --> wx.config --> wx.ready --> wx.chooseWXPay
```js
wx.config({
  debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
  appId: res.data.appId, // 必填，公众号的唯一标识
  timestamp: res.data.timestamp, // 必填，生成签名的时间戳
  nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
  signature: res.data.signature, // 必填，签名，见附录1
  jsApiList: ["chooseWXPay"],
});
```
![wxPay](@assets/project/26.png)

2. 支付宝支付。支付宝支付实现很简单，在收银台页点确认支付，调接口，后端返回一个链接，手机浏览器打开链接，就会自动唤起本地安装的支付宝进行支付。
```js
https://mclient.alipay.com/cashier/mobilepay.htm?alipay_exterface_invoke_assign_target=invoke_dfd00918a66d86f566b99f1cf7cecbf5&alipay_exterface_invoke_assign_sign=_iuvu_a_r_t_z_dcug_q_f_o_u6a_b_e_q_md_ee_ne_v_n_d_bm_n_x_f_y_ru_q_v5_t9p_th_b0_kkfp_cw%3D%3D
```
![aliPay](@assets/project/27.png)

由于在<code>微信环境下无法唤起支付宝</code>，因此，需要做一个中转页面。

3. 通联快捷支付。绑定银行卡 --> 输验证码 --> 支付。实际上较少人用这种支付方式。

![bank](@assets/project/28.png)

## 难点
### 微信支付本地调试


### 支付宝中转页
微信环境下如何调起支付宝？

### 业务H5接入
业务H5如何快速接入支付中心？

### app环境支持



## 总结

<style scoped>
img {
  max-width: 100%!important;
}
</style>

参考：
[微信支付](https://pay.weixin.qq.com/wiki/doc/api/index.html)

[申请开通微信支付教程](https://blog.csdn.net/zheng2780071070/article/details/114087468)

[支付宝支付](https://opendocs.alipay.com/open/203/105285)