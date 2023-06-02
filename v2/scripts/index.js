window.loaded_itens = 0

function add_card(father_element, product) {
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

    const productCard = `
        
            <div class="col col-sm-4 mt-4 mb-4">
                <a href="detalhes.html?id=${product.id}">
                    <div class="card h-100">
                        <div class="card-img-top" >
                            <img class="card-img" src="${product.image}" alt="Imagem do Produto">
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">${product.title}</h5>
                            <p class="card-text">
                            ${stars}
                            (${product.rating.count})
                            </p>
                            <p class="card-text"><b>R$ ${product.price}</b></p>
                        </div>
                    </div>
                </a>
            </div>
        
    `;

    $(father_element).append(productCard);
}

function create_element_by_id(father_element, id) {
    fetch(`https://fakestoreapi.com/products/${id}`)
        .then(res => res.json())
        .then(product => {
            add_card(father_element, product)
        }
        );
}

function load_base_products(number_of_products) {
    let product_line = 0
    for (let i = 1; i <= number_of_products; i++) {
        if ((i - 1) % 3 == 0) {
            $('#products-display').append(`<div class="row row-cols-1 row-cols-sm-3 g-4" id="products-${product_line}"></div>`);
            product_line++;
        }
        create_element_by_id(`#products-${product_line - 1}`, i);
    }
    loaded_itens = number_of_products
}

function load_categories() {
    fetch('https://fakestoreapi.com/products/categories')
        .then(res => res.json())
        .then(categories => {
            categories.forEach(category => {
                $('#categoria').append(`<option>${category}</option>`);
            });
        })
}

function load_by_categorie(categorie) {
    let product_line = 0
    fetch(`https://fakestoreapi.com/products/category/${categorie}`)
        .then(res => res.json())
        .then(products => {
            for (let i = 0; i < products.length; i++) {
                if (i % 3 == 0) {
                    $('#products-display').append(`<div class="row row-cols-1 row-cols-sm-3 g-4" id="products-${product_line}"></div>`);
                    product_line++;
                }
                add_card(`#products-${product_line - 1}`, products[i])
            }
            loaded_itens = products.length
        })
}

function load_by_name(name) {
    let product_line = 0
    fetch(`https://fakestoreapi.com/products`)
        .then(res => res.json())
        .then(products => {
            const filtered_products = products.filter(product => product.title.toLowerCase().includes(name.toLowerCase()))
            for (let i = 0; i < filtered_products.length; i++) {
                if (i % 3 == 0) {
                    $('#products-display').append(`<div class="row row-cols-1 row-cols-sm-3 g-4" id="products-${product_line}"></div>`);
                    product_line++;
                }
                add_card(`#products-${product_line - 1}`, filtered_products[i])
            }
            loaded_itens = filtered_products.length
        })
}

function filter_by_categorie(categorie) {
    $('#products-display').empty();
    if (categorie == 'all') {
        load_base_products(12);
    } else {
        load_by_categorie(categorie);
    }
}

function filter_by_name(name) {
    $('#products-display').empty();
    load_by_name(name);
}

$(document).ready(function () {
    load_categories();
    $('#search-button-filter').click(function () {
        filter_by_categorie($('#categoria').val());
    });
    $('#name-button-filter').click(function (event) {
        event.preventDefault()
        const input_text_value = $('#main-search-input').val()
        if (input_text_value === '') {
            $('#products-display').empty();
            load_base_products(12);
        } else {
            filter_by_name(input_text_value);
        }
    })
    load_base_products(12);
});