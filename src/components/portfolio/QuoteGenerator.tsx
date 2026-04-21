'use client'

import { useState, useRef, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Sparkles, RefreshCw, Copy, Check } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface Quote {
  text: string
  source: string
  emoji: string
  type: 'islamic' | 'motivational'
}

const quotes: Quote[] = [
  // ── Islamic Quotes (50) ──
  { text: 'Trust Allah, but tie your camel first.', source: 'Prophet Muhammad ﷺ (Tirmidhi)', emoji: '🐪', type: 'islamic' },
  { text: 'The best among you are those who have the best manners and character.', source: 'Prophet Muhammad ﷺ (Bukhari)', emoji: '⭐', type: 'islamic' },
  { text: 'Verily, with hardship comes ease.', source: 'Quran 94:6', emoji: '🌸', type: 'islamic' },
  { text: 'And whoever relies upon Allah — then He is sufficient for him.', source: 'Quran 65:3', emoji: '🤲', type: 'islamic' },
  { text: 'The world is a prison for the believer and a paradise for the disbeliever.', source: 'Prophet Muhammad ﷺ (Muslim)', emoji: '🔒', type: 'islamic' },
  { text: 'Knowledge is a treasure that follows its owner everywhere.', source: 'Prophet Muhammad ﷺ (Tirmidhi)', emoji: '📚', type: 'islamic' },
  { text: 'Do not lose hope, nor be sad.', source: 'Quran 3:139', emoji: '🌅', type: 'islamic' },
  { text: 'The strong man is not the one who can overpower others. The strong man is the one who controls himself when he is angry.', source: 'Prophet Muhammad ﷺ (Bukhari)', emoji: '💪', type: 'islamic' },
  { text: 'Read! In the name of your Lord who created.', source: 'Quran 96:1', emoji: '📖', type: 'islamic' },
  { text: 'Paradise lies at the feet of mothers.', source: 'Prophet Muhammad ﷺ (Nasai)', emoji: '👩‍👧', type: 'islamic' },
  { text: 'The most complete of the believers in faith is the one with the best character.', source: 'Prophet Muhammad ﷺ (Tirmidhi)', emoji: '💎', type: 'islamic' },
  { text: 'Whoever believes in Allah and the Last Day, let him speak good or remain silent.', source: 'Prophet Muhammad ﷺ (Bukhari)', emoji: '🤫', type: 'islamic' },
  { text: 'Allah does not burden a soul beyond that it can bear.', source: 'Quran 2:286', emoji: '🏔️', type: 'islamic' },
  { text: 'Be in this world as if you were a stranger or a traveler.', source: 'Prophet Muhammad ﷺ (Bukhari)', emoji: '🧳', type: 'islamic' },
  { text: 'The reward of deeds depends upon the intentions, and every person will get the reward according to what he has intended.', source: 'Prophet Muhammad ﷺ (Bukhari)', emoji: '🎯', type: 'islamic' },
  { text: 'Make things easy and do not make them difficult. Give glad tidings and do not drive people away.', source: 'Prophet Muhammad ﷺ (Bukhari)', emoji: '🕊️', type: 'islamic' },
  { text: 'The best charity is that given in Ramadan.', source: 'Prophet Muhammad ﷺ (Tirmidhi)', emoji: '🌙', type: 'islamic' },
  { text: 'None of you truly believes until he loves for his brother what he loves for himself.', source: 'Prophet Muhammad ﷺ (Bukhari)', emoji: '🤝', type: 'islamic' },
  { text: 'Patience is the key to relief.', source: 'Prophet Muhammad ﷺ', emoji: '🗝️', type: 'islamic' },
  { text: 'Whoever is grateful, truly his gratitude is for himself.', source: 'Quran 31:12', emoji: '🙏', type: 'islamic' },
  { text: 'Indeed, Allah does not change the condition of a people until they change what is within themselves.', source: 'Quran 13:11', emoji: '🔄', type: 'islamic' },
  { text: 'And He found you lost and guided you.', source: 'Quran 93:7', emoji: '🌟', type: 'islamic' },
  { text: 'So remember Me; I will remember you.', source: 'Quran 2:152', emoji: '✨', type: 'islamic' },
  { text: 'My mercy encompasses all things.', source: 'Quran 7:156', emoji: '💫', type: 'islamic' },
  { text: 'He who does not thank people, does not thank Allah.', source: 'Prophet Muhammad ﷺ (Abu Dawud)', emoji: '💝', type: 'islamic' },
  { text: 'The Prophet ﷺ was asked: Which deed is most beloved to Allah? He replied: The most consistent, even if it is small.', source: 'Prophet Muhammad ﷺ (Bukhari)', emoji: '🌱', type: 'islamic' },
  { text: 'He who walks to the mosque, Allah records for him a good deed at every step.', source: 'Prophet Muhammad ﷺ (Muslim)', emoji: '🕌', type: 'islamic' },
  { text: 'Actions are judged by intentions, and everyone will be rewarded according to their intention.', source: 'Prophet Muhammad ﷺ (Bukhari)', emoji: '💠', type: 'islamic' },
  { text: 'And when My servants ask you concerning Me, indeed I am near.', source: 'Quran 2:186', emoji: '🕊️', type: 'islamic' },
  { text: 'If you are grateful, I will surely increase your favor.', source: 'Quran 14:7', emoji: '📈', type: 'islamic' },
  { text: 'The believer does not slander, curse, or speak in an obscene or foul manner.', source: 'Prophet Muhammad ﷺ (Tirmidhi)', emoji: '🗣️', type: 'islamic' },
  { text: 'Richness does not lie in the abundance of worldly goods, but richness is the richness of the soul.', source: 'Prophet Muhammad ﷺ (Bukhari)', emoji: '💚', type: 'islamic' },
  { text: 'A person will be with those whom he loves.', source: 'Prophet Muhammad ﷺ (Bukhari)', emoji: '❤️', type: 'islamic' },
  { text: 'The most beloved deed to Allah is the one done regularly, even if it is small.', source: 'Prophet Muhammad ﷺ (Bukhari)', emoji: '♻️', type: 'islamic' },
  { text: 'Forgive those who have wronged you, not because they deserve forgiveness, but because you deserve peace.', source: 'Islamic Wisdom', emoji: '🕊️', type: 'islamic' },
  { text: 'In the middle of difficulty lies opportunity.', source: 'Islamic Wisdom', emoji: '🔑', type: 'islamic' },
  { text: 'Speak good or remain silent — words are like arrows, once released they cannot be returned.', source: 'Prophet Muhammad ﷺ', emoji: '🏹', type: 'islamic' },
  { text: 'Seek knowledge from the cradle to the grave.', source: 'Prophet Muhammad ﷺ', emoji: '🎓', type: 'islamic' },
  { text: 'The heart that beats for Allah is always a stranger among the hearts that beat for the world.', source: 'Islamic Wisdom', emoji: '🫀', type: 'islamic' },
  { text: 'Every soul shall taste death, and you will be paid in full only on the Day of Resurrection.', source: 'Quran 3:185', emoji: '🍂', type: 'islamic' },
  { text: 'O you who have believed, seek help through patience and prayer.', source: 'Quran 2:153', emoji: '🤲', type: 'islamic' },
  { text: 'Hurt no one so that no one may hurt you.', source: 'Prophet Muhammad ﷺ (Farewell Sermon)', emoji: '🛡️', type: 'islamic' },
  { text: 'The best of people are those that bring most benefit to the rest of mankind.', source: 'Prophet Muhammad ﷺ (Daraqutni)', emoji: '🌍', type: 'islamic' },
  { text: 'Allah is with the patient.', source: 'Quran 2:153', emoji: '⏳', type: 'islamic' },
  { text: 'Do not belittle any good deed, even meeting your brother with a cheerful face.', source: 'Prophet Muhammad ﷺ (Muslim)', emoji: '😊', type: 'islamic' },
  { text: 'The greatest Jihad is to battle your own soul, to fight the evil within yourself.', source: 'Prophet Muhammad ﷺ', emoji: '⚔️', type: 'islamic' },
  { text: 'Tie your camel first, then put your trust in Allah.', source: 'Prophet Muhammad ﷺ (Tirmidhi)', emoji: '🐫', type: 'islamic' },
  { text: 'A Muslim is the one from whose tongue and hands other Muslims are safe.', source: 'Prophet Muhammad ﷺ (Bukhari)', emoji: '🛡️', type: 'islamic' },
  { text: 'What is destined will reach you, even if it be underneath two mountains. What is not destined, will not reach you, even if it be between your two lips.', source: 'Prophet Muhammad ﷺ', emoji: '⛰️', type: 'islamic' },
  { text: 'May Allah have mercy on a person who is gentle when he sells, when he buys, and when he makes a claim.', source: 'Prophet Muhammad ﷺ (Bukhari)', emoji: '🤲', type: 'islamic' },
  { text: 'The worst among people is the one who is two-faced; he comes to some people with one face and to others with another.', source: 'Prophet Muhammad ﷺ (Bukhari)', emoji: '🎭', type: 'islamic' },

  // ── Motivational Quotes (50) ──
  { text: "Your eyes didn't kill me... your smile finished the job.", source: 'Motivational', emoji: '💀', type: 'motivational' },
  { text: "I'm not rude, I'm just honest. You can't handle both.", source: 'Motivational', emoji: '😏', type: 'motivational' },
  { text: "My silence is not weakness. It's the beginning of my revenge.", source: 'Motivational', emoji: '🖤', type: 'motivational' },
  { text: "I don't have an attitude problem. You have a perception problem.", source: 'Motivational', emoji: '🔥', type: 'motivational' },
  { text: "You're the reason I believe in love at first sight... then I look again and change my mind.", source: 'Motivational', emoji: '😂', type: 'motivational' },
  { text: "If looks could kill, you'd be a weapon of mass destruction.", source: 'Motivational', emoji: '💣', type: 'motivational' },
  { text: "I'm not ignoring you. I'm just giving you time to realize your mistake.", source: 'Motivational', emoji: '🦅', type: 'motivational' },
  { text: "I'm not a player, I just crush a lot... of code.", source: 'Motivational', emoji: '💻', type: 'motivational' },
  { text: "If being hot was a crime, you'd get a life sentence.", source: 'Motivational', emoji: '🔥', type: 'motivational' },
  { text: "I don't need your approval. My mirror tells me I'm fine.", source: 'Motivational', emoji: '🪞', type: 'motivational' },
  { text: "You're like a software update — every time I see you, something gets better.", source: 'Motivational', emoji: '🔄', type: 'motivational' },
  { text: "I'd agree with you but then we'd both be wrong.", source: 'Motivational', emoji: '💀', type: 'motivational' },
  { text: "You're the WiFi to my heart — always connected, never dropping signals.", source: 'Motivational', emoji: '📶', type: 'motivational' },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", source: 'Winston Churchill', emoji: '🏆', type: 'motivational' },
  { text: "The only way to do great work is to love what you do.", source: 'Steve Jobs', emoji: '💼', type: 'motivational' },
  { text: "Innovation distinguishes between a leader and a follower.", source: 'Steve Jobs', emoji: '🚀', type: 'motivational' },
  { text: "The future belongs to those who believe in the beauty of their dreams.", source: 'Eleanor Roosevelt', emoji: '✨', type: 'motivational' },
  { text: "It does not matter how slowly you go as long as you do not stop.", source: 'Confucius', emoji: '🐢', type: 'motivational' },
  { text: "Believe you can and you're halfway there.", source: 'Theodore Roosevelt', emoji: '🌟', type: 'motivational' },
  { text: "The best time to plant a tree was 20 years ago. The second best time is now.", source: 'Chinese Proverb', emoji: '🌳', type: 'motivational' },
  { text: "Your limitation — it's only your imagination.", source: 'Motivational', emoji: '🧠', type: 'motivational' },
  { text: "Push yourself, because no one else is going to do it for you.", source: 'Motivational', emoji: '💪', type: 'motivational' },
  { text: "Great things never come from comfort zones.", source: 'Motivational', emoji: '⛰️', type: 'motivational' },
  { text: "Dream it. Wish it. Do it.", source: 'Motivational', emoji: '🎯', type: 'motivational' },
  { text: "Don't stop when you're tired. Stop when you're done.", source: 'Motivational', emoji: '🏁', type: 'motivational' },
  { text: "Wake up with determination. Go to bed with satisfaction.", source: 'Motivational', emoji: '🌅', type: 'motivational' },
  { text: "Do something today that your future self will thank you for.", source: 'Sean Patrick Flanery', emoji: '🙏', type: 'motivational' },
  { text: "Little things make big days.", source: 'Motivational', emoji: '✨', type: 'motivational' },
  { text: "It's going to be hard, but hard does not mean impossible.", source: 'Motivational', emoji: '💪', type: 'motivational' },
  { text: "The harder you work for something, the greater you'll feel when you achieve it.", source: 'Motivational', emoji: '🏅', type: 'motivational' },
  { text: "Don't wait for opportunity. Create it.", source: 'George Bernard Shaw', emoji: '🔨', type: 'motivational' },
  { text: "Stay foolish, stay hungry.", source: 'Steve Jobs', emoji: '🎯', type: 'motivational' },
  { text: "Code is like humor. When you have to explain it, it's bad.", source: 'Cory House', emoji: '😄', type: 'motivational' },
  { text: "First, solve the problem. Then, write the code.", source: 'John Johnson', emoji: '🔧', type: 'motivational' },
  { text: "Talk is cheap. Show me the code.", source: 'Linus Torvalds', emoji: '💻', type: 'motivational' },
  { text: "The best error message is the one that never shows up.", source: 'Thomas Fuchs', emoji: '🚫', type: 'motivational' },
  { text: "Programming is not about typing, it's about thinking.", source: 'Rich Hickey', emoji: '🧠', type: 'motivational' },
  { text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.", source: 'Martin Fowler', emoji: '👤', type: 'motivational' },
  { text: "The only way to learn a new programming language is by writing programs in it.", source: 'Dennis Ritchie', emoji: '📚', type: 'motivational' },
  { text: "Simplicity is the soul of efficiency.", source: 'Austin Freeman', emoji: '⚡', type: 'motivational' },
  { text: "Data is the new oil. It's valuable, but if unrefined it cannot really be used.", source: 'Clive Humby', emoji: '🛢️', type: 'motivational' },
  { text: "Without data, you're just another person with an opinion.", source: 'W. Edwards Deming', emoji: '📊', type: 'motivational' },
  { text: "The goal is to turn data into information, and information into insight.", source: 'Carly Fiorina', emoji: '💡', type: 'motivational' },
  { text: "In God we trust. All others must bring data.", source: 'W. Edwards Deming', emoji: '📈', type: 'motivational' },
  { text: "AI is the new electricity.", source: 'Andrew Ng', emoji: '⚡', type: 'motivational' },
  { text: "The development of full artificial intelligence could spell the end of the human race.", source: 'Stephen Hawking', emoji: '🤖', type: 'motivational' },
  { text: "Machine learning is the science of getting computers to learn and act like humans do.", source: 'Arthur Samuel', emoji: '🧪', type: 'motivational' },
  { text: "Your network is your net worth.", source: 'Porter Gale', emoji: '🌐', type: 'motivational' },
  { text: "The expert in anything was once a beginner.", source: 'Helen Hayes', emoji: '🌱', type: 'motivational' },
  { text: "A year from now you may wish you had started today.", source: 'Karen Lamb', emoji: '📅', type: 'motivational' },
]

function getQuoteOfTheDay(): Quote {
  const today = new Date()
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate()
  return quotes[seed % quotes.length]
}

function getRandomQuote(excludeIndex: number): { quote: Quote; index: number } {
  let newIndex: number
  do {
    newIndex = Math.floor(Math.random() * quotes.length)
  } while (newIndex === excludeIndex && quotes.length > 1)
  return { quote: quotes[newIndex], index: newIndex }
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      const el = document.createElement('textarea')
      el.value = text
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }, [text])

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleCopy}
          className="h-7 w-7 text-muted-foreground hover:text-[#c2a4ff] shrink-0"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="top">
        <p>{copied ? '✅ Copied!' : '📋 Copy quote'}</p>
      </TooltipContent>
    </Tooltip>
  )
}

