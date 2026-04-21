'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Play, Clock, CheckCircle, XCircle, Trophy, RotateCcw, Zap } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

interface Question {
  id: number
  question: string
  options: string[]
  correct: number
  domain: string
}

const questions: Question[] = [
  // ── SQL (10 questions) ──
  { id: 1, question: 'Which SQL command is used to retrieve data from a database?', options: ['GET', 'FETCH', 'SELECT', 'RETRIEVE'], correct: 2, domain: 'SQL' },
  { id: 2, question: 'What does the WHERE clause do in a SQL query?', options: ['Sorts the result', 'Filters records', 'Groups records', 'Joins tables'], correct: 1, domain: 'SQL' },
  { id: 3, question: 'Which keyword is used to remove duplicate values from a result set?', options: ['UNIQUE', 'DISTINCT', 'DIFFERENT', 'SINGLE'], correct: 1, domain: 'SQL' },
  { id: 4, question: 'What is the purpose of a JOIN in SQL?', options: ['Delete data', 'Combine rows from multiple tables', 'Create a new table', 'Filter data'], correct: 1, domain: 'SQL' },
  { id: 5, question: 'Which aggregate function returns the number of rows?', options: ['SUM()', 'AVG()', 'COUNT()', 'MAX()'], correct: 2, domain: 'SQL' },
  { id: 6, question: 'What does GROUP BY do?', options: ['Sorts rows', 'Groups rows with same values', 'Filters groups', 'Joins groups'], correct: 1, domain: 'SQL' },
  { id: 7, question: 'Which SQL keyword is used to sort results?', options: ['SORT BY', 'ORDER BY', 'ARRANGE BY', 'GROUP BY'], correct: 1, domain: 'SQL' },
  { id: 8, question: 'What is a primary key?', options: ['A random identifier', 'Unique identifier for each row', 'A foreign key', 'An index key'], correct: 1, domain: 'SQL' },
  { id: 9, question: 'Which clause filters groups after aggregation?', options: ['WHERE', 'FILTER', 'HAVING', 'THEN'], correct: 2, domain: 'SQL' },
  { id: 10, question: 'What does HAVING clause filter?', options: ['Individual rows', 'Grouped results', 'Columns', 'Tables'], correct: 1, domain: 'SQL' },

  // ── Machine Learning (10 questions) ──
  { id: 11, question: 'Which algorithm is used for classification tasks?', options: ['Linear Regression', 'K-Means', 'Random Forest', 'PCA'], correct: 2, domain: 'Machine Learning' },
  { id: 12, question: 'What is overfitting in machine learning?', options: ['Model performs well on new data', 'Model memorizes training data', 'Model is too simple', 'Model trains too fast'], correct: 1, domain: 'Machine Learning' },
  { id: 13, question: 'Which technique is used to prevent overfitting?', options: ['Adding more features', 'Regularization', 'Increasing model size', 'Removing validation data'], correct: 1, domain: 'Machine Learning' },
  { id: 14, question: 'What is the purpose of cross-validation?', options: ['Train faster', 'Evaluate model generalization', 'Clean data', 'Feature selection'], correct: 1, domain: 'Machine Learning' },
  { id: 15, question: 'Which metric measures classification accuracy for imbalanced datasets?', options: ['Accuracy', 'F1 Score', 'Mean Error', 'R-Squared'], correct: 1, domain: 'Machine Learning' },
  { id: 16, question: 'What is a confusion matrix?', options: ['A data storage matrix', 'Performance evaluation table', 'Neural network layer', 'Feature matrix'], correct: 1, domain: 'Machine Learning' },
  { id: 17, question: 'Which algorithm finds optimal decision boundaries?', options: ['KNN', 'Support Vector Machine', 'Naive Bayes', 'Linear Regression'], correct: 1, domain: 'Machine Learning' },
  { id: 18, question: 'What does gradient descent optimize?', options: ['Data points', 'Loss function', 'Feature space', 'Network topology'], correct: 1, domain: 'Machine Learning' },
  { id: 19, question: 'Which is an unsupervised learning algorithm?', options: ['Logistic Regression', 'Decision Tree', 'K-Means Clustering', 'SVM'], correct: 2, domain: 'Machine Learning' },
  { id: 20, question: 'What is the bias-variance tradeoff?', options: ['Speed vs accuracy', 'Underfitting vs overfitting', 'Training vs testing', 'Features vs labels'], correct: 1, domain: 'Machine Learning' },

  // ── Data Science (10 questions) ──
  { id: 21, question: 'What is the most common measure of central tendency?', options: ['Median', 'Mode', 'Mean', 'Range'], correct: 2, domain: 'Data Science' },
  { id: 22, question: 'Which Python library is primarily used for data manipulation?', options: ['NumPy', 'Pandas', 'Matplotlib', 'Scikit-learn'], correct: 1, domain: 'Data Science' },
  { id: 23, question: 'What does a box plot show?', options: ['Only mean', 'Distribution through quartiles', 'Only outliers', 'Correlation'], correct: 1, domain: 'Data Science' },
  { id: 24, question: 'What is correlation?', options: ['Causation between variables', 'Statistical relationship between variables', 'Difference between variables', 'Distance between variables'], correct: 1, domain: 'Data Science' },
  { id: 25, question: 'Which plot shows the distribution of a single variable?', options: ['Scatter plot', 'Histogram', 'Line chart', 'Pie chart'], correct: 1, domain: 'Data Science' },
  { id: 26, question: 'What is EDA in data science?', options: ['External Data Analysis', 'Exploratory Data Analysis', 'Estimated Data Array', 'Extended Data Architecture'], correct: 1, domain: 'Data Science' },
  { id: 27, question: 'What is standard deviation a measure of?', options: ['Central tendency', 'Data spread', 'Skewness', 'Correlation'], correct: 1, domain: 'Data Science' },
  { id: 28, question: 'Which metric measures the quality of regression models?', options: ['Accuracy', 'R-squared', 'F1 Score', 'Precision'], correct: 1, domain: 'Data Science' },
  { id: 29, question: 'What is a p-value in statistics?', options: ['Population value', 'Probability of null hypothesis being true', 'Parameter value', 'Prediction value'], correct: 1, domain: 'Data Science' },
  { id: 30, question: 'Which technique handles missing data?', options: ['Feature scaling', 'Imputation', 'Normalization', 'Encoding'], correct: 1, domain: 'Data Science' },

  // ── Deep Learning (10 questions) ──
  { id: 31, question: 'What is the activation function ReLU?', options: ['1/(1+e^-x)', 'max(0, x)', 'x^2', 'tanh(x)'], correct: 1, domain: 'Deep Learning' },
  { id: 32, question: 'Which framework is popular for building neural networks?', options: ['Django', 'PyTorch', 'Flask', 'BeautifulSoup'], correct: 1, domain: 'Deep Learning' },
  { id: 33, question: 'What is a neural network epoch?', options: ['One layer forward pass', 'Complete pass through training data', 'One weight update', 'One batch of data'], correct: 1, domain: 'Deep Learning' },
  { id: 34, question: 'What problem does dropout solve?', options: ['Slow training', 'Overfitting', 'Data cleaning', 'Feature selection'], correct: 1, domain: 'Deep Learning' },
  { id: 35, question: 'Which network architecture is best for image classification?', options: ['RNN', 'CNN', 'GAN', 'Autoencoder'], correct: 1, domain: 'Deep Learning' },
  { id: 36, question: 'What is backpropagation?', options: ['Forward data flow', 'Algorithm for computing gradients', 'Data preprocessing', 'Model evaluation'], correct: 1, domain: 'Deep Learning' },
  { id: 37, question: 'What is transfer learning?', options: ['Moving data between systems', 'Using pre-trained model for new task', 'Transferring code between projects', 'Data migration technique'], correct: 1, domain: 'Deep Learning' },
  { id: 38, question: 'Which optimizer adaptively adjusts learning rates?', options: ['SGD', 'Adam', 'Batch Gradient', 'None'], correct: 1, domain: 'Deep Learning' },
  { id: 39, question: 'What is a batch in deep learning training?', options: ['Entire dataset', 'Subset of training data', 'Single data point', 'Test data'], correct: 1, domain: 'Deep Learning' },
  { id: 40, question: 'What is the vanishing gradient problem?', options: ['Gradients become too large', 'Gradients become very small in deep networks', 'Loss becomes zero', 'Data disappears'], correct: 1, domain: 'Deep Learning' },
]

