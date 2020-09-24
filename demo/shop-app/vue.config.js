module.exports = {
    devServer: {
        before(app) {
            let data = [
                {
                    name: "商店a",
                    goods: [
                        { title: "a1", price: 30, num: 1, isChecked: false, isDel: false },
                        { title: "a2", price: 10, num: 3, isChecked: true, isDel: false },
                    ],
                    isChecked: false,
                    isDel: false,
                },
                {
                    name: "商店b",
                    goods: [
                        { title: "b1", price: 30, num: 1, isChecked: true, isDel: false },
                        { title: "b2", price: 10, num: 3, isChecked: true, isDel: false },
                    ],
                    isChecked: true,
                    isDel: false,
                },
            ];
            // app ==> exprss 服务器
            app.get('/cart/list', (req, res) => {
                setTimeout(() => { res.json(data) }, 1000)
            });
        }
    }
}