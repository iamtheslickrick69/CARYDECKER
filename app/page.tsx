"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import {
  X,
  Phone,
  Mail,
  Calendar,
  ChevronLeft,
  ChevronRight,
  XIcon,
  Upload,
  Sparkles,
  Scissors,
  Truck,
  Atom,
  ShieldCheck,
  RefreshCw,
  Target,
  Eye,
  ThumbsUp,
  Award,
  Shield,
  Clock,
  Linkedin,
  Twitter,
  Instagram,
  Hand,
  Smartphone,
} from "lucide-react"
import Image from "next/image"
import type React from "react"

// Image URLs from Cloudflare R2
const IMAGES = {
  logo: "/images/logoofficial.png",
  caryHeadshot: "/images/screenshot-202025-12-18-20at-207.png",
  heroProduct: "https://pub-82e4016d6e17421ebc1eaa174644bee3.r2.dev/022darktheme%20accesroes.jpg",
  before1: "https://pub-82e4016d6e17421ebc1eaa174644bee3.r2.dev/01before.png",
  after1: "https://pub-82e4016d6e17421ebc1eaa174644bee3.r2.dev/01after.png",
  before2: "https://pub-82e4016d6e17421ebc1eaa174644bee3.r2.dev/02before.png",
  after2: "https://pub-82e4016d6e17421ebc1eaa174644bee3.r2.dev/02after.png",
  before3: "https://pub-82e4016d6e17421ebc1eaa174644bee3.r2.dev/022before.png",
  after3: "https://pub-82e4016d6e17421ebc1eaa174644bee3.r2.dev/022after.png",
  cary1: "https://pub-82e4016d6e17421ebc1eaa174644bee3.r2.dev/01cary.png",
  cary2: "https://pub-82e4016d6e17421ebc1eaa174644bee3.r2.dev/02cary.png",
  product1: "https://pub-82e4016d6e17421ebc1eaa174644bee3.r2.dev/022nicephone.jpg",
  product2: "https://pub-82e4016d6e17421ebc1eaa174644bee3.r2.dev/022iphone1.jpg",
  product3: "https://pub-82e4016d6e17421ebc1eaa174644bee3.r2.dev/022macbook.jpg",
  product4: "https://pub-82e4016d6e17421ebc1eaa174644bee3.r2.dev/022masteraccesories.jpg",
  product5: "https://pub-82e4016d6e17421ebc1eaa174644bee3.r2.dev/022littleguy.jpg",
  whyItWorks: "https://pub-82e4016d6e17421ebc1eaa174644bee3.r2.dev/022lap.jpg",
  blog1: "https://pub-82e4016d6e17421ebc1eaa174644bee3.r2.dev/022darktheme%20accesroes.jpg",
  blog2: "https://pub-82e4016d6e17421ebc1eaa174644bee3.r2.dev/022mac2.jpg",
  blog3: "https://pub-82e4016d6e17421ebc1eaa174644bee3.r2.dev/02ipad.jpg",
  contactBg: "https://pub-82e4016d6e17421ebc1eaa174644bee3.r2.dev/02mac.jpg",
}

// Navigation links
const NAV_LINKS = [
  { href: "#hero", label: "Home" },
  { href: "#features", label: "Features" },
  { href: "#process", label: "Process" },
  { href: "#case-studies", label: "Success Stories" },
  { href: "#contact", label: "Contact" },
]

function useScrollAnimation(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold])

  return { ref, isVisible }
}

