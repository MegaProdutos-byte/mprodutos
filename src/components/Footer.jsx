export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer id="rodape" className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <span className="logo">
            <img className="logo-img" src={`${import.meta.env.BASE_URL}logo.png`} alt="MegaProdutos" width="641" height="240" loading="lazy" />
          </span>
          <p>Uma vitrine com ofertas selecionadas do Mercado Livre, reunidas em um só lugar.</p>
        </div>

        <div>
          <h3>Como funciona</h3>
          <p>Navegue pelos produtos, compare preços e clique no que gostar. Você será levado ao anúncio no Mercado Livre.</p>
        </div>

        <div>
          <h3>Onde a compra acontece</h3>
          <p>Toda a compra é feita no Mercado Livre, com a sua conta, endereço e forma de pagamento. Aqui não pedimos nenhum dado.</p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <span>© {year} MegaProdutos. Todos os direitos reservados.</span>
          <span>Preços, frete e disponibilidade podem mudar no Mercado Livre.</span>
        </div>
      </div>
    </footer>
  )
}
