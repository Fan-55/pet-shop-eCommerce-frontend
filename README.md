## 毛小孩商城
---
這是一個販賣寵物商品的電商網站
![](/screenshots/v1.png)

#### Demo Website
---
👉 Heroku: https://fan5-pet-shop.herokuapp.com/
請用下列資料測試
會員登入:
| 信箱 | 密碼 |
| ------ | ------ |
| user1@seed.com | 123|
| user2@seed.com | 123|

信用卡號: 4000-2211-1111-1111
有效月年和背面末三碼可任意填寫
#### 後端Demo
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
- 串接後端API
- 後端API使用Node.js + Exresss.js + MySQL實作

#### Tools
---
 前端: 
- HTML
- CSS
- React
- Redux
- Bootstrap

後端:
- Node.js
- Express.js
- MySQL
- Sequelize

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