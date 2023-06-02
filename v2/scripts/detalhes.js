function add_product(product) {
    let stars = '';
    let count = 0;
    for (let i = 0; i < Math.floor(product.rating.rate); i++) {
        stars += '<span class="fa fa-star checked"></span>';
        count++;
    }
    if (product.rating.rate % 1 !== 0) {
        stars += '<span class="fa fa-star-half-alt checked"></span>';
        count++;
    }
    for (let i = count; i < 5; i++) {
        stars += '<span class="far fa-star unchecked"></span>';
    }

    const product_display = `
            <div class="container ">
                <div class="row">
                    <div class="col-lg-6 product-img">
                        <img src="${product.image}" class="img-fluid" alt="Product Image">
                    </div>
                    <div class="col-lg-6">
                        <h2 class="my-4">Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops</h2>
                        <div class="mb-3 rate">
                            ${stars}
                            (${product.rating.count})
                        </div>
                        <p>${product.description}</p>
                        <h3 class="text-primary mt-2">${product.price} Kz</h3>
                    </div>
                </div>
            </div>
    `;

    $('#details').append(product_display);
}

function load_product_by_id(id) {
    fetch(`https://fakestoreapi.com/products/${id}`)
        .then(res => res.json())
        .then(product => {
            add_product(product)
        })
}

$(document).ready(function () {
    let params = new URLSearchParams(window.location.search);
    let id = params.get('id');
    console.log(id)
    load_product_by_id(id);
});