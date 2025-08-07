"use client"

import { useState, useEffect } from "react"
import { Clock, Mail, Bell, Sparkles, Rocket, Zap } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface ComingSoonProps {
  title?: string
  description?: string
  launchDate?: Date
  showNotifyForm?: boolean
  className?: string
}

export function ComingSoon({
  title = "Amazing New Tool Coming Soon",
  description = "We're working hard to bring you something incredible. Get ready for the next generation of productivity tools.",
  launchDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
  showNotifyForm = true,
  className = "",
}: ComingSoonProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = launchDate.getTime() - now

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [launchDate])

  const handleNotifySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true)
      setIsLoading(false)
      setEmail("")
    }, 1500)
  }

  const floatingElements = Array.from({ length: 6 }, (_, i) => (
    <div
      key={i}
      className={`absolute opacity-20 animate-bounce`}
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 2}s`,
        animationDuration: `${3 + Math.random() * 2}s`,
      }}
    >
      {i % 3 === 0 ? (
        <Sparkles className="h-4 w-4 text-primary/30" />
      ) : i % 3 === 1 ? (
        <Zap className="h-3 w-3 text-cyan-400/30" />
      ) : (
        <div className="w-2 h-2 bg-gradient-to-r from-primary to-cyan-400 rounded-full" />
      )}
    </div>
  ))

  return (
    <div className={`relative min-h-[600px] flex items-center justify-center overflow-hidden ${className}`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,92,130,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(0,219,237,0.1),transparent_50%)]" />
      </div>

      {/* Floating Elements */}
      {floatingElements}

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        {/* Icon */}
        <div className="mb-8 relative">
          <div className="gradient-bg w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Rocket className="h-12 w-12 text-white" />
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
            <Sparkles className="h-3 w-3 text-yellow-800" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text animate-in slide-in-from-bottom-4 duration-1000">
          {title}
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto animate-in slide-in-from-bottom-4 duration-1000 delay-200">
          {description}
        </p>

        {/* Countdown Timer */}
        <div className="mb-12 animate-in slide-in-from-bottom-4 duration-1000 delay-400">
          <div className="flex items-center justify-center mb-4">
            <Clock className="h-5 w-5 text-primary mr-2" />
            <span className="text-sm font-medium text-muted-foreground">Launching in</span>
          </div>
          
          <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
            {[
              { label: "Days", value: timeLeft.days },
              { label: "Hours", value: timeLeft.hours },
              { label: "Minutes", value: timeLeft.minutes },
              { label: "Seconds", value: timeLeft.seconds },
            ].map((item, index) => (
              <div
                key={item.label}
                className="bg-card border rounded-lg p-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-2xl md:text-3xl font-bold gradient-text mb-1">
                  {item.value.toString().padStart(2, "0")}
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notify Form */}
        {showNotifyForm && (
          <div className="animate-in slide-in-from-bottom-4 duration-1000 delay-600">
            {!isSubscribed ? (
              <div className="bg-card/50 backdrop-blur border rounded-2xl p-8 max-w-md mx-auto">
                <div className="flex items-center justify-center mb-4">
                  <Bell className="h-5 w-5 text-primary mr-2" />
                  <span className="font-medium">Get Notified</span>
                </div>
                
                <p className="text-sm text-muted-foreground mb-6">
                  Be the first to know when we launch. No spam, just updates.
                </p>

                <form onSubmit={handleNotifySubmit} className="space-y-4">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="text-center"
                    required
                  />
                  
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full gradient-bg text-white hover:opacity-90 transition-opacity"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                        Subscribing...
                      </div>
                    ) : (
                      "Notify Me"
                    )}
                  </Button>
                </form>
              </div>
            ) : (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-8 max-w-md mx-auto">
                <div className="text-4xl mb-4">🎉</div>
                <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
                  You're all set!
                </h3>
                <p className="text-sm text-green-600 dark:text-green-300">
                  We'll send you an email as soon as we launch. Thanks for your interest!
                </p>
              </div>
            )}
          </div>
        )}

        {/* Features Preview */}
        <div className="mt-16 animate-in slide-in-from-bottom-4 duration-1000 delay-800">
          <h3 className="text-xl font-semibold mb-8">What to Expect</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Optimized for speed and performance",
              },
              {
                icon: Sparkles,
                title: "Beautiful Design",
                description: "Clean, modern, and intuitive interface",
              },
              {
                icon: Rocket,
                title: "Powerful Features",
                description: "Advanced functionality you'll love",
              },
            ].map((feature, index) => (
              <div
                key={feature.title}
                className="text-center p-6 rounded-lg hover:bg-muted/50 transition-colors duration-300"
                style={{ animationDelay: `${800 + index * 200}ms` }}
              >
                <div className="gradient-bg w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold mb-2">{feature.title}</h4>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Animated Border */}
      <div className="absolute inset-0 rounded-lg">
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary via-cyan-400 to-primary opacity-20 animate-pulse" />
      </div>
    </div>
  )
}
