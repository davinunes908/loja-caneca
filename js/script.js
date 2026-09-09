/* =========================
   ANO DO RODAPÉ
========================= */

const anoAtual = document.getElementById("ano-atual");

if (anoAtual) {
    anoAtual.textContent = new Date().getFullYear();
}


/* =========================
   MENU MOBILE
========================= */

const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");


function abrirMenu() {

    if (!menuToggle || !navMenu) {
        return;
    }

    menuToggle.classList.add("ativo");

    navMenu.classList.add("ativo");

    document.body.classList.add("menu-aberto");

    menuToggle.setAttribute("aria-expanded", "true");

    menuToggle.setAttribute("aria-label", "Fechar menu");
}


function fecharMenu() {

    if (!menuToggle || !navMenu) {
        return;
    }

    menuToggle.classList.remove("ativo");

    navMenu.classList.remove("ativo");

    document.body.classList.remove("menu-aberto");

    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.setAttribute("aria-label", "Abrir menu");
}


if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

        const menuEstaAberto =
            navMenu.classList.contains("ativo");

        if (menuEstaAberto) {

            fecharMenu();

        } else {

            abrirMenu();

        }

    });


    const linksMenu = navMenu.querySelectorAll("a");

    linksMenu.forEach((link) => {

        link.addEventListener("click", () => {

            fecharMenu();

        });

    });

}


/* FECHA MENU AO REDIMENSIONAR */

window.addEventListener("resize", () => {

    if (window.innerWidth > 1100) {

        fecharMenu();

    }

});


/* =========================
   ANIMAÇÕES AO ROLAR
========================= */

const elementosReveal =
    document.querySelectorAll(".reveal");


if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("ativo");

                    observer.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.12
        }

    );


    elementosReveal.forEach((elemento) => {

        observer.observe(elemento);

    });

} else {

    elementosReveal.forEach((elemento) => {

        elemento.classList.add("ativo");

    });

}


/* =========================
   FILTROS DO PORTFÓLIO
========================= */

const filtros =
    document.querySelectorAll(".filtro");

const produtos =
    document.querySelectorAll(".produto-card");


filtros.forEach((filtro) => {

    filtro.addEventListener("click", () => {

        filtros.forEach((botao) => {

            botao.classList.remove("ativo");

        });


        filtro.classList.add("ativo");


        const categoria =
            filtro.dataset.filter;


        produtos.forEach((produto) => {

            const categoriaProduto =
                produto.dataset.category;


            if (
                categoria === "todos" ||
                categoria === categoriaProduto
            ) {

                produto.classList.remove("escondido");

            } else {

                produto.classList.add("escondido");

            }

        });

    });

});


/* =========================
   MODAL DAS IMAGENS
========================= */

const modalGaleria =
    document.getElementById("modal-galeria");

const modalImagem =
    document.getElementById("modal-imagem");

const modalFechar =
    document.getElementById("modal-fechar");

const imagensGaleria =
    document.querySelectorAll(".imagem-galeria");

const botoesZoom =
    document.querySelectorAll(".zoom-btn");


function abrirModal(imagem) {

    if (!modalGaleria || !modalImagem) {
        return;
    }

    modalImagem.src = imagem.src;

    modalImagem.alt = imagem.alt;

    modalGaleria.classList.add("ativo");

    document.body.classList.add("modal-aberto");


    if (modalFechar) {

        setTimeout(() => {

            modalFechar.focus();

        }, 100);

    }

}


function fecharModal() {

    if (!modalGaleria || !modalImagem) {
        return;
    }

    modalGaleria.classList.remove("ativo");

    document.body.classList.remove("modal-aberto");


    setTimeout(() => {

        modalImagem.src = "";

    }, 300);

}


imagensGaleria.forEach((imagem) => {

    imagem.addEventListener("click", () => {

        abrirModal(imagem);

    });

});


botoesZoom.forEach((botao) => {

    botao.addEventListener("click", () => {

        const imagem = botao
            .closest(".produto-image")
            .querySelector(".imagem-galeria");


        if (imagem) {

            abrirModal(imagem);

        }

    });

});


if (modalFechar) {

    modalFechar.addEventListener(
        "click",
        fecharModal
    );

}


if (modalGaleria) {

    modalGaleria.addEventListener(
        "click",
        (evento) => {

            if (evento.target === modalGaleria) {

                fecharModal();

            }

        }
    );

}


/* =========================
   TECLA ESC
========================= */

document.addEventListener("keydown", (evento) => {

    if (evento.key !== "Escape") {
        return;
    }


    if (
        modalGaleria &&
        modalGaleria.classList.contains("ativo")
    ) {

        fecharModal();

        return;
    }


    if (
        navMenu &&
        navMenu.classList.contains("ativo")
    ) {

        fecharMenu();

    }

});