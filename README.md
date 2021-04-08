## 毛小孩商城
---
毛小孩商城是一個販賣寵物商品的SPA電商平台，使用者可以瀏覽商品、加入購物車、註冊會員、查看及取消訂單、使用信用卡付款，頁面採RWD設計，可以在手機及電腦等不同裝置瀏覽。

👉 電腦版畫面
![](/screenshots/v2-pc.gif)

👉 手機版畫面
![](/screenshots/v2-m.gif)

#### Demo Website
---
👉 Heroku: https://fan5-pet-shop.herokuapp.com/

請用下列資料測試
1. 會員登入:

| 信箱 | 密碼 |
| ------ | ------ |
| user1@seed.com | 123|
| user2@seed.com | 123|

2. 信用卡號: 4000-2211-1111-1111 (有效月年和背面末三碼可任意填寫)

#### 後端API
---
👉 Github: https://github.com/Fan-55/pet-shop-eCommerce-backend

👉 Heroku: https://pet-shop-api.herokuapp.com/api/products
#### Features
---
- 前端使用React框架
- 串接藍新金流
- 使用localstorage實作購物車功能
- RWD
- jwt authentication
- 後端RESTful API
- 後端API使用Node.js + Express + MySQL實作

#### Tools
---
 前端: 
- HTML
- CSS
- React
- Redux: 統一管理前端資料狀態
- Bootstrap: 優化前端UI
- SweetAlert2: 彈出提示、確認框優化使用者體驗
- Axios

後端:
- Node.js
- Express
- MySQL
- Sequelize

部署:
- Heroku

#### 待開發功能
---
- 管理者(admin)後台  
1. 商品清單(上傳、編輯、刪除)
2. 使用者清單(編輯、刪除)
3. 訂單清單(編輯、刪除)

- 使用者(user)前台
1. 使用者編輯個人資料
2. 儲存使用者常用收件資料
3. 搜尋商品
4. 品牌分類
5. 評價系統
6. 商品分頁

#### Run Locally
---
1. Clone frontend repository
```
$ git clone https://github.com/Fan-55/pet-shop-eCommerce-frontend.git
```
2. Go to the directory 
```
$ cd pet-shop-eCommerce-frontend
```
3. Install the required packages 
```
$ npm install
```
4. Add `.env` file to root directory and copy the following to `.env` file
```
REACT_APP_BASE_URL=https://pet-shop-api.herokuapp.com
```
5. Run the app in the development mode. 
```
$ npm start
```
6. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.