export default function QuoteGenerator() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const quoteOfTheDay = getQuoteOfTheDay()
  const qotdIndex = quotes.indexOf(quoteOfTheDay)

  const [displayedQuote, setDisplayedQuote] = useState(quoteOfTheDay)
  const [displayedIndex, setDisplayedIndex] = useState(qotdIndex)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleNewQuote = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    const { quote, index } = getRandomQuote(displayedIndex)
    setDisplayedQuote(quote)
    setDisplayedIndex(index)
    setTimeout(() => setIsAnimating(false), 400)
  }, [displayedIndex, isAnimating])

  const isIslamic = displayedQuote.type === 'islamic'

  return (
    <section id="quotes" ref={ref} className="relative py-20 sm:py-28">
      <div className="absolute inset-0 dot-pattern opacity-10" />
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="gradient-text-purple">✨ Get a Quote</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            📿 A curated mix of Islamic wisdom &amp; motivational power — tap to discover your next dose of inspiration.
          </p>
        </motion.div>

        {/* Quote Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-4 justify-center">
            <Sparkles className="w-5 h-5 text-[#c2a4ff]" />
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#c2a4ff]">
              ✨ Quote of the Day
            </h3>
            <Sparkles className="w-5 h-5 text-[#c2a4ff]" />
          </div>

          <div className="relative overflow-hidden max-w-2xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={displayedIndex}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              >
                <Card
                  className="relative overflow-hidden p-8 sm:p-10 text-center"
                  style={{
                    background: isIslamic
                      ? 'linear-gradient(135deg, rgba(217,119,6,0.08) 0%, rgba(180,83,9,0.05) 50%, rgba(217,119,6,0.08) 100%)'
                      : 'linear-gradient(135deg, rgba(194,164,255,0.08) 0%, rgba(168,85,247,0.05) 50%, rgba(194,164,255,0.08) 100%)',
                    backdropFilter: 'blur(20px)',
                    border: isIslamic
                      ? '1px solid rgba(217,119,6,0.25)'
                      : '1px solid rgba(194,164,255,0.2)',
                    boxShadow: isIslamic
                      ? '0 0 30px rgba(217,119,6,0.08), 0 0 60px rgba(217,119,6,0.03)'
                      : '0 0 30px rgba(194,164,255,0.1), 0 0 60px rgba(194,164,255,0.05)',
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#c2a4ff]/5 via-transparent to-[#c2a4ff]/5" />
                  <div className="relative z-10">
                    <span className="text-5xl mb-5 block">{displayedQuote.emoji}</span>
                    <p className="text-lg sm:text-xl font-semibold text-foreground leading-relaxed mb-3 italic">
                      &ldquo;{displayedQuote.text}&rdquo;
                    </p>
                    <p className={`text-sm mb-4 ${isIslamic ? 'text-amber-400/80' : 'text-[#c2a4ff]/70'}`}>
                      — {displayedQuote.source}
                    </p>
                    <div className="flex items-center justify-center gap-3">
                      <Badge
                        variant="outline"
                        className={isIslamic
                          ? 'border-amber-500/30 text-amber-400 bg-amber-500/10'
                          : 'border-[#c2a4ff]/30 text-[#c2a4ff] bg-[#c2a4ff]/10'
                        }
                      >
                        {isIslamic ? '🕌 Islamic Wisdom' : '🔥 Motivational'}
                      </Badge>
                      <CopyButton text={`"${displayedQuote.text}" — ${displayedQuote.source}`} />
                    </div>
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Generate New Quote Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-col items-center gap-3"
        >
          <Button
            onClick={handleNewQuote}
            disabled={isAnimating}
            variant="outline"
            className="gap-2 border-[#c2a4ff]/30 text-[#c2a4ff] hover:bg-[#c2a4ff]/10 hover:text-[#d4bfff]"
          >
            <RefreshCw className={`w-4 h-4 ${isAnimating ? 'animate-spin' : ''}`} />
            ✨ Get a New Quote
          </Button>
          <span className="text-xs text-muted-foreground/50">
            Tap to discover another quote 🎯
          </span>
        </motion.div>
      </div>
    </section>
  )
}
