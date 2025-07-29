const spanCategoriaMayorBalance = document.getElementById("categoria-mayor-balance")
const spanBalanceCategoria = document.getElementById("balance-categoria")


document.addEventListener("DOMContentLoaded", function () {
    // ...
    pintarCategoriaMayorBalance()
})



async function categoriaConMayorBalance() {
    const movimientos = await traerMovimientos()
    const balances = {} // { idCategoria: { nombre, balance } }

    movimientos.forEach(m => {
        const id = m.categoryId
        const nombre = m.category?.nombre || "Sin nombre"
        const importe = parseFloat(m.importe)

        if (!balances[id]) {
            balances[id] = {
                nombre,
                balance: 0
            }
        }

        if (m.tipo === "venta") {
            balances[id].balance += importe
        } else if (m.tipo === "compra") {
            balances[id].balance -= importe
        }
    })

    let mayor = null

    for (const id in balances) {
        if (!mayor || balances[id].balance > mayor.balance) {
            mayor = balances[id]
        }
    }

    return mayor || { nombre: "-", balance: 0 }
}





async function pintarCategoriaMayorBalance() {
    const mayor = await categoriaConMayorBalance()

    spanCategoriaMayorBalance.textContent = mayor.nombre
    spanBalanceCategoria.innerHTML = `<span style="color: ${mayor.balance >= 0 ? 'green' : 'red'}">
    $${mayor.balance.toLocaleString("es-CO")}
  </span>`
}