const domains = ['SQL', 'Machine Learning', 'Data Science', 'Deep Learning']
const questionsPerDomain = 10
const totalQuestions = 40

const domainColors: Record<string, string> = {
  'SQL': 'border-cyan-500/30 text-cyan-400 bg-cyan-500/10',
  'Machine Learning': 'border-[#c2a4ff]/30 text-[#c2a4ff] bg-[#c2a4ff]/10',
  'Data Science': 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10',
  'Deep Learning': 'border-pink-500/30 text-pink-400 bg-pink-500/10',
}

type QuizState = 'idle' | 'playing' | 'finished'

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export default function QuizSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const [quizState, setQuizState] = useState<QuizState>('idle')
  const [currentQ, setCurrentQ] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([])
  const [selectedDomain, setSelectedDomain] = useState<string | 'all'>('all')

  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const startQuiz = useCallback((domain: string | 'all') => {
    setSelectedDomain(domain)
    let filtered = domain === 'all' ? [...questions] : questions.filter(q => q.domain === domain)
    const shuffled = shuffleArray(filtered)
    setQuizQuestions(shuffled)
    setCurrentQ(0)
    setScore(0)
    setCorrectAnswers(0)
    setSelectedAnswer(null)
    setAnswered(false)
    setTimeLeft(30)
    setQuizState('playing')
  }, [])

  useEffect(() => {
    if (quizState === 'playing' && !answered) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setAnswered(true)
            clearInterval(timerRef.current!)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [quizState, answered, currentQ])

  const handleAnswer = useCallback((index: number) => {
    if (answered) return
    setSelectedAnswer(index)
    setAnswered(true)
    if (timerRef.current) clearInterval(timerRef.current)

    if (index === quizQuestions[currentQ].correct) {
      setScore(prev => prev + 1)
      setCorrectAnswers(prev => prev + 1)
    }
  }, [answered, quizQuestions, currentQ])

  const nextQuestion = useCallback(() => {
    if (currentQ + 1 >= quizQuestions.length) {
      setQuizState('finished')
    } else {
      setCurrentQ(prev => prev + 1)
      setSelectedAnswer(null)
      setAnswered(false)
      setTimeLeft(30)
    }
  }, [currentQ, quizQuestions.length])

  const percentage = quizQuestions.length > 0 ? Math.round((correctAnswers / (currentQ + (quizState === 'finished' ? 0 : 1))) * 100) : 0
  const finalPercentage = quizQuestions.length > 0 ? Math.round((correctAnswers / quizQuestions.length) * 100) : 0

  return (
    <section id="quiz" ref={ref} className="relative py-20 sm:py-28">
      <div className="absolute inset-0 grid-pattern opacity-40" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="gradient-text-purple">🧠 Tech Quiz Challenge</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Test your knowledge across {domains.length} domains — SQL, Machine Learning, Data Science &amp; Deep Learning!
          </p>
        </motion.div>

        {/* Idle State - Domain Selection */}
        {quizState === 'idle' && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <Card className="glass p-8 sm:p-10">
              <h3 className="text-xl font-bold text-[#eae5ec] text-center mb-6">Choose Your Domain</h3>
              <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
                <button onClick={() => startQuiz('all')} className="glass corner-borders p-4 rounded-lg text-center transition-all duration-300 hover:border-[#c2a4ff]/40 hover:bg-[#c2a4ff]/5">
                  <span className="text-2xl block mb-2">🎯</span>
                  <span className="font-semibold text-[#eae5ec] block">All Domains</span>
                  <span className="text-xs text-[#8b8498]">40 Questions</span>
                </button>
                {domains.map(d => (
                  <button key={d} onClick={() => startQuiz(d)} className="glass corner-borders p-4 rounded-lg text-center transition-all duration-300 hover:border-[#c2a4ff]/40 hover:bg-[#c2a4ff]/5">
                    <span className="text-2xl block mb-2">{d === 'SQL' ? '🗃️' : d === 'Machine Learning' ? '🤖' : d === 'Data Science' ? '📊' : '🧠'}</span>
                    <span className="font-semibold text-[#eae5ec] block text-sm">{d}</span>
                    <span className="text-xs text-[#8b8498]">10 Questions</span>
                  </button>
                ))}
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-[#8b8498]">
                <Clock className="w-4 h-4" />
                <span>30 seconds per question</span>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Playing State */}
        {quizState === 'playing' && quizQuestions[currentQ] && (
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            key={currentQ}
            className="max-w-2xl mx-auto"
          >
            <Card className="glass p-6 sm:p-8">
              {/* Progress bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[#8b8498]">Question {currentQ + 1} of {quizQuestions.length}</span>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className={domainColors[quizQuestions[currentQ].domain]}>
                      {quizQuestions[currentQ].domain}
                    </Badge>
                    <div className={`flex items-center gap-1 text-sm ${timeLeft <= 10 ? 'text-red-400' : 'text-[#c2a4ff]'}`}>
                      <Clock className="w-4 h-4" />
                      <span className="font-mono">{timeLeft}s</span>
                    </div>
                  </div>
                </div>
                <Progress value={((currentQ + 1) / quizQuestions.length) * 100} className="h-1.5" />
              </div>

              {/* Question */}
              <h3 className="text-lg sm:text-xl font-semibold text-[#eae5ec] mb-6 leading-relaxed">
                {quizQuestions[currentQ].question}
              </h3>

              {/* Options */}
              <div className="grid gap-3 mb-6">
                {quizQuestions[currentQ].options.map((option, i) => {
                  const isCorrect = i === quizQuestions[currentQ].correct
                  const isSelected = i === selectedAnswer
                  let optionClass = 'glass p-4 rounded-lg text-left transition-all duration-300 cursor-pointer '
                  if (!answered) {
                    optionClass += 'hover:border-[#c2a4ff]/30 hover:bg-[#c2a4ff]/5'
                  } else if (isCorrect) {
                    optionClass += 'border-emerald-500/40 bg-emerald-500/10'
                  } else if (isSelected && !isCorrect) {
                    optionClass += 'border-red-500/40 bg-red-500/10'
                  } else {
                    optionClass += 'opacity-50'
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => handleAnswer(i)}
                      disabled={answered}
                      className={optionClass}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                          answered && isCorrect ? 'bg-emerald-500/20 text-emerald-400' :
                          answered && isSelected && !isCorrect ? 'bg-red-500/20 text-red-400' :
                          'bg-[#c2a4ff]/10 text-[#c2a4ff]'
                        }`}>
                          {answered && isCorrect ? <CheckCircle className="w-4 h-4" /> :
                           answered && isSelected && !isCorrect ? <XCircle className="w-4 h-4" /> :
                           String.fromCharCode(65 + i)}
                        </div>
                        <span className="text-[#eae5ec] text-sm sm:text-base">{option}</span>
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Score & Next */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-[#8b8498]">
                  <Zap className="w-4 h-4 text-[#c2a4ff]" />
                  <span>Score: <span className="text-[#c2a4ff] font-semibold">{score}</span> / {quizQuestions.length}</span>
                </div>
                {answered && (
                  <Button onClick={nextQuestion} className="gap-2 bg-[#c2a4ff] text-[#0b080c] hover:bg-[#d4bfff]">
                    {currentQ + 1 >= quizQuestions.length ? 'See Results' : 'Next Question'}
                  </Button>
                )}
              </div>
            </Card>
          </motion.div>
        )}

        {/* Finished State */}
        {quizState === 'finished' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto"
          >
            <Card className="glass p-8 sm:p-10 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              >
                <Trophy className={`w-16 h-16 mx-auto mb-4 ${finalPercentage >= 70 ? 'text-amber-400' : finalPercentage >= 40 ? 'text-[#c2a4ff]' : 'text-[#8b8498]'}`} />
              </motion.div>

              <h3 className="text-2xl font-bold text-[#eae5ec] mb-2">Quiz Complete! 🎉</h3>
              <p className="text-[#8b8498] mb-6">
                {selectedDomain === 'all' ? 'All Domains' : selectedDomain} • {quizQuestions.length} Questions
              </p>

              <div className="glass corner-borders p-6 rounded-xl mb-6 inline-block">
                <div className="text-5xl font-bold mb-2" style={{ color: finalPercentage >= 70 ? '#fbbf24' : finalPercentage >= 40 ? '#c2a4ff' : '#8b8498' }}>
                  {finalPercentage}%
                </div>
                <p className="text-[#8b8498] text-sm">
                  {correctAnswers} out of {quizQuestions.length} correct
                </p>
              </div>

              <div className="flex items-center justify-center gap-4 mb-6 text-sm">
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle className="w-4 h-4" />
                  <span>{correctAnswers} Correct</span>
                </div>
                <div className="flex items-center gap-1.5 text-red-400">
                  <XCircle className="w-4 h-4" />
                  <span>{quizQuestions.length - correctAnswers} Wrong</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button onClick={() => startQuiz(selectedDomain)} className="gap-2 bg-[#c2a4ff] text-[#0b080c] hover:bg-[#d4bfff]">
                  <RotateCcw className="w-4 h-4" />
                  Try Again
                </Button>
                <Button onClick={() => setQuizState('idle')} variant="outline" className="border-[#c2a4ff]/30 text-[#c2a4ff] hover:bg-[#c2a4ff]/10">
                  Choose Different Domain
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </section>
  )
}