function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(40px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

function AnimatedCounter({ value, suffix = "" }: { value: string; suffix?: string }) {
  const { ref, isVisible } = useScrollAnimation()
  const [displayValue, setDisplayValue] = useState("0")

  useEffect(() => {
    if (!isVisible) return

    const numericValue = Number.parseInt(value.replace(/[^0-9]/g, ""))
    const prefix = value.match(/^\D*/)?.[0] || ""
    const duration = 2000
    const steps = 60
    const increment = numericValue / steps

    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= numericValue) {
        setDisplayValue(prefix + numericValue.toLocaleString() + suffix)
        clearInterval(timer)
      } else {
        setDisplayValue(prefix + Math.floor(current).toLocaleString() + suffix)
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [isVisible, value, suffix])

  return <span ref={ref}>{displayValue}</span>
}

export default function Page() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [chatMessage, setChatMessage] = useState("")
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({ name: "", email: "", company: "", message: "" })
  const [scrolled, setScrolled] = useState(false)

  // Cary AI State
  const [conversation, setConversation] = useState<Array<{ role: "user" | "cary"; message: string }>>([])
  const [isTyping, setIsTyping] = useState(false)
  const [leadContext, setLeadContext] = useState<{
    quantity?: string
    useCase?: string
    timeline?: string
    hasLogo?: boolean
    email?: string
    phone?: string
  }>({})

  const carouselImages = [IMAGES.product1, IMAGES.product2, IMAGES.product3, IMAGES.product4, IMAGES.product5]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Auto-scroll chat to bottom
  useEffect(() => {
    const chatMessages = document.getElementById("chat-messages")
    if (chatMessages) {
      chatMessages.scrollTop = chatMessages.scrollHeight
    }
  }, [conversation, isTyping])

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitted(true)
  }

  // Cary AI Intelligence System
  const getCaryResponse = (userMessage: string): string => {
    const msg = userMessage.toLowerCase()

    // Extract context from user message
    const extractQuantity = msg.match(/(\d+)\s*(units?|pieces?|cleaners?)?/)
    const extractEmail = msg.match(/[\w.-]+@[\w.-]+\.\w+/)
    const extractPhone = msg.match(/\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/)

    if (extractQuantity) setLeadContext({ ...leadContext, quantity: extractQuantity[1] })
    if (extractEmail) setLeadContext({ ...leadContext, email: extractEmail[0] })
    if (extractPhone) setLeadContext({ ...leadContext, phone: extractPhone[0] })

    // Detect use case
    if (msg.includes("conference") || msg.includes("trade show") || msg.includes("event")) {
      setLeadContext({ ...leadContext, useCase: "conference" })
    }

    // GREETING & INTRO
    if (msg.match(/\b(hi|hey|hello|yo|sup|good morning|good afternoon)\b/) && conversation.length <= 1) {
      return "Hey! I'm Cary Decker, the guy who invented these screen cleaners. 🙂 What brings you here today?"
    }

    // PRICING REQUESTS
    if (msg.includes("price") || msg.includes("cost") || msg.includes("how much") || msg.includes("pricing")) {
      if (!leadContext.quantity) {
        return "Great question! Pricing depends on quantity and customization. How many units are you thinking? (We do bulk orders from 50 to 10,000+)"
      } else {
        return `Awesome! For ${leadContext.quantity} units, pricing ranges from $3-8 each depending on customization. Want me to send you an exact quote? What's your email?`
      }
    }

    // QUANTITY QUESTIONS
    if (msg.match(/(\d+)\s*(units?|pieces?)/)) {
      const qty = parseInt(extractQuantity![1])
      if (qty < 50) {
        return "Our minimum order is 50 units for custom branding. But trust me, once you see these, you'll want more! They're perfect for conferences, client gifts, or employee swag. What's your use case?"
      } else if (qty < 500) {
        return `Perfect! ${qty} units is a great order size. These are ideal for corporate gifts, trade shows, or onboarding kits. What's the occasion? That'll help me recommend the best size and design options.`
      } else {
        return `Love it! ${qty} units - you're thinking big! 🚀 For orders over 500, we can do special pricing and rush turnaround if needed. When do you need them by?`
      }
    }

    // USE CASE RESPONSES
    if (msg.includes("conference") || msg.includes("trade show")) {
      return "These are PERFECT for conferences! People actually keep them (unlike pens that disappear). 95% retention rate! Plus your logo is in their hand 100+ times a day. Way better ROI than a tote bag. Want to see our conference package options?"
    }

    if (msg.includes("gift") || msg.includes("employee") || msg.includes("team") || msg.includes("staff")) {
      return "Great choice! These make excellent employee gifts because they're actually useful. Your team will stick them on their phones and laptops - constant brand reminder. Plus they're premium quality, so it shows you care. How big is your team?"
    }

    if (msg.includes("client") || msg.includes("customer")) {
      return "Smart move! Client gifts that get used = strong relationships. These stick to their phones, so every time they're in a meeting, they see your logo. Way more impact than a mug sitting in a cabinet. How many clients are you thinking?"
    }

    // PRODUCT FEATURES
    if (msg.includes("how") && (msg.includes("work") || msg.includes("clean"))) {
      return "They use NASA-inspired nano-carbon material that magnetically attracts grime, oils, and smudges. Just peel, wipe, stick back - stays sticky forever! Washable 100+ times. I invented these because existing solutions sucked. 😄"
    }

    if (msg.includes("material") || msg.includes("made of") || msg.includes("nasa")) {
      return "Great question! Proprietary nano-carbon blended material - the same stuff NASA uses. It's antimicrobial too, so it inhibits bacteria while it cleans. Plus lifetime warranty because I stand behind my product. 300,000+ sold!"
    }

    if (msg.includes("size") || msg.includes("dimensions")) {
      return "We have 3 sizes: Small (1.5\" - phones/watches), Medium (2.5\" - tablets/laptops), Large (3.5\" - monitors/TVs). Most people go with Medium for versatility. What devices are you targeting?"
    }

    if (msg.includes("custom") || msg.includes("logo") || msg.includes("brand")) {
      return "You can fully customize them! Upload your logo, pick brand colors, choose patterns, or use our templates. Check out our design tool on the page - you can see a live preview as you design. Want me to walk you through it?"
    }

    // TIMELINE & LOGISTICS
    if (msg.includes("how long") || msg.includes("turnaround") || msg.includes("when") || msg.includes("timeline")) {
      return "Standard turnaround is 3-4 weeks from design approval. Need them faster? We can do rush orders for urgent events. When do you need them by?"
    }

    if (msg.includes("ship") || msg.includes("deliver") || msg.includes("freight")) {
      return "We ship anywhere in the US (and internationally too). For bulk orders, we use freight carriers. Smaller orders go UPS/FedEx. Free shipping on orders over 500 units! Where are you located?"
    }

    if (msg.includes("minimum") || msg.includes("small order")) {
      return "Minimum order is 50 units for custom branding. Honestly, once companies see these, they usually order way more! The per-unit cost drops significantly at higher quantities. Starting with 100-200 is the sweet spot."
    }

    // QUALITY & WARRANTY
    if (msg.includes("quality") || msg.includes("warranty") || msg.includes("guarantee")) {
      return "LIFETIME WARRANTY. Seriously. If anything goes wrong, I'll replace it free. Forever. I invented these, so I stand behind them 100%. 300K+ units sold and we've had almost zero warranty claims. That's how confident I am."
    }

    if (msg.includes("washable") || msg.includes("reusable") || msg.includes("last")) {
      return "Built for hundreds of uses! Just rinse with water and they're good as new - stickiness comes right back. Unlike those cheap microfiber cloths that lose their magic after a few wipes. These are the real deal."
    }

    // SAMPLE REQUESTS
    if (msg.includes("sample") || msg.includes("try")) {
      return "Smart thinking! I can send you a sample so you can feel the quality yourself. Text me at (801) 362-1991 or email Cary@innowerks.com with your address and I'll get one out to you. Fastest way to see why these are amazing!"
    }

    // CONTACT & NEXT STEPS
    if (extractEmail) {
      return `Awesome - I got your email (${extractEmail[0]}). I'll send you a detailed quote within the hour! In the meantime, feel free to play with the design tool on this page to visualize your branded cleaners. Anything else I can help with?`
    }

    if (msg.includes("call") || msg.includes("talk") || msg.includes("phone")) {
      return "Let's do it! Text me at (801) 362-1991 or book a quick 15-min call: https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2RVoasEKr5d6m6y88vCNhM6Tvjtvn8asT1XcZb8QdeHVVZV4MXnZQxxC2wuN2Pc_RlrP9WBH1P - I'll walk you through everything!"
    }

    // COMPETITOR COMPARISONS
    if (msg.includes("cheaper") || msg.includes("expensive") || msg.includes("price too high")) {
      return "I get it - you can find cheaper options. But here's the thing: those fall apart after a few uses. Mine come with a LIFETIME WARRANTY and actually work. 300K+ sold because the quality speaks for itself. You're not buying a screen cleaner - you're buying a brand impression tool that lasts."
    }

    // OBJECTION HANDLING
    if (msg.includes("think about it") || msg.includes("later") || msg.includes("not sure")) {
      return "Totally understand! Before you go, what's holding you back? Price? Timeline? Minimum order? Let me address any concerns - I want to make sure this is a win for you."
    }

    // FRIENDLY CONVERSATION
    if (msg.includes("thanks") || msg.includes("thank you")) {
      return "You're welcome! Anytime. Seriously - I love talking about these because I genuinely believe in them. If anything else comes up, just shoot me a text at (801) 362-1991. I'm always here to help!"
    }

    if (msg.includes("cool") || msg.includes("awesome") || msg.includes("great")) {
      return "Right?! I'm excited to help you create something awesome. What's the next step for you - need a quote, want to see a sample, or ready to design?"
    }

    // OFF-TOPIC REDIRECT
    if (msg.includes("weather") || msg.includes("politics") || msg.includes("sports") || msg.includes("news")) {
      return "Ha! I'd love to chat about that over a beer, but I'm here to help with screen cleaners. 😄 What can I help you with for your project?"
    }

    // DEFAULT / CATCH-ALL
    return "Great question! Let me connect you with the full details - text me at (801) 362-1991 or email Cary@innowerks.com and I'll respond in under an hour. Or check out the design tool on this page to visualize your custom cleaners!"
  }

  const handleChatSubmit = async () => {
    if (chatMessage.trim()) {
      // Add user message to conversation
      const userMsg = { role: "user" as const, message: chatMessage }
      const newConversation = [...conversation, userMsg]
      setConversation(newConversation)

      // Clear input immediately
      const currentMessage = chatMessage
      setChatMessage("")

      // Show typing indicator
      setIsTyping(true)

      try {
        // Call Claude API via our secure backend
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: currentMessage,
            conversation: newConversation,
            leadContext: leadContext
          })
        })

        if (!response.ok) {
          throw new Error('API call failed')
        }

        const data = await response.json()

        // Add Cary's response
        setConversation(prev => [...prev, { role: "cary" as const, message: data.reply }])

      } catch (error) {
        console.error('Chat error:', error)
        // Fallback to rule-based response if API fails
        const fallbackResponse = getCaryResponse(currentMessage)
        setConversation(prev => [...prev, { role: "cary" as const, message: fallbackResponse }])
      } finally {
        setIsTyping(false)
      }
    }
  }

  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500">
        <div
          className={`
          transition-all duration-500 ease-out
          ${
            scrolled
              ? "mx-auto mt-4 max-w-3xl rounded-full bg-white/80 backdrop-blur-xl shadow-lg shadow-black/5 border border-white/50 px-6 py-3"
              : "bg-[#f8f8f8]/95 backdrop-blur-sm px-6 py-6"
          }
        `}
        >
          <div className={`flex items-center ${scrolled ? "justify-between gap-8" : "justify-between"}`}>
            <a href="#hero" className="flex-shrink-0">
              <Image
                src={IMAGES.logo || "/placeholder.svg"}
                alt="CBSC Device Essentials"
                width={scrolled ? 120 : 180}
                height={scrolled ? 32 : 48}
                className={`transition-all duration-500 ${scrolled ? "h-8 w-auto" : "h-10 w-auto"}`}
                priority
              />
            </a>

            {/* Desktop Navigation */}
            <nav className={`hidden md:flex items-center ${scrolled ? "gap-6" : "gap-8"}`}>
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`tracking-wide hover:text-gray-600 transition-all ${scrolled ? "text-xs" : "text-sm"}`}
                >
                  {link.label.toUpperCase()}
                </a>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden flex flex-col space-y-1.5"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <XIcon className="h-6 w-6" />
              ) : (
                <>
                  <span className="h-0.5 w-6 bg-black"></span>
                  <span className="h-0.5 w-6 bg-black"></span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav
            className={`md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-200 py-4 ${scrolled ? "mx-4 mt-2 rounded-2xl shadow-lg" : ""}`}
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block px-6 py-3 text-sm tracking-wide hover:bg-gray-100 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label.toUpperCase()}
              </a>
            ))}
          </nav>
        )}
      </header>

      <main>
        {/* SECTION 1: HERO */}
        <section id="hero" className="relative min-h-screen px-4 sm:px-6 pt-32 pb-16 overflow-hidden">
          <div
            className="absolute right-[-100px] top-20 h-[500px] w-[500px] animate-pulse rounded-full bg-gradient-to-br from-cyan-400/40 via-blue-400/30 to-teal-300/40 blur-[100px]"
            aria-hidden="true"
          />

          <div className="relative max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <AnimatedSection>
                <div className="mb-6 sm:mb-8">
                  <Image
                    src={IMAGES.logo || "/placeholder.svg"}
                    alt="CBSC Device Essentials"
                    width={280}
                    height={80}
                    className="h-auto w-[200px] sm:w-[280px]"
                    priority
                  />
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-6xl font-light leading-tight tracking-tight text-balance">
                  YOUR BRAND,
                  <br />
                  THEIR SCREENS,
                  <br />
                  ALWAYS CLEAN
                </h1>

                <p className="mt-6 sm:mt-8 max-w-lg text-sm md:text-base leading-relaxed text-gray-600">
                  Custom branded screen cleaners that stick to devices and deliver 100+ brand impressions. Premium
                  promotional products at the intersection of utility, cleanliness, and brand visibility.
                </p>

                <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-4">
                  <Button className="rounded-full bg-black text-white px-8 py-6 hover:bg-gray-800 hover:scale-105 transition-all duration-300">
                    START CUSTOMIZING
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-full border-2 border-black px-8 py-6 hover:bg-black hover:text-white transition-all duration-300 bg-transparent"
                  >
                    GET FREE SAMPLE
                  </Button>
                </div>

                {/* Trust Badges */}
                <div className="mt-8 sm:mt-12 flex flex-wrap gap-4 sm:gap-6 text-xs text-gray-600">
                  {[
                    "300K+ Units Sold",
                    "Lifetime Warranty",
                    "NASA-Inspired Material",
                    "Founded by Original Inventor",
                  ].map((badge, i) => (
                    <AnimatedSection key={badge} delay={i * 100}>
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"></span>
                        {badge}
                      </div>
                    </AnimatedSection>
                  ))}
                </div>
              </AnimatedSection>

              <AnimatedSection delay={200} className="relative">
                <div className="relative">
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-cyan-400/30 via-blue-400/20 to-transparent rounded-3xl blur-3xl scale-110"
                    aria-hidden="true"
                  />
                  <Image
                    src={IMAGES.heroProduct || "/placeholder.svg"}
                    alt="CBSC Custom Screen Cleaners"
                    width={600}
                    height={600}
                    className="relative rounded-2xl shadow-2xl hover:scale-[1.02] transition-transform duration-500"
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* SECTION 2: PROCESS */}
        <section id="process" className="relative py-24 px-4 sm:px-6 overflow-hidden">
          {/* Video Background */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            poster="https://pub-82e4016d6e17421ebc1eaa174644bee3.r2.dev/022darktheme%20accesroes.jpg"
          >
            <source src="https://pub-82e4016d6e17421ebc1eaa174644bee3.r2.dev/01vid.mp4" type="video/mp4" />
          </video>

          {/* Dark Overlay - 20% opacity */}
          <div className="absolute inset-0 bg-black/20" aria-hidden="true" />

          {/* Content */}
          <div className="relative z-10 max-w-7xl mx-auto">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-light tracking-tight text-white drop-shadow-lg">
                SIMPLE. FROM DESIGN TO DELIVERY.
              </h2>
              <p className="mt-4 text-white/90 max-w-xl mx-auto drop-shadow">
                Four easy steps to premium branded screen cleaners
              </p>
            </AnimatedSection>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
              {[
                {
                  step: "01",
                  title: "Choose or Upload",
                  description: "Select your logo and customize colors and size with our intuitive design tool.",
                  icon: Upload,
                },
                {
                  step: "02",
                  title: "We Perfect It",
                  description: "Our team ensures your designs look flawless on our proprietary, premium grade cloth.",
                  icon: Sparkles,
                },
                {
                  step: "03",
                  title: "Hand-Crafted Quality",
                  description:
                    "Each screen cleaner is carefully designed, cut and produced using our proprietary, nano-carbon active, premium grade cloth.",
                  icon: Scissors,
                },
                {
                  step: "04",
                  title: "Fast Delivery",
                  description: "Receive your custom screen cleaners in 3-4 weeks. Quality, guaranteed.",
                  icon: Truck,
                },
              ].map((item, index) => (
                <AnimatedSection key={item.step} delay={index * 100}>
                  <div className="relative p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl hover:bg-white/20 hover:-translate-y-2 transition-all duration-300 group h-full">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-4xl font-light text-white/30 group-hover:text-cyan-300 transition-colors">
                        {item.step}
                      </span>
                      <item.icon className="h-6 w-6 text-cyan-300 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                    </div>
                    <h3 className="mt-2 text-lg font-medium text-white">{item.title}</h3>
                    <p className="mt-2 text-sm text-white/80 leading-relaxed">{item.description}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3: PRODUCT SHOWCASE */}
        <section id="features" className="py-24 px-4 sm:px-6 bg-[#f8f8f8]">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-light tracking-tight">
                MASTERFULLY DESIGNED.
                <br />
                NASA-INSPIRED TECHNOLOGY.
              </h2>
            </AnimatedSection>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
              {[
                {
                  title: "NASA-Inspired Material",
                  description:
                    "Proprietary nano-carbon blended material used by NASA to handle virtually any smudge on virtually any screen or lens.",
                  icon: Atom,
                },
                {
                  title: "Antimicrobial Infusion",
                  description:
                    "Each pad is infused during manufacturing to inhibit unwanted bacteria while they clean.",
                  icon: ShieldCheck,
                },
                {
                  title: "Lifetime Warranty",
                  description: "We stand behind our quality. If anything goes wrong, we'll replace it free. Forever.",
                  icon: Award,
                },
                {
                  title: "Washable & Reusable",
                  description:
                    "Built for hundreds of uses. Just rinse with water to restore full cleaning power and stickiness.",
                  icon: RefreshCw,
                },
              ].map((feature, index) => (
                <AnimatedSection key={index} delay={index * 100}>
                  <div className="p-6 bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <feature.icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <h3 className="text-lg font-medium">{feature.title}</h3>
                    <p className="mt-2 text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            {/* Product Carousel */}
            <AnimatedSection>
              <div className="relative">
                <div className="overflow-hidden rounded-2xl">
                  <div
                    className="flex transition-transform duration-500 ease-out"
                    style={{ transform: `translateX(-${carouselIndex * 100}%)` }}
                  >
                    {carouselImages.map((src, index) => (
                      <div key={index} className="min-w-full">
                        <Image
                          src={src || "/placeholder.svg"}
                          alt={`Product showcase ${index + 1}`}
                          width={1200}
                          height={600}
                          className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover"
                          loading="lazy"
                          sizes="100vw"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-center gap-4 mt-6">
                  <button
                    onClick={() => setCarouselIndex((prev) => (prev === 0 ? carouselImages.length - 1 : prev - 1))}
                    className="p-3 rounded-full border border-gray-300 hover:bg-black hover:text-white hover:border-black hover:scale-110 transition-all duration-300"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setCarouselIndex((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1))}
                    className="p-3 rounded-full border border-gray-300 hover:bg-black hover:text-white hover:border-black hover:scale-110 transition-all duration-300"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>

                {/* Carousel dots */}
                <div className="flex justify-center gap-2 mt-4">
                  {carouselImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCarouselIndex(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === carouselIndex ? "bg-black w-6" : "bg-gray-300 w-2 hover:bg-gray-400"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* SECTION 3.5: CUSTOM DESIGN TOOL */}
        <section id="design-tool" className="py-24 px-4 sm:px-6 bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-200 to-rose-300 px-4 py-2 rounded-full text-gray-800 text-sm font-medium mb-6">
                <Sparkles className="h-4 w-4" />
                Interactive Designer
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-light tracking-tight">
                DESIGN YOUR OWN
                <br />
                CUSTOM SCREEN CLEANERS
              </h2>
              <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                Create your perfect branded screen cleaner in real-time. Choose your size, upload your logo, and customize
                every detail.
              </p>
            </AnimatedSection>

            <CustomDesignTool />
          </div>
        </section>

        {/* SECTION 4: BEFORE/AFTER */}
        <section className="py-24 px-4 sm:px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-light tracking-tight">
                SEE THE DIFFERENCE.
                <br />
                FEEL THE QUALITY.
              </h2>
              <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                NASA-inspired nano-carbon blended material magnetically attracts and traps grime, oils, smudges, spills
                and more — leaving you with nothing but shine and clarity.
              </p>
            </AnimatedSection>

            <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
              {[
                { before: IMAGES.before1, after: IMAGES.after1, label: "Phone Screen Transformation" },
                { before: IMAGES.before2, after: IMAGES.after2, label: "Device Clarity Restored" },
                { before: IMAGES.before3, after: IMAGES.after3, label: "Professional Clean Every Time" },
              ].map((item, index) => (
                <AnimatedSection key={index} delay={index * 100}>
                  <BeforeAfterSlider {...item} />
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5: WHY IT WORKS */}
        <section className="py-24 px-4 sm:px-6 bg-[#f8f8f8]">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <AnimatedSection>
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-light tracking-tight">
                  WHY SCREEN
                  <br />
                  CLEANERS WORK
                </h2>
                <p className="mt-4 text-gray-600">The perfect promotional product</p>

                <div className="mt-12 space-y-8">
                  {[
                    {
                      title: "Always With Them",
                      description:
                        "Sticks to devices people use 100+ times daily. Your brand in their hand, all day, every day.",
                      icon: Target,
                    },
                    {
                      title: "Instant Brand Recall",
                      description: "Every screen wipe is a brand impression. Subtle, effective marketing that works.",
                      icon: Eye,
                    },
                    {
                      title: "Actually Useful",
                      description:
                        "Unlike pens and stress balls, these get used daily. Practical value creates lasting impact.",
                      icon: ThumbsUp,
                    },
                    {
                      title: "Premium Quality",
                      description: "Premium feel that reflects your brand standards. Luxury in their pocket.",
                      icon: Award,
                    },
                  ].map((benefit, index) => (
                    <AnimatedSection key={index} delay={index * 100}>
                      <div className="flex gap-4 group">
                        <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-br from-orange-200 to-rose-300 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <benefit.icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-medium">{benefit.title}</h3>
                          <p className="mt-1 text-sm text-gray-600">{benefit.description}</p>
                        </div>
                      </div>
                    </AnimatedSection>
                  ))}
                </div>

                <div className="mt-12">
                  <Button className="rounded-full bg-black text-white px-8 py-6 hover:bg-gray-800 hover:scale-105 transition-all duration-300">
                    SEE IT IN ACTION
                  </Button>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={200} className="relative">
                <Image
                  src={IMAGES.whyItWorks || "/placeholder.svg"}
                  alt="Screen cleaner on laptop"
                  width={600}
                  height={700}
                  className="rounded-2xl shadow-xl hover:scale-[1.02] transition-transform duration-500"
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div
                  className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-gradient-to-br from-cyan-400/50 via-blue-400/40 to-transparent blur-3xl -z-10"
                  aria-hidden="true"
                />
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* SECTION 6: CASE STUDIES */}
        <section id="case-studies" className="py-24 px-4 sm:px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection className="text-center mb-4">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-light tracking-tight">
                REAL RESULTS FROM REAL CLIENTS
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={100}>
              <p className="text-center text-sm text-gray-500 mb-16 max-w-2xl mx-auto">
                Here's what brands across industries are achieving with custom screen cleaners
              </p>
            </AnimatedSection>

            <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  company: "Tech Startup",
                  industry: "SaaS Industry",
                  metric: "40% More Booth Traffic",
                  quote:
                    "Best conference swag we've ever given out. People actually kept them and used them. We saw a measurable increase in post-event follow-ups.",
                  attribution: "— VP of Marketing",
                  image: IMAGES.product2,
                },
                {
                  company: "Major University",
                  industry: "Higher Education",
                  metric: "95% Retention Rate",
                  quote:
                    "We included these in freshman orientation kits. Students still had them at graduation. That's four years of our brand on their devices every single day.",
                  attribution: "— Dean of Students",
                  image: IMAGES.product3,
                },
                {
                  company: "Regional Credit Union",
                  industry: "Financial Services",
                  metric: "3X ROI on Direct Mail",
                  quote:
                    "Our members love them. We included them in new account packets and saw a huge spike in positive feedback and referrals. Best marketing spend we made all year.",
                  attribution: "— Chief Marketing Officer",
                  image: IMAGES.product1,
                },
              ].map((study, index) => (
                <AnimatedSection key={index} delay={index * 100}>
                  <div className="bg-[#f8f8f8] rounded-2xl overflow-hidden group hover:shadow-xl hover:-translate-y-2 transition-all duration-300 h-full">
                    <div className="h-48 relative overflow-hidden">
                      <Image
                        src={study.image || "/placeholder.svg"}
                        alt={study.company}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-medium">{study.company}</h3>
                          <p className="text-xs text-gray-500">{study.industry}</p>
                        </div>
                        <span className="text-xs font-medium bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-3 py-1 rounded-full">
                          {study.metric}
                        </span>
                      </div>
                      <blockquote className="text-sm text-gray-600 italic leading-relaxed">"{study.quote}"</blockquote>
                      <p className="mt-4 text-xs text-gray-500">{study.attribution}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 7: HOW TO USE - Removed emojis, added proper icons */}
        <section className="py-24 px-4 sm:px-6 bg-[#f8f8f8]">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-light tracking-tight">SIMPLE AS 1-2-3</h2>
              <p className="mt-4 text-gray-600">Clean screens in seconds. Every time.</p>
            </AnimatedSection>

            <div className="mt-16 grid md:grid-cols-3 gap-6 sm:gap-8">
              {[
                { step: "1", title: "Peel", description: "Easily peel the cleaner off your device", icon: Hand },
                {
                  step: "2",
                  title: "Wipe",
                  description: "Wipe your screen or lens until crystal clear",
                  icon: Sparkles,
                },
                { step: "3", title: "Stick", description: "Stick it back — ready for next time", icon: Smartphone },
              ].map((item, index) => (
                <AnimatedSection key={item.step} delay={index * 100}>
                  <div className="flex flex-col items-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
                    <div className="h-16 w-16 rounded-full bg-black text-white flex items-center justify-center text-2xl font-light mb-6 group-hover:scale-110 transition-transform duration-300">
                      {item.step}
                    </div>
                    <h3 className="mt-4 text-lg font-medium">{item.title}</h3>
                    <p className="mt-2 text-sm text-gray-600">{item.description}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 8: COMMITMENT */}
        <section className="py-24 px-4 sm:px-6 bg-black text-white">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-light tracking-tight">OUR COMMITMENT TO YOU</h2>
            </AnimatedSection>

            <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  title: "Lifetime Warranty",
                  description: "We stand behind our quality. If anything goes wrong, we'll replace it free. Forever.",
                  icon: Shield,
                },
                {
                  title: "Hand-Crafted Quality",
                  description:
                    "Each screen cleaner is carefully designed, cut and produced using our proprietary, nano-carbon active, premium grade cloth.",
                  icon: Award,
                },
                {
                  title: "Industry-Leading Speed",
                  description: "From design approval to delivery in 3-4 weeks. Fast without cutting corners.",
                  icon: Clock,
                },
              ].map((item, index) => (
                <AnimatedSection key={index} delay={index * 100}>
                  <div className="p-8 border border-gray-800 rounded-xl text-center hover:border-cyan-400/50 hover:-translate-y-2 transition-all duration-300 group">
                    <div className="h-16 w-16 mx-auto rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <item.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-medium">{item.title}</h3>
                    <p className="mt-4 text-sm text-gray-400 leading-relaxed">{item.description}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 9: FOUNDER STORY */}
        <section className="py-24 px-4 sm:px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <AnimatedSection className="relative order-2 lg:order-1">
                <Image
                  src={IMAGES.cary2 || "/placeholder.svg"}
                  alt="Cary Decker, Founder of CBSC"
                  width={500}
                  height={600}
                  className="rounded-2xl shadow-xl hover:scale-[1.02] transition-transform duration-500"
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div
                  className="absolute -top-8 -right-8 h-40 w-40 rounded-full bg-gradient-to-br from-cyan-400/50 via-blue-400/40 to-transparent blur-3xl -z-10"
                  aria-hidden="true"
                />
              </AnimatedSection>

              <AnimatedSection delay={200} className="order-1 lg:order-2">
                <p className="text-sm text-gray-500 uppercase tracking-widest">
                  The perfect solution didn't exist — so we created it!
                </p>
                <h2 className="mt-4 text-2xl sm:text-3xl md:text-5xl font-light tracking-tight">
                  INVENTED BY
                  <br />
                  CARY DECKER
                </h2>

                <div className="mt-8 space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    Our founder, Cary Decker, was fed up with existing screen & lens cleaners — they were either too
                    bulky to carry around, or too messy to rely on, or only worked on one type of screen. So he decided
                    to roll up his sleeves and create the perfect solution himself!
                  </p>
                  <p>
                    After months of testing and sourcing materials, Cary finally found the perfect solution: A small,
                    yet powerful cleaning material used by NASA that can handle virtually any smudge on virtually any
                    screen or lens.
                  </p>
                  <p>
                    When more than 6,000 people backed our Kickstarter, we knew we had a great idea... and since then,
                    more than 300,000 units have gone out into the world. Who knows how many photos we've rescued from
                    smudges by now!
                  </p>
                </div>

                <div className="mt-12 grid grid-cols-3 gap-4 sm:gap-8">
                  <div>
                    <p className="text-2xl sm:text-3xl font-light">
                      <AnimatedCounter value="$2" suffix="M+" />
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500">Crowdfunding Raised</p>
                  </div>
                  <div>
                    <p className="text-2xl sm:text-3xl font-light">
                      <AnimatedCounter value="9" />
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500">Successful Campaigns</p>
                  </div>
                  <div>
                    <p className="text-2xl sm:text-3xl font-light">
                      <AnimatedCounter value="300" suffix="K+" />
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500">Units Sold Worldwide</p>
                  </div>
                </div>

                <div className="mt-12">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 text-sm font-medium hover:gap-3 transition-all group"
                  >
                    Start your order today{" "}
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* SECTION 10: RESOURCES */}
        <section className="py-24 px-4 sm:px-6 bg-[#f8f8f8]">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-light tracking-tight">RESOURCES</h2>
              <p className="mt-4 text-gray-600">Tools and guides to maximize your promotional ROI</p>
            </AnimatedSection>

            <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  image: IMAGES.blog1,
                  tag: "Coming Soon",
                  title: "ROI Calculator",
                  description: "Calculate your cost-per-impression and compare to traditional swag",
                },
                {
                  image: IMAGES.blog2,
                  tag: "Coming Soon",
                  title: "Design Templates",
                  description: "Download print-ready templates for your custom screen cleaners",
                },
                {
                  image: IMAGES.blog3,
                  tag: "Coming Soon",
                  title: "Brand Guidelines",
                  description: "Best practices for logo placement and color optimization",
                },
              ].map((resource, index) => (
                <AnimatedSection key={index} delay={index * 100}>
                  <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 h-full">
                    <div className="h-48 relative overflow-hidden">
                      <Image
                        src={resource.image || "/placeholder.svg"}
                        alt={resource.title}
                        fill
                        className="object-cover opacity-60 group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="bg-black text-white text-xs px-4 py-2 rounded-full font-medium">
                          {resource.tag}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-medium">{resource.title}</h3>
                      <p className="mt-2 text-sm text-gray-600">{resource.description}</p>
                      <p className="mt-4 text-xs text-gray-400 group-hover:text-cyan-500 transition-colors">
                        Notify me when available →
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 11: CONTACT */}
        <section id="contact" className="relative py-24 px-4 sm:px-6">
          <div className="absolute inset-0">
            <Image
              src={IMAGES.contactBg || "/placeholder.svg"}
              alt=""
              fill
              className="object-cover"
              loading="lazy"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/80"></div>
          </div>

          <div className="relative max-w-7xl mx-auto">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-light tracking-tight text-white">
                LET'S WORK TOGETHER
              </h2>
              <p className="mt-4 text-gray-400">Get in touch to discuss your custom screen cleaners</p>
            </AnimatedSection>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
              {/* Contact Options */}
              <AnimatedSection className="space-y-4 sm:space-y-6">
                <a
                  href="sms:+18013621991?body=Hi! I'm interested in custom screen cleaners for [Company Name]. I'd like to order approximately [Quantity] units. Can you text me back with pricing and next steps?"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 sm:p-6 bg-white/10 backdrop-blur rounded-xl hover:bg-white/20 hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Text Us</h3>
                    <p className="text-sm text-gray-400">Quick response • (801) 362-1991</p>
                  </div>
                </a>

                <a
                  href="mailto:Cary@innowerks.com?subject=Custom Screen Cleaner Quote Request&body=Hi Cary,%0D%0A%0D%0AI'm interested in custom branded screen cleaners for [Company Name].%0D%0A%0D%0ADetails:%0D%0A- Company: [Your Company]%0D%0A- Quantity Needed: [Approximate number]%0D%0A- Timeline: [When you need them]%0D%0A- Use Case: [Trade show, corporate gifts, etc.]%0D%0A%0D%0APlease send pricing and next steps.%0D%0A%0D%0AThank you!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 sm:p-6 bg-white/10 backdrop-blur rounded-xl hover:bg-white/20 hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Email Us</h3>
                    <p className="text-sm text-gray-400">Detailed inquiry • Cary@innowerks.com</p>
                  </div>
                </a>

                <a
                  href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2RVoasEKr5d6m6y88vCNhM6Tvjtvn8asT1XcZb8QdeHVVZV4MXnZQxxC2wuN2Pc_RlrP9WBH1P"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 sm:p-6 bg-white/10 backdrop-blur rounded-xl hover:bg-white/20 hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Calendar className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Schedule Call</h3>
                    <p className="text-sm text-gray-400">15-min chat with Cary</p>
                  </div>
                </a>
              </AnimatedSection>

              {/* Contact Form */}
              <AnimatedSection delay={200}>
                <div className="bg-white rounded-2xl p-6 sm:p-8 relative overflow-hidden">
                  {formSubmitted ? (
                    <div className="text-center py-12">
                      <Confetti />
                      <div className="h-16 w-16 mx-auto rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center mb-4">
                        <Sparkles className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-medium">Thanks!</h3>
                      <p className="mt-2 text-gray-600">We'll be in touch within 24 hours.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="space-y-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                          Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium mb-2">
                          Company
                        </label>
                        <input
                          type="text"
                          id="company"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium mb-2">
                          Message <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          id="message"
                          rows={4}
                          required
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent outline-none transition-all resize-none"
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-black text-white py-6 rounded-lg hover:bg-gray-800 hover:scale-[1.02] transition-all duration-300"
                      >
                        GET QUOTE
                      </Button>
                    </form>
                  )}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </main>

      {/* SUBSCRIPTION SECTION */}
      <section className="relative py-24 px-4 sm:px-6 overflow-hidden bg-gradient-to-br from-cyan-400 via-blue-500 to-blue-600">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDuration: '3s' }} />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }} />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4" />
              Exclusive Updates
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white mb-4">
              STAY IN THE LOOP
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Get insider tips on promotional products, exclusive deals, and be the first to know about new features.
            </p>

            <div className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3 bg-white/95 backdrop-blur-sm p-2 rounded-2xl shadow-2xl">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 rounded-xl border-none focus:ring-2 focus:ring-cyan-400 outline-none text-gray-900 placeholder:text-gray-400"
                />
                <Button className="bg-black text-white px-8 py-4 rounded-xl hover:bg-gray-800 hover:scale-105 transition-all duration-300 whitespace-nowrap">
                  Subscribe
                </Button>
              </div>
              <p className="mt-4 text-sm text-white/70">
                Join 5,000+ marketing professionals. Unsubscribe anytime.
              </p>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 flex flex-wrap justify-center gap-6 sm:gap-8 text-white/90">
              {[
                { icon: Mail, text: "Weekly tips" },
                { icon: Sparkles, text: "Exclusive deals" },
                { icon: Award, text: "Industry insights" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <item.icon className="h-4 w-4" />
                  {item.text}
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-white py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12">
            <div>
              <Image
                src={IMAGES.logo || "/placeholder.svg"}
                alt="CBSC Device Essentials"
                width={120}
                height={40}
                className="h-8 w-auto invert"
                loading="lazy"
              />
              <p className="mt-4 text-sm text-gray-400">
                Premium custom branded screen cleaners founded by Cary Decker.
              </p>
              {/* Social Links */}
              <div className="mt-6 flex gap-4">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gradient-to-br hover:from-cyan-400 hover:to-blue-500 hover:scale-110 transition-all duration-300"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gradient-to-br hover:from-cyan-400 hover:to-blue-500 hover:scale-110 transition-all duration-300"
                >
                  <Twitter className="h-4 w-4" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gradient-to-br hover:from-cyan-400 hover:to-blue-500 hover:scale-110 transition-all duration-300"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="hover:text-cyan-400 transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="tel:+18013621991" className="hover:text-cyan-400 transition-colors">
                    +1 (801) 362-1991
                  </a>
                </li>
                <li>
                  <a href="mailto:Cary@innowerks.com" className="hover:text-cyan-400 transition-colors">
                    Cary@innowerks.com
                  </a>
                </li>
                <li>Salt Lake City, UT</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
            © 2025 Custom Branded Screen Cleaners. All rights reserved.
          </div>
        </div>
      </footer>

      {/* CHATBOT */}
      <div className="fixed bottom-6 right-6 z-50">
        {chatOpen ? (
          <div className="w-80 bg-white rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
            <div className="bg-black text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Image
                  src={IMAGES.caryHeadshot || "/placeholder.svg"}
                  alt="Cary"
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-white object-cover"
                />
                <div>
                  <p className="font-medium text-sm">Cary</p>
                  <p className="text-xs text-gray-400">Founder</p>
                </div>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                aria-label="Close chat"
                className="hover:scale-110 transition-transform"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4 h-96 overflow-y-auto bg-gray-50 flex flex-col gap-3" id="chat-messages">
              {/* Initial greeting */}
              {conversation.length === 0 && (
                <div className="bg-white p-3 rounded-lg shadow-sm text-sm animate-in slide-in-from-bottom-2">
                  <p className="mb-2">Hey! I'm Cary, the guy who invented these screen cleaners. 👋</p>
                  <p>Ask me anything - pricing, how they work, custom branding, whatever!</p>
                </div>
              )}

              {/* Conversation history */}
              {conversation.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg text-sm ${
                    msg.role === "user"
                      ? "bg-black text-white ml-auto max-w-[80%]"
                      : "bg-white shadow-sm animate-in slide-in-from-bottom-2"
                  }`}
                >
                  {msg.message}
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="bg-white p-3 rounded-lg shadow-sm text-sm w-16 animate-in slide-in-from-bottom-2">
                  <div className="flex gap-1">
                    <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t bg-white">
              {/* Quick replies - only show at start */}
              {conversation.length === 0 && (
                <div className="flex gap-2 mb-3 flex-wrap">
                  {["How much do they cost?", "What's the turnaround time?", "Can I get a sample?"].map((q) => (
                    <button
                      key={q}
                      onClick={() => {
                        setChatMessage(q)
                        setTimeout(() => handleChatSubmit(), 100)
                      }}
                      className="text-xs bg-gray-100 px-3 py-1.5 rounded-full hover:bg-gray-200 hover:scale-105 transition-all"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

              {/* Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !isTyping && handleChatSubmit()}
                  disabled={isTyping}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-300 focus:border-transparent outline-none transition-all disabled:opacity-50"
                />
                <button
                  onClick={handleChatSubmit}
                  disabled={isTyping || !chatMessage.trim()}
                  className="px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800 hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setChatOpen(true)}
            className="h-16 w-16 rounded-full shadow-lg hover:scale-110 transition-all duration-300 overflow-hidden border-4 border-white animate-bounce"
            style={{ animationDuration: "2s" }}
            aria-label="Open chat"
          >
            <Image
              src={IMAGES.caryHeadshot || "/placeholder.svg"}
              alt="Chat with Cary"
              width={64}
              height={64}
              className="h-full w-full object-cover"
            />
          </button>
        )}
      </div>
    </div>
  )
}

// World-Class Custom Design Tool Component
function CustomDesignTool() {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [selectedSize, setSelectedSize] = useState<"small" | "medium" | "large">("medium")
  const [selectedColor, setSelectedColor] = useState("#3b82f6")
  const [uploadedLogo, setUploadedLogo] = useState<string | null>(null)
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(100)
  const [startingPoint, setStartingPoint] = useState<"scratch" | "favorite" | "industry" | null>(null)

  const sizes = [
    { id: "small", name: "Small", dimensions: "1.5\"", devices: "Phones, Watches", price: 3.5 },
    { id: "medium", name: "Medium", dimensions: "2.5\"", devices: "Tablets, Laptops", price: 5.5 },
    { id: "large", name: "Large", dimensions: "3.5\"", devices: "Monitors, TVs", price: 7.5 },
  ]

  // Customer Favorites - Real designs that converted
  const customerFavorites = [
    {
      id: "bold-minimal",
      name: "Bold Minimal",
      color: "#000000",
      pattern: null,
      description: "95% of Fortune 500s choose this",
      badge: "Most Popular",
    },
    {
      id: "tech-gradient",
      name: "Tech Blue",
      color: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
      pattern: null,
      description: "Perfect for SaaS & tech companies",
      badge: "Tech Favorite",
    },
    {
      id: "vibrant-coral",
      name: "Vibrant Coral",
      color: "linear-gradient(135deg, #ff6b9d 0%, #ffa06b 100%)",
      pattern: null,
      description: "Great for creative agencies",
      badge: "Creative",
    },
    {
      id: "professional-navy",
      name: "Navy Pro",
      color: "#1e3a8a",
      pattern: null,
      description: "Finance & consulting love this",
      badge: "Professional",
    },
  ]

  // Industry-Specific Templates
  const industryTemplates = [
    {
      id: "tech-startup",
      name: "Tech Startup",
      color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      icon: "💻",
      orders: "2,400+ orders",
    },
    {
      id: "healthcare",
      name: "Healthcare",
      color: "linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)",
      icon: "🏥",
      orders: "1,800+ orders",
    },
    {
      id: "university",
      name: "University",
      color: "linear-gradient(135deg, #dc2626 0%, #991b1b 100%)",
      icon: "🎓",
      orders: "3,200+ orders",
    },
    {
      id: "finance",
      name: "Finance",
      color: "linear-gradient(135deg, #059669 0%, #047857 100%)",
      icon: "💼",
      orders: "1,500+ orders",
    },
    {
      id: "real-estate",
      name: "Real Estate",
      color: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
      icon: "🏠",
      orders: "900+ orders",
    },
    {
      id: "fitness",
      name: "Fitness",
      color: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
      icon: "💪",
      orders: "750+ orders",
    },
  ]

  const brandColors = [
    { color: "#000000", name: "Classic Black" },
    { color: "#3b82f6", name: "Trust Blue" },
    { color: "#ef4444", name: "Energy Red" },
    { color: "#10b981", name: "Growth Green" },
    { color: "#f59e0b", name: "Vibrant Orange" },
    { color: "#8b5cf6", name: "Creative Purple" },
    { color: "#ec4899", name: "Bold Pink" },
    { color: "#06b6d4", name: "Fresh Cyan" },
  ]

  // Temporary - for backwards compatibility
  const [activeTab, setActiveTab] = useState<"upload" | "templates" | "patterns" | "colors">("upload")
  const [selectedPattern, setSelectedPattern] = useState<string | null>(null)

  const templates = customerFavorites
  const patterns: any[] = []
  const colorPresets = brandColors.map(c => c.color)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setUploadedLogo(event.target?.result as string)
        setSelectedTemplate(null)
      }
      reader.readAsDataURL(file)
    }
  }

  const calculatePrice = () => {
    const basePrice = sizes.find((s) => s.id === selectedSize)?.price || 5.5
    let discount = 1
    if (quantity >= 500) discount = 0.7
    else if (quantity >= 200) discount = 0.8
    else if (quantity >= 100) discount = 0.9
    return (basePrice * quantity * discount).toFixed(0)
  }

  const getSizeMultiplier = () => {
    switch (selectedSize) {
      case "small": return 0.7
      case "large": return 1.3
      default: return 1
    }
  }

  return (
    <div className="space-y-8">
      {/* Social Proof Header */}
      <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <Award className="h-5 w-5 text-orange-500" />
          <span><strong>300,000+</strong> units sold</span>
        </div>
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-orange-500" />
          <span><strong>$2M+</strong> crowdfunding</span>
        </div>
        <div className="flex items-center gap-2">
          <ThumbsUp className="h-5 w-5 text-orange-500" />
          <span><strong>4.9/5</strong> rating</span>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="flex justify-center items-center gap-4">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-4">
            <div
              className={`h-10 w-10 rounded-full flex items-center justify-center font-medium transition-all ${
                step >= s ? "bg-black text-white" : "bg-gray-200 text-gray-400"
              }`}
            >
              {s}
            </div>
            {s < 3 && <div className={`h-0.5 w-12 ${step > s ? "bg-black" : "bg-gray-200"}`} />}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left: Controls */}
        <AnimatedSection>
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl">
          <h3 className="text-xl font-medium mb-6">Customize Your Design</h3>

          {/* Size Selector */}
          <div className="mb-8">
            <label className="block text-sm font-medium mb-3">Choose Size</label>
            <div className="grid grid-cols-3 gap-3">
              {sizes.map((size) => (
                <button
                  key={size.id}
                  onClick={() => setSelectedSize(size.id as any)}
                  className={`p-4 rounded-xl border-2 transition-all hover:scale-105 ${
                    selectedSize === size.id
                      ? "border-black bg-black text-white"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="text-sm font-medium">{size.name}</div>
                  <div className="text-xs opacity-70 mt-1">{size.dimensions}</div>
                  <div className="text-xs opacity-50 mt-1">{size.devices}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-6">
            <div className="flex gap-2 border-b border-gray-200">
              {[
                { id: "upload", label: "Upload Logo", icon: Upload },
                { id: "templates", label: "Templates", icon: Sparkles },
                { id: "patterns", label: "Patterns", icon: Target },
                { id: "colors", label: "Colors", icon: Eye },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? "border-b-2 border-black text-black"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="min-h-[300px]">
            {activeTab === "upload" && (
              <div>
                <label className="block text-sm font-medium mb-3">Upload Your Logo</label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-gray-400 transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="logo-upload"
                  />
                  <label htmlFor="logo-upload" className="cursor-pointer">
                    <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-sm text-gray-600 mb-2">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-400">PNG, JPG, SVG up to 10MB</p>
                  </label>
                </div>
                {uploadedLogo && (
                  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center justify-between">
                    <span className="text-sm text-green-800 flex items-center gap-2">
                      <Award className="h-4 w-4" />
                      Logo uploaded successfully
                    </span>
                    <button
                      onClick={() => setUploadedLogo(null)}
                      className="text-red-500 hover:text-red-700 text-xs"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === "templates" && (
              <div>
                <label className="block text-sm font-medium mb-3">Choose a Template</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {templates.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => {
                        setSelectedTemplate(template.id)
                        setUploadedLogo(null)
                        setSelectedPattern(null)
                      }}
                      className={`aspect-square rounded-xl overflow-hidden border-2 transition-all hover:scale-105 ${
                        selectedTemplate === template.id ? "border-black ring-2 ring-black" : "border-gray-200"
                      }`}
                      style={{ background: template.preview }}
                    >
                      <div className="h-full flex items-center justify-center bg-black/20 text-white text-sm font-medium">
                        {template.name}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "patterns" && (
              <div>
                <label className="block text-sm font-medium mb-3">Choose a Pattern</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {patterns.map((pattern) => (
                    <button
                      key={pattern.id}
                      onClick={() => {
                        setSelectedPattern(pattern.id)
                        setUploadedLogo(null)
                        setSelectedTemplate(null)
                      }}
                      className={`aspect-square rounded-xl border-2 transition-all hover:scale-105 flex items-center justify-center ${
                        selectedPattern === pattern.id ? "border-black ring-2 ring-black" : "border-gray-200"
                      }`}
                      style={{ backgroundColor: selectedColor + "20" }}
                    >
                      <svg width="60" height="60" viewBox="0 0 20 20" className="opacity-50">
                        <pattern id={`pattern-${pattern.id}`} width="20" height="20" patternUnits="userSpaceOnUse">
                          <path d={pattern.svg} stroke={selectedColor} strokeWidth="1" fill="none" />
                        </pattern>
                        <rect width="20" height="20" fill={`url(#pattern-${pattern.id})`} />
                      </svg>
                      <div className="absolute bottom-2 text-xs font-medium" style={{ color: selectedColor }}>
                        {pattern.name}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "colors" && (
              <div>
                <label className="block text-sm font-medium mb-3">Pick Your Brand Color</label>
                <div className="mb-6">
                  <div className="flex items-center gap-4">
                    <input
                      type="color"
                      value={selectedColor}
                      onChange={(e) => setSelectedColor(e.target.value)}
                      className="h-16 w-16 rounded-xl cursor-pointer border-2 border-gray-200"
                    />
                    <div>
                      <div className="text-sm font-medium">Selected Color</div>
                      <div className="text-xs text-gray-500 font-mono">{selectedColor}</div>
                    </div>
                  </div>
                </div>

                <label className="block text-sm font-medium mb-3">Popular Brand Colors</label>
                <div className="grid grid-cols-5 gap-3">
                  {colorPresets.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`aspect-square rounded-xl border-2 transition-all hover:scale-110 ${
                        selectedColor === color ? "border-black ring-2 ring-black" : "border-gray-200"
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          <Button className="w-full mt-8 bg-black text-white py-6 rounded-xl hover:bg-gray-800 hover:scale-105 transition-all duration-300">
            Get Instant Quote
          </Button>
        </div>
      </AnimatedSection>

      {/* Right: Live Preview */}
      <AnimatedSection delay={200}>
        <div className="sticky top-24">
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl">
            <h3 className="text-xl font-medium mb-6">Live Preview</h3>

            {/* Main Preview */}
            <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-12 mb-6 flex items-center justify-center min-h-[400px]">
              <div
                className="relative rounded-2xl shadow-2xl transition-all duration-500"
                style={{
                  width: `${180 * getSizeMultiplier()}px`,
                  height: `${180 * getSizeMultiplier()}px`,
                  backgroundColor: selectedColor,
                  background: selectedTemplate
                    ? templates.find((t) => t.id === selectedTemplate)?.preview
                    : selectedColor,
                }}
              >
                {uploadedLogo && (
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <img src={uploadedLogo} alt="Your logo" className="max-w-full max-h-full object-contain" />
                  </div>
                )}
                {selectedPattern && (
                  <div className="absolute inset-0 opacity-30">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <pattern
                          id={`preview-pattern-${selectedPattern}`}
                          width="40"
                          height="40"
                          patternUnits="userSpaceOnUse"
                        >
                          <path
                            d={patterns.find((p) => p.id === selectedPattern)?.svg}
                            stroke="white"
                            strokeWidth="2"
                            fill="none"
                          />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill={`url(#preview-pattern-${selectedPattern})`} />
                    </svg>
                  </div>
                )}
                {!uploadedLogo && !selectedTemplate && !selectedPattern && (
                  <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-light">
                    CBSC
                  </div>
                )}
                <div className="absolute -bottom-2 -right-2 bg-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                  {sizes.find((s) => s.id === selectedSize)?.dimensions}
                </div>
              </div>
            </div>

            {/* Customer Favorites */}
            <div>
              <label className="block text-sm font-medium mb-3 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-orange-500" />
                Customer Favorites
              </label>
              <div className="grid grid-cols-2 gap-3">
                {customerFavorites.map((fav) => (
                  <button
                    key={fav.id}
                    onClick={() => {
                      setSelectedColor(fav.color)
                      setSelectedTemplate(fav.id)
                    }}
                    className="p-3 border-2 border-gray-200 rounded-xl hover:border-gray-300 hover:scale-105 transition-all text-left"
                  >
                    <div
                      className="aspect-square rounded-lg mb-2 flex items-center justify-center text-white font-bold text-sm"
                      style={{ background: fav.color }}
                    >
                      {fav.name.split(' ')[0]}
                    </div>
                    <div className="text-xs font-medium">{fav.name}</div>
                    <div className="text-xs text-orange-500 mt-1">{fav.badge}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
      </div>
    </div>
  )
}

// Before/After Slider Component
function BeforeAfterSlider({ before, after, label }: { before: string; after: string; label: string }) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    setSliderPosition((x / rect.width) * 100)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons !== 1) return
    handleMove(e.clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX)
  }

  return (
    <div className="space-y-4">
      <div
        ref={containerRef}
        className="relative h-[250px] sm:h-[300px] md:h-[400px] rounded-xl overflow-hidden cursor-ew-resize select-none group"
        onMouseMove={handleMouseMove}
        onMouseDown={(e) => handleMove(e.clientX)}
        onTouchMove={handleTouchMove}
        onTouchStart={(e) => handleMove(e.touches[0].clientX)}
      >
        {/* After image (background) */}
        <Image
          src={after || "/placeholder.svg"}
          alt="After"
          fill
          className="object-cover"
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 33vw"
        />

        {/* Before image (clipped) */}
        <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}>
          <Image
            src={before || "/placeholder.svg"}
            alt="Before"
            fill
            className="object-cover"
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>

        {/* Slider handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
          style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform">
            <div className="flex gap-0.5">
              <ChevronLeft className="h-4 w-4 text-gray-600" />
              <ChevronRight className="h-4 w-4 text-gray-600" />
            </div>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute bottom-4 left-4 bg-black/70 text-white text-xs px-3 py-1 rounded-full">Before</div>
        <div className="absolute bottom-4 right-4 bg-white/90 text-black text-xs px-3 py-1 rounded-full">After</div>
      </div>
      <p className="text-center text-sm text-gray-600">{label}</p>
    </div>
  )
}

// Confetti Component
function Confetti() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 animate-confetti"
          style={{
            left: `${Math.random() * 100}%`,
            backgroundColor: ["#22d3ee", "#3b82f6", "#06b6d4", "#000"][Math.floor(Math.random() * 4)],
            animationDelay: `${Math.random() * 0.5}s`,
            animationDuration: `${1 + Math.random()}s`,
          }}
        />
      ))}
    </div>
  )
}
