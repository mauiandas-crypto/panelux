'use client'

import { useState, useRef, useEffect } from 'react'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const knowledgeBase: Record<string, string> = {
    hola: '¡Hola! 👋 Soy el asistente de Panelux. ¿Cómo puedo ayudarte hoy?',
    productos:
      '📦 Ofrecemos una variedad de sartenes, ollas y utensilios de cocina premium de la marca brasileña Panelux. ¿Hay algún producto específico que te interese?',
    envio:
      '🚚 Realizamos envíos a todo Uruguay. El envío es GRATIS a Montevideo. Generalmente entrega en 2-3 días hábiles.',
    pago: '💳 Aceptamos: tarjeta de crédito, débito, hasta 6 cuotas sin interés, y transferencia bancaria.',
    garantia: '✅ Todos nuestros productos incluyen garantía oficial del fabricante Panelux (1-2 años).',
    contacto: '📞 Puedes contactarnos por WhatsApp, email o llamar directamente. ¿Qué prefieres?',
    pedido: '🛒 Para rastrear tu pedido, necesitarás tu número de orden. ¿Cuál es tu número de pedido?',
    descuento:
      '🎁 Tenemos códigos promocionales disponibles: WELCOME10 (10%), SUMMER20 (20%), PANELUX50 ($50 descuento).',
    default: '¿Puedo ayudarte con algo más? 😊',
  }

  const findResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()
    for (const [key, response] of Object.entries(knowledgeBase)) {
      if (input.includes(key)) {
        return response
      }
    }
    return knowledgeBase.default
  }

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setLoading(true)

    setTimeout(() => {
      const botResponse = findResponse(input)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
      setLoading(false)
    }, 500)
  }

  return (
    <>
      {/* Botón Flotante */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-6 z-40 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition flex items-center justify-center font-bold text-2xl"
        title={isOpen ? 'Cerrar chat' : 'Abrir chat'}
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-40 right-6 z-40 w-96 max-w-[calc(100vw-1.5rem)] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col h-96 border-2 border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
            <h3 className="font-bold text-lg">🤖 Asistente Panelux</h3>
            <p className="text-xs text-blue-100">Disponible 24/7 para ayudarte</p>
          </div>

          {/* Mensajes */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 py-4">
                <p className="font-semibold mb-2">¡Hola! 👋</p>
                <p className="text-sm">Pregúntame sobre productos, envío, garantía o promociones</p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs rounded-lg px-4 py-2 ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-white text-gray-900 border-2 border-gray-200 rounded-bl-none'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              ))
            )}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-900 border-2 border-gray-200 rounded-lg rounded-bl-none px-4 py-2">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t-2 border-gray-200 p-4 space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Escribe tu pregunta..."
                className="flex-1 px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 text-sm text-gray-900"
              />
              <button
                onClick={handleSendMessage}
                disabled={loading}
                className="px-3 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold rounded-lg transition text-sm"
              >
                📤
              </button>
            </div>
            <div className="flex flex-wrap gap-1">
              {['Productos', 'Envío', 'Garantía', 'Descuentos'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setInput(tag.toLowerCase())}
                  className="text-xs bg-gray-100 hover:bg-blue-100 text-gray-700 px-2 py-1 rounded transition"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
