function buildBodyBag(obj) {
    let allItens = [];

    obj.items.map(item => {

        let itemBag = new Object();
        let qtdItem = obj.sacola.find(produto => {
            if (produto.id === item.product.id) {
                itemBag.qtd = produto.qtd;
            }
        });

        itemBag.id = item.product.id;
        itemBag.images = item.product.images[0];
        itemBag.price = item.product.price;
        itemBag.name = item.product.name;
        itemBag.subTotalItem = (itemBag.qtd * itemBag.price.value);

        if (itemBag.qtd > 0) {
            allItens.push(itemBag);
        }

    });

    let fullBag = new Object({ subTotalProdutos: allItens });

    let subTotalSum = 0;
    fullBag.subTotalProdutos.map(item => subTotalSum = (subTotalSum + item.subTotalItem));
    fullBag.totalBag = new Object({ totalItens: subTotalSum, totalIntallment: (subTotalSum / 5) });

    if (Object.keys(fullBag).length > 0) {
        return fullBag;
    } else {
        return false;
    }
}

module.exports = () => buildBodyBag;
