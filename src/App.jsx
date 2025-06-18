import React, { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog.jsx'
import { Checkbox } from '@/components/ui/checkbox.jsx'
import { Play, Tv, Smartphone, Monitor, Check, MessageCircle, CreditCard, X, QrCode } from 'lucide-react'
import logo from './assets/logo.png'
import qr35 from './assets/qr_35.png'
import qr60 from './assets/qr_60.png'
import qr85 from './assets/qr_85.png'
import qr150 from './assets/qr_150.png'
import './App.css'

function App() {
  const [showTestModal, setShowTestModal] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState(null)
  const [currentStep, setCurrentStep] = useState(1)
  const [testData, setTestData] = useState({
    hasUsedService: null,
    previousApp: '',
    devices: []
  })

  const packages = [
    {
      id: 1,
      name: "Mensal",
      price: "35,00",
      duration: "1 mês",
      popular: false,
      qrCode: qr35,
      features: [
        "Todos os canais abertos e fechados",
        "Filmes, séries e novelas",
        "Conteúdo de streaming",
        "Qualidade HD/4K",
        "Suporte técnico",
        "Acesso em múltiplos dispositivos"
      ]
    },
    {
      id: 2,
      name: "Bimestral",
      price: "60,00",
      duration: "2 meses",
      popular: false,
      qrCode: qr60,
      features: [
        "Todos os canais abertos e fechados",
        "Filmes, séries e novelas",
        "Conteúdo de streaming",
        "Qualidade HD/4K",
        "Suporte técnico",
        "Acesso em múltiplos dispositivos"
      ]
    },
    {
      id: 3,
      name: "Trimestral",
      price: "85,00",
      duration: "3 meses",
      popular: true,
      qrCode: qr85,
      features: [
        "Todos os canais abertos e fechados",
        "Filmes, séries e novelas",
        "Conteúdo de streaming",
        "Qualidade HD/4K",
        "Suporte técnico prioritário",
        "Acesso em múltiplos dispositivos"
      ]
    },
    {
      id: 4,
      name: "Semestral",
      price: "150,00",
      duration: "6 meses",
      popular: false,
      qrCode: qr150,
      features: [
        "Todos os canais abertos e fechados",
        "Filmes, séries e novelas",
        "Conteúdo de streaming",
        "Qualidade HD/4K",
        "Suporte técnico VIP",
        "Acesso em múltiplos dispositivos",
        "Melhor custo-benefício"
      ]
    }
  ]

  const deviceOptions = [
    { id: 'smart-tv', label: 'Smart TV' },
    { id: 'tv-box', label: 'TV Box' },
    { id: 'computador', label: 'Computador' },
    { id: 'celular', label: 'Celular/Tablet' }
  ]

  const handleWhatsApp = (packageName = '', price = '') => {
    const message = "Olá, vim atrás do site e gostaria de mais informações a respeito do Playon"
    const whatsappUrl = `https://wa.me/5551999199622?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const handlePurchase = (pkg) => {
    setSelectedPackage(pkg)
    setShowPaymentModal(true)
  }

  const handlePaymentConfirmation = () => {
    const message = `🎯 *EU COMPREI O PACOTE ${selectedPackage.name.toUpperCase()}* 🎯\n\n💰 *Valor:* R$ ${selectedPackage.price}\n⏰ *Duração:* ${selectedPackage.duration}\n\n✅ *Já realizei o pagamento via PIX*\n\n📱 Aguardo os dados de acesso do PlayON!`
    
    const whatsappUrl = `https://wa.me/5551999199622?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
    setShowPaymentModal(false)
    setSelectedPackage(null)
  }

  const handleTestRequest = () => {
    setShowTestModal(true)
    setCurrentStep(1)
    setTestData({
      hasUsedService: null,
      previousApp: '',
      devices: []
    })
  }

  const handleServiceExperience = (hasUsed) => {
    setTestData(prev => ({ ...prev, hasUsedService: hasUsed }))
    if (hasUsed) {
      setCurrentStep(2)
    } else {
      setCurrentStep(3)
    }
  }

  const handlePreviousApp = (app) => {
    setTestData(prev => ({ ...prev, previousApp: app }))
    setCurrentStep(3)
  }

  const handleDeviceChange = (deviceId, checked) => {
    setTestData(prev => ({
      ...prev,
      devices: checked 
        ? [...prev.devices, deviceId]
        : prev.devices.filter(d => d !== deviceId)
    }))
  }

  const sendTestWhatsApp = () => {
    let message = "🎯 *SOLICITAÇÃO DE TESTE GRÁTIS* 🎯\n\n"
    message += "📺 *PlayON - Aplicativo de TV*\n\n"
    
    if (testData.hasUsedService) {
      message += "✅ *Experiência anterior:* Sim\n"
      if (testData.previousApp) {
        message += `📱 *Aplicativo usado:* ${testData.previousApp}\n`
      }
    } else {
      message += "✅ *Experiência anterior:* Não\n"
    }
    
    message += "\n🖥️ *Dispositivos para assistir:*\n"
    testData.devices.forEach(deviceId => {
      const device = deviceOptions.find(d => d.id === deviceId)
      message += `• ${device?.label}\n`
    })
    
    message += "\n🚀 *Gostaria de fazer um teste grátis do PlayON!*"
    
    const whatsappUrl = `https://wa.me/5551999199622?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
    setShowTestModal(false)
  }

  const closeTestModal = () => {
    setShowTestModal(false)
    setCurrentStep(1)
    setTestData({
      hasUsedService: null,
      previousApp: '',
      devices: []
    })
  }

  const closePaymentModal = () => {
    setShowPaymentModal(false)
    setSelectedPackage(null)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src={logo} alt="PlayON" className="h-12 w-auto" />
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#inicio" className="text-foreground hover:text-primary transition-colors">Início</a>
            <a href="#pacotes" className="text-foreground hover:text-primary transition-colors">Pacotes</a>
            <a href="#contato" className="text-foreground hover:text-primary transition-colors">Contato</a>
          </nav>
          <Button 
            onClick={() => handleWhatsApp()}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            WhatsApp
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section id="inicio" className="hero-section py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-red-200 to-white bg-clip-text text-transparent">
              Revolução na TV
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              Acesse todos os canais abertos e fechados, filmes, séries e muito conteúdo de streaming. 
              Transforme sua experiência de entretenimento com qualidade premium.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg pulse-red"
                onClick={() => document.getElementById('pacotes').scrollIntoView({ behavior: 'smooth' })}
              >
                <Play className="w-5 h-5 mr-2" />
                Ver Pacotes
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 text-lg"
                onClick={handleTestRequest}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Teste Grátis
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Por que escolher o PlayON?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg bg-card/50 card-hover">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Tv className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Canais Premium</h3>
              <p className="text-muted-foreground">
                Acesso completo a todos os canais abertos e fechados do Brasil e do mundo, 
                com qualidade HD e 4K.
              </p>
            </div>
            <div className="text-center p-6 rounded-lg bg-card/50 card-hover">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Play className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Streaming Ilimitado</h3>
              <p className="text-muted-foreground">
                Filmes, séries, novelas e documentários dos principais serviços de streaming, 
                tudo em um só lugar.
              </p>
            </div>
            <div className="text-center p-6 rounded-lg bg-card/50 card-hover">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Monitor className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Multi-dispositivos</h3>
              <p className="text-muted-foreground">
                Assista em TV, smartphone, tablet ou computador. 
                Compatível com todos os dispositivos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="pacotes" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Escolha seu Pacote</h2>
            <p className="text-xl text-muted-foreground">
              Planos flexíveis para todas as necessidades
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg) => (
              <Card key={pkg.id} className={`relative card-hover ${pkg.popular ? 'border-primary' : ''}`}>
                {pkg.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                    Mais Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                  <CardDescription>{pkg.duration} de acesso</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-primary">R$ {pkg.price}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    onClick={() => handlePurchase(pkg)}
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    Comprar via PIX
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Section */}
      <section className="py-20 px-4 bg-card/30">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Pagamento Rápido e Seguro</h2>
          <div className="max-w-2xl mx-auto">
            <div className="bg-card/50 rounded-lg p-8 mb-8">
              <CreditCard className="w-16 h-16 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-4">PIX Instantâneo</h3>
              <p className="text-muted-foreground mb-6">
                Pagamento via PIX com ativação imediata. Receba seus dados de acesso 
                em poucos minutos após a confirmação do pagamento.
              </p>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center justify-center">
                  <Check className="w-4 h-4 text-primary mr-2" />
                  Pagamento Seguro
                </div>
                <div className="flex items-center justify-center">
                  <Check className="w-4 h-4 text-primary mr-2" />
                  Ativação Imediata
                </div>
                <div className="flex items-center justify-center">
                  <Check className="w-4 h-4 text-primary mr-2" />
                  Suporte 24h
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Entre em Contato</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Tire suas dúvidas ou solicite suporte técnico
          </p>
          <Button 
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg"
            onClick={() => handleWhatsApp()}
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Falar no WhatsApp
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            WhatsApp: (51) 99919-9622
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <img src={logo} alt="PlayON" className="h-8 w-auto" />
          </div>
          <p className="text-muted-foreground text-sm">
            © 2024 PlayON. Todos os direitos reservados. Entretenimento premium ao seu alcance.
          </p>
        </div>
      </footer>

      {/* Test Modal */}
      <Dialog open={showTestModal} onOpenChange={setShowTestModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              Teste Grátis PlayON
              <Button
                variant="ghost"
                size="sm"
                onClick={closeTestModal}
                className="h-6 w-6 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
            <DialogDescription>
              Vamos personalizar sua experiência de teste
            </DialogDescription>
          </DialogHeader>

          {/* Step 1: Service Experience */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Você já utilizou esse tipo de serviço antes?</h3>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => handleServiceExperience(true)}
                >
                  ✅ Sim, já utilizei
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => handleServiceExperience(false)}
                >
                  ❌ Não, seria minha primeira vez
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Previous App */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Qual aplicativo você usava?</h3>
              <div className="space-y-2">
                {['IPTV Pro', 'Smart IPTV', 'SS IPTV', 'GSE Smart IPTV', 'Perfect Player', 'Outro'].map((app) => (
                  <Button
                    key={app}
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => handlePreviousApp(app)}
                  >
                    {app}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Devices */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Onde você pretende assistir ao conteúdo?</h3>
              <p className="text-sm text-muted-foreground">Selecione todos os dispositivos que você pretende usar:</p>
              <div className="space-y-3">
                {deviceOptions.map((device) => (
                  <div key={device.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={device.id}
                      checked={testData.devices.includes(device.id)}
                      onCheckedChange={(checked) => handleDeviceChange(device.id, checked)}
                    />
                    <label htmlFor={device.id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {device.label}
                    </label>
                  </div>
                ))}
              </div>
              <Button
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mt-6"
                onClick={sendTestWhatsApp}
                disabled={testData.devices.length === 0}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Solicitar Teste via WhatsApp
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Payment Modal */}
      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <QrCode className="w-5 h-5 mr-2 text-primary" />
                Pagamento via PIX
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={closePaymentModal}
                className="h-6 w-6 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
            <DialogDescription>
              {selectedPackage && `Pacote ${selectedPackage.name} - R$ ${selectedPackage.price}`}
            </DialogDescription>
          </DialogHeader>

          {selectedPackage && (
            <div className="space-y-6 text-center">
              <div className="bg-white p-4 rounded-lg">
                <img 
                  src={selectedPackage.qrCode} 
                  alt={`QR Code para pagamento de R$ ${selectedPackage.price}`}
                  className="w-full max-w-64 mx-auto"
                />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Escaneie o QR Code</h3>
                <p className="text-sm text-muted-foreground">
                  Use o aplicativo do seu banco para escanear o código PIX acima e realizar o pagamento de R$ {selectedPackage.price}
                </p>
              </div>

              <div className="bg-card/50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Detalhes do Pacote:</h4>
                <p className="text-sm">📦 {selectedPackage.name}</p>
                <p className="text-sm">💰 R$ {selectedPackage.price}</p>
                <p className="text-sm">⏰ {selectedPackage.duration} de acesso</p>
              </div>

              <Button
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                onClick={handlePaymentConfirmation}
              >
                <Check className="w-4 h-4 mr-2" />
                REALIZEI O PAGAMENTO
              </Button>

              <p className="text-xs text-muted-foreground">
                Após realizar o pagamento, clique no botão acima para confirmar e receber seus dados de acesso
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default App